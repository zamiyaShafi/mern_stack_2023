import express from "express"
import {PORT,mongodburl} from "./config.js"
import mongoose from "mongoose"
import { Book } from "./models/book-model.js"
import booksRouter from "./router/bookRoute.js"
import cors from 'cors'

const app=express()
app.use(express.json())

// you can use it in 2 ways
// 1
app.use(cors())
// 2
// app.use({
//     origin:"http://localhost:3000",
//     methods:['GET','POST','DELETE','PUT'],
//     headers:['Content-type']
// })

app.get('/',(req,res)=>{
    console.log(req)
    return res.status(234).send("Welcome back to tutorial")
    
})

app.use("/books",booksRouter)



mongoose.connect(mongodburl).then(()=>{
    console.log("database connected")
    app.listen(PORT,()=>{
        console.log(`App is listening on port number ${PORT}`)
    })
}).catch((err)=>{
    console.log(err)
})




