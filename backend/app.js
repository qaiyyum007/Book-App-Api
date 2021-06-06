import express from 'express'
import dotenv from 'dotenv'
import ConnectDB from './Database.js'
import UserRouter from './UserRouter.js'
import BookRouter from './BookRouter.js'
import bodyparser from 'body-parser'
import cors  from 'cors';

dotenv.config()
const app=express()

ConnectDB()

app.use(cors());

app.use(express.json())


const PORT=5555

app.listen(PORT,()=>{
    console.log(`Server is Running ${PORT} `)   
})

app.use('/api', new UserRouter().userRouter)
app.use('/api/books', new BookRouter().bookRouter)



