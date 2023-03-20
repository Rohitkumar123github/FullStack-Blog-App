import express from 'express'
import { createBlogController, deleteBlogController, getAllBlogsController, getBlogByIdController, updateBlogController, userBlogController } from '../controllers/blogController.js'


//router object
const router = express.Router()

//routes

//GET || single blog
router.get('/get-blog/:id', getBlogByIdController)

//GET || all blogs
router.get('/all-blog', getAllBlogsController)

//POST || create blog
router.post('/create-blog', createBlogController)

//PUT || update blog
router.put('/update-blog/:id', updateBlogController)

//DELETE || delete blog
router.delete('/delete-blog/:id', deleteBlogController)

//GET || user blog
router.get('/user-blog/:id', userBlogController)

//exporting router
export default router