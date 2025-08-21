import { Router } from "express";
const accountRouter = Router()
import { User } from "../db.js";
import { Account } from "../db.js";
import { authmiddleware } from "../middlewares/userMiddleware.js";
import mongoose from "mongoose";

accountRouter.get('/getBalance', authmiddleware, async function(){
    const accountBalance = await Account.findOne({
        userId: req.userId
    })

    res.status(200).json({
        balance: accountBalance
    })
})

accountRouter.post('/transfer', authmiddleware, async function(req, res){
    const session = mongoose.session()

    session.startTransaction();
    const { transferTo, transferAmount } = req.body

    const currentAccount = await Account.findOne({
        userId: req.userId
    }).session(session)

    if(!currentAccount || currentAccount.balance < transferAmount){
        await session.abortTransaction()
        res.status(400).json({
            message: "Insufficient Balance"
        })
    }

    const transferAccount = await Account.findOne({
        userId: transferTo
    }).session(session)

    if(!transferAccount){
        await session.abortTransaction()
        res.status(400).json({
            message: "Invalid Transfer Account"
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
    res.json({
        message: "Transaction Succesfull"
    })
})

export {
    accountRouter
}
