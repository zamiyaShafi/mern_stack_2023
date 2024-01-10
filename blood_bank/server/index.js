const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const colors=require('colors')
const morgan=require('morgan')
const connectDB = require('./config/db')




dotenv.config()


connectDB()


const app=express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

const port=process.env.PORT || 8080


app.use('/api/v1/test',require('./routes/testRoutes'));
app.use('/api/v1/auth',require('./routes/authRoutes'))
app.use('/api/v1/inventory',require('./routes/inventoryRoutes'))


app.listen(port,()=>{
    console.log(`Node server is on model ${process.env.DEV_MODE} running in port ${process.env.PORT}`
    .bgBlue.white)
    


})