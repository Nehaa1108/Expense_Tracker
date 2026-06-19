import {Router} from "express"
import * as authController from "../controllers/AuthController.js"
const authRouter = Router()

authRouter.post("/register",authController.register)

//user identift , which user send details
authRouter.get("/get-me",authController.getMe)


export default authRouter