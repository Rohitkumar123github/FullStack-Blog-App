import mongoose from "mongoose";
import colors from 'colors'

 const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MongoDB Database ${mongoose.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`MONGO Connect Error ${error}`.bgRed.white)
    }
}

//CommonJS
//module.exports = connectDB

//ES6 way
export default connectDB