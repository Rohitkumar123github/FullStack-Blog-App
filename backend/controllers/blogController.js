import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";

//functions

//GET all blogs 
export const getAllBlogsController = async(req, res)=>{
    try {
        const blogs = await blogModel.find({}).populate("user")
        if(!blogs){
            return res.status(200).send({
                success: false,
                message: 'No Blogs Found'
            })
        }
        return res.status(200).send({
            success: true,
            BlogCount: blogs.length,
            message: 'All Blogs List',
            blogs
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error while getting Blogs",
            error
        })
    }
}

//Create blog
export const createBlogController =async(req, res)=>{
    try {
        //getting required information from the user
        const { title, description, image, user} = req.body

        //validation
        if(!title || !description || !image || !user){
            return res.status(400).send({
                success: false,
                message: "Please fill all the fields"
            })
        
        }
        const existingUser = await userModel.findById(user)
        //validation
        if(!existingUser){
            return res.status(404).send({
                success: true,
                message: 'Unable to find user'
            })
        } 


        //if user have provided all the required fileds then creating a new blog
        const newBlog = new blogModel({title, description, image, user})
        //creating session using mongoose
        const session = await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({session})
        //pushing blog into array
        existingUser.blogs.push(newBlog)
        await existingUser.save({session})
        await session.commitTransaction()


        await newBlog.save()
        return res.status(201).send({
            success: true,
            message: 'Blog Created!',
            newBlog,
        })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Error while creating blog",
        })
    }
}

//Update blog
export const updateBlogController=async(req, res)=>{
    try {
        const {id} = req.params
        const {title, description, image} = req.body
        const blog = await blogModel.findByIdAndUpdate(id, {...req.body}, {new: true})
        return res.status(200).send({
            success: true, 
            message: 'Blog Updated!',
            blog,
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error while updating blog',
            error
        })
    }
}

//Single blog
export const getBlogByIdController =async(req,res)=>{
    try {
        const { id } = req.params
        const blog = await blogModel.findById(id)
        if(!blog){
            return res.status(404).send({
                success: false,
                message: "Blog not found with this id",
            })
        }
        return res.status(200).send({
            success: true,
            message: 'fetch Single blog',
            blog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error While Getting Single block',
            error
        })
    }
}

//Delete blog
export const deleteBlogController=async(req, res)=>{
    try {
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save()
        return res.status(200).send({
            success: true,
            message: "Blog Deleted!"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Error while Deleting Blog",
            error
        })
    }
}

//GET User Blog
export const userBlogController =async(req, res)=>{
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs")
        if(!userBlog){
            return res.status(404).send({
                success: false,
                message: 'Blogs not found with this id'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'user blogs',
            userBlog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'error in user blog',
            error
        })
    }
}