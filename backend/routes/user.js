import { Router } from "express";
const userRouter = Router()
import * as z from "zod";
import { User } from "../db.js";
import { Account } from "../db.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { authmiddleware} from "../middlewares/userMiddleware.js"


   const UserSignupschema = z.object({
       firstName: z.string(),
       lastName: z.string(),
       email: z.email(),
       password: z.string().min(6)
   })
userRouter.post('/signup', async function(req, res) {
   const {firstName, lastName, email, password} = req.body;

    const validation = UserSignupschema.safeParse(req.body)
    if(!validation.success){
        return res.status(400).json({
            msg: "Entered Wrong Inputs"
        })
    }

    const existingUser = await User.findOne({
        email: email
    })
    if(existingUser){
        return res.status(411).json({
            msg: "Email already taken / Incorrect inputs"
        })
    }

    try{
       const saltRound = 10;
       const hash = await bcrypt.hash(password, saltRound)
       
       const user = await User.create({
         firstName: firstName,
         lastName: lastName,
         email: email,
         password: hash
       })

       const userId = user._id
       
       await Account.create({
            userId,
            balance: Math.floor(Math.random() * 10000)
       })

       const token = jwt.sign({
          userId
       }, process.env.JWT_KEY)
    
       console.log(token)
       res.status(200).json({
        message: "User Created Successfully",
        token: token
       })
    }catch(e){
        console.error(e)
        res.status(500).json({
            message: "Error occured while created new user"
        })
    }
})



   const UserSigninschema = z.object({
       email: z.email(),
       password: z.string().min(6)
   })
userRouter.post('/signin', async function(req, res) {
    const {email, password} = req.body

    const validation = UserSigninschema.safeParse(req.body)
    if(!validation.success){
        return res.status(400).json({
            msg: "Entered Wrong Inputs"
        })
    }
    
    const user = await User.findOne({
        email: email
    })
    if(!user){
        return res.status(411).json({
            message: "User Doesnt Exits"
        })
    }

    try{
    const match = await bcrypt.compare(password, user.password)
    if(match){
        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_KEY)
            
        res.status(200).json({
        token: token
       })
       return 
    }}catch(e){
        console.error(e.message)
        res.status(411).json({
        message: "Error while logging In"
    })}
})




   const UserUpdateschema = z.object({
       firstName: z.string().optional(),
       lastName: z.string().optional(),
       password: z.string().min(6).optional()
   })
userRouter.put('/update', authmiddleware, async function(req, res){
     const validation = UserUpdateschema.safeParse({
        firstName: req.body.updated_first_name,
        lastName: req.body.updated_last_name,
        password: req.body.new_password
     })

     if(!validation.success){
        res.status(411).json({
            message: "Info cant be changed due to wrong input"
        })
        return
     }
     
     try{
         const userId = req.userId
         const data = validation.data
         await User.updateOne({ _id: userId}, 
            {$set: data}
         )
         res.status(200).json({
             message: "Updated Successfully"
         })
     }catch(e){
         console.error(e.message)
         return res.status(500).json({
             message: "Error occurred while updating user"
         })
     }
})



userRouter.get('/getUsers', authmiddleware, async function(req, res){
    const filter = req.query.filter || ""

    const users = await User.find({
        $or: [{
            firstName: {$regex: filter, $options: "i"},
        }, {
            lastName: {$regex: filter, $options: "i"},
        }]
    })

    res.json({
        user: users.map(user => ({
            firstName: user.firstName,
            lastName: user.lastName,
            userId: user._id
        }))
    })
})


export {
    userRouter
}