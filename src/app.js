import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import authRouters from './routers/authRouters.js'
import gameRouters from './routers/gameRouters.js'
import categoryRouters from './routers/categoryRouters.js'
import rentalRouters from './routers/rentalRouters.js'

dotenv.config()

const app = express()
app.use(express.json(),cors())

app.use(authRouters)
app.use(gameRouters)
app.use(categoryRouters)
app.use(rentalRouters)

app.listen(process.env.PORT,()=>{
    console.log(`Listening on ${process.env.PORT}`)
})