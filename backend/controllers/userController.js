import userModel from "../models/userModel.js"
import bcrypt from "bcrypt";


//create user resgister user
export const resgisterController = async(req, res)=>{
    try {
        const { username, email, password } = req.body
        //validation
        if(!username || !email || !password){
            return res.status(400).send({
                success: false,
                message: 'Please fill all fields'
            })
        }

        //existing user
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(401).send({
                success: false, 
                message: 'User already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        //save new user 
        const user = new userModel({username, email, password: hashedPassword})
        await user.save()
        return res.status(201).send({
            success: true,
            message: 'New user created',
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: 'Error In Register callBack',
            success: false,
            error
        })
    }
}

//get all users
export const getAllUsers = async(req, res)=>{
    try {
        const users = await userModel.find()
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: 'all users data',
            users
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: 'Error In getUsers callBack',
            success: false,
            error
        })
    }
}

//login 
export const loginController = async(req, res)=>{
    try {
        const { email, password} = req.body

        //validation
        if(!email || !password){
            return res.status(401).send({
                success: false,
                message: "Please provide email or password"
            })
        }

        //checking whether user is present in the database or not 
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(401).send({
                success: false,
                message: 'email is not registered'
            })
        }
        //password matching
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).send({
                success: false,
                message: "Invalid username or password"
            })
        }

        return res.status(200).send({
            success: true,
            message: "Login successfully",
            user
        })
    } catch (error) {
        console.log("Error: ",error)
        return res.status(500).send({
            success: false,
            message:"Error in Login callback",
            error
        })
    }
}

