import jwt from "jsonwebtoken";
import {User} from "../db.js";

async function authmiddleware(req, res, next){
    console.log("We are here")
    const authorizationHeader = req.headers['authorization']
    console.log(authorizationHeader)

    if(!authorizationHeader || !authorizationHeader.startsWith("Bearer ")){
        res.status(411).json({
            message: "Please make sure your request has authorizationHeader"
        })
        return
    }

    const token = authorizationHeader.split(' ')[1];
    try{
       const decodeToken = jwt.verify(token, process.env.JWT_KEY);
       
       const user = await User.findById(decodeToken.userId);
       if(!user){
           res.status(411).json({
            message: "User no longer Exist"
           })
        return
       }

       req.userId = decodeToken.userId;
       next();
    }catch(e){
        console.error("middlewareError", e.message)
        return res.status(411).json({
            message: "Error Occured while decoding the token"
        })
    }     
}

export {
    authmiddleware
}