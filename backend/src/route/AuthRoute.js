import {Router} from "express"
import * as authController from "../controllers/AuthController.js"
import authMiddleware from "../middleware/authMiddleware.js";
const authRouter = Router()

authRouter.post("/register",authController.register)

//user identift , which user send details
authRouter.get("/get-me",authController.getMe)

authRouter.get("/refresh-token",authController.refreshToken)

authRouter.post("/logout", authMiddleware, logout);

export default authRouter