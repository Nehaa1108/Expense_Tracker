// const express    = require('express');
// const router     = express.Router();
// // Router is a mini Express app — it handles routes for a specific section
// // We register routes on router, then attach it to the main app in server.js

// const authController = require('../controllers/authController');
// const protect        = require('../middleware/authMiddleware');

// // Public routes — no token needed
// router.post('/signup',           authController.signup);
// router.post('/login',            authController.login);
// router.post('/verify-otp',       authController.verifyOtp);
// router.post('/forgot-password',  authController.forgotPassword);
// router.post('/reset-password',   authController.resetPassword);
// router.post('/resend-otp',       authController.resendOtp);

// // Protected route example — token required
// // protect middleware runs first, then the handler
// router.get('/me', protect, (req, res) => {
//   // req.user was set by protect middleware
//   res.json({
//     success: true,
//     user: req.user,
//     // Returns the decoded token payload: { id, email }
//   });
// });

// module.exports = router;

import {Router} from "express"
import * as authController from "../controllers/AuthController.js"
const authRouter = Router()

authRouter.post("/register",authController.register)

export default authRouter