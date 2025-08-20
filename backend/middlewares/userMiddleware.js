import jwt from "jsonwebtoken";

function authmiddleware(req, res, next){
    const authorizationHeader = req.headers.authorization

    if(!authorizationHeader || !authorizationHeader.startsWith("Bearer ")){
        res.status(411).json({
            message: "Please make sure your request has authorizationHeader"
        })
        return
    }

    const token = authorizationHeader.split(' ')[1];
    try{
       const decodeToken = jwt.verify(token, process.env.JWT_KEY);

       req.userId = decodeToken.userId;
       next();
    }catch(e){
        res.status(411).json({
            message: "Error Occured while decoding the token"
        })
    }     
}

export {
    authmiddleware
}