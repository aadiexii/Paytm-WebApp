import { Router } from "express";
const accountRouter = Router()
import { User } from "../db.js";
import { Account } from "../db.js";
import { authmiddleware } from "../middlewares/userMiddleware.js";
import mongoose from "mongoose";

accountRouter.get('/getBalance', authmiddleware, async function(req, res){
    try {
        const accountBalance = await Account.findOne({
            userId: req.userId
        })

        if (!accountBalance) {
            return res.status(404).json({
                message: "Account not found"
            }) 
        }

        res.status(200).json({
            balance: accountBalance.balance
        })
    } catch (e) {
        console.error(e.message)
        return res.status(500).json({
            message: "Error fetching balance"
        })
    }
})

accountRouter.post('/transfer', authmiddleware, async function(req, res){
    try{
        const session = await mongoose.startSession()

        session.startTransaction();
        const { transferTo, transferAmount } = req.body

        // Validate transferAmount
        if (!transferAmount || transferAmount <= 0) {
            await session.abortTransaction()
            return res.status(400).json({
                message: "Invalid transfer amount"
            })
        }

        // Validate transferTo ObjectId
        if (!mongoose.Types.ObjectId.isValid(transferTo)) {
            await session.abortTransaction()
            return res.status(400).json({
                message: "Invalid transfer account ID format"
            })
        }

        const currentAccount = await Account.findOne({
            userId: req.userId
        }).session(session)

        if(!currentAccount || currentAccount.balance < transferAmount){
            await session.abortTransaction()
            return res.status(400).json({
                message: "Insufficient Balance"
            })
        }

        const transferAccount = await Account.findOne({
            userId: transferTo
        }).session(session)

        if(!transferAccount){
            await session.abortTransaction()
            return res.status(400).json({
                message: "Invalid Transfer Account"
            })
        }

        // Prevent self-transfer
        if (req.userId.toString() === transferTo) {
            await session.abortTransaction()
            return res.status(400).json({
                message: "Cannot transfer to yourself"
            })
        }

        await Account.updateOne({
            userId: req.userId
        },{
            $inc: {
                balance: -transferAmount
            }
        }).session(session)

        await Account.updateOne({
            userId: transferTo
        },{
            $inc: {
                balance: transferAmount
            }
        }).session(session)

        await session.commitTransaction()
        return res.json({
            message: "Transaction Successful"
        })
    }catch(e){
        console.error(e.message)
        return res.status(500).json({
            message: "Internal server error during transfer"
        })
    }
})

export {
    accountRouter
}
