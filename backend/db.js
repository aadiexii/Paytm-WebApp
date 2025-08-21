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
    firstName: {
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

const accountsSchema = new Schema({
	userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
	balance: {
        type: Number,
        required: true,
        min: 0
    }
})

const User = mongoose.model('User', userSchema)
const Account = mongoose.model('Account', accountsSchema)

export {
    User,
    Account,
    connectToDb
}