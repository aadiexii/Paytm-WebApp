import { Router } from "express";
const userRouter = Router()
import * as z from "zod";
import { User } from "../db";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";


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
    
       const token = jwt.sign({
          userId
       }, process.env.JWT_KEY, {expiresIn: "1h"})
       
       res.status(200).json({
        message: "User Created Successfully",
        token: token
       })
    }catch(e){
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

    const match = await bcrypt.compare(password, user.password)
    if(match){
        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_KEY, {expiresIn: '1h'})
            
        res.status(200).json({
        token: token
       })
       return
    }
    res.status(411).json({
        message: "Error while logging In"
    })
})

export {
    userRouter
}