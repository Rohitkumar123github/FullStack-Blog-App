import express from 'express'
import { getAllUsers, loginController, resgisterController } from '../controllers/userController.js'

//router object
const router = express.Router()

//Get all users || GET
router.get("/all-users", getAllUsers)

//Create USer || POST
router.post('/register', resgisterController)

//login || POST
router.post('/login', loginController)

export default router