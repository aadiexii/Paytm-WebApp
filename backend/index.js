import express from 'express'
const app = express()
import 'dotenv/config'
import {connectToDb} from './db.js';
import { userRouter } from './routes/user.js';
import cors from 'cors'
import { accountRouter } from './routes/account.js';

app.use(express.json())
app.use(cors())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/account", accountRouter)

async function main(){
        await connectToDb();
        app.listen(3000, () => {
        console.log("Server is running succesfully")
    })
}   

main();