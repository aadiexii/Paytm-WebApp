import mongoose from "mongoose";
const { Schema } = mongoose


async function connectToDb(){
    try{
        await mongoose.connect(process.env.DBKey_URI)
        console.log("Connected to db")
    } catch(e){
        console.log("Couldnt Connect ", e);
        process.exit(1)
    }
}
const userSchema = new Schema({
    fistName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }  
})

const User = mongoose.model('User', userSchema)

export {
    User,
    connectToDb
}