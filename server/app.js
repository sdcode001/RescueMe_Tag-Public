const express=require('express')
const cors=require('cors')
const {router}=require('./routes/api.router')
require('dotenv').config({path:'./.env'})

const app=express()

app.use(cors({
    origin: '*'
}))

app.use(express.json())

app.use(router)

module.exports=app