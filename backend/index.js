import express from "express";
import cors from "cors";
import morgan from "morgan";
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js'

//routers imports 
//router for user 
import userRoutes from './routes/userRoutes.js'
//router for blogs
import blogRoutes from './routes/blogRoutes.js'



//env configuring 
//if we have .env file in different folder we can specify it in the config({path: './sad})
dotenv.config()

//router import 
// const userRoutes = require('./routes/userRoutes')

//mongoDB connection
connectDB()


//rest object
const app = express()


//middleware
app.use(cors())
//for using body parser
app.use(express.json())
//for getting info about the activites on the server
app.use(morgan('dev'))

//routes
// app.get('/', (req, res)=>{
//     res.status(200).send({
//         "message": "Node Server"
//     })
// })
// app.get('/', (req, res)=>{
//     res.status(200).send({
//         "message": "Node Server"
//     })
// })
//routes for user
app.use('/api/v1/user', userRoutes)
//routes for blog
app.use('/api/v1/blog', blogRoutes)


//Port
const PORT = process.env.PORT || 8080

//listen
app.listen(PORT, ()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
})
