// const authService = require('../services/authService');
// // Import our service — all logic lives there

// const authController = {

//   signup: async (req, res) => {
//     try {
//       const { name, email, password } = req.body;
//       // req.body contains what the frontend sent as JSON
//       // express.json() middleware parsed it for us

//       // Basic validation — check required fields exist
//       if (!name || !email || !password) {
//         return res.status(400).json({ message: 'Name, email and password are required' });
//         // 400 = Bad Request — the frontend sent incomplete data
//         // return stops execution — we don't continue after sending response
//       }

//       if (password.length < 6) {
//         return res.status(400).json({ message: 'Password must be at least 6 characters' });
//       }

//       const result = await authService.signup({ name, email, password });

//       if (!result.success) {
//         return res.status(400).json({ message: result.message });
//       }

//       res.status(201).json(result);
//       // 201 = Created — something new was made (a new user)
//       // 200 = OK for general success, 201 specifically for creation

//     } catch (error) {
//       console.error('Signup error:', error);
//       res.status(500).json({ message: 'Something went wrong. Please try again.' });
//       // 500 = Internal Server Error — unexpected crash
//       // We never send the real error message to frontend (security)
//     }
//   },

//   verifyOtp: async (req, res) => {
//     try {
//       const { userId, otp } = req.body;

//       if (!userId || !otp) {
//         return res.status(400).json({ message: 'userId and otp are required' });
//       }

//       const result = await authService.verifyOtp({ userId, otp });

//       if (!result.success) {
//         return res.status(400).json({ message: result.message });
//       }

//       res.status(200).json(result);

//     } catch (error) {
//       console.error('VerifyOtp error:', error);
//       res.status(500).json({ message: 'Something went wrong.' });
//     }
//   },

//   login: async (req, res) => {
//     try {
//       const { email, password } = req.body;

//       if (!email || !password) {
//         return res.status(400).json({ message: 'Email and password are required' });
//       }

//       const result = await authService.login({ email, password });

//       if (!result.success) {
//         return res.status(401).json({ message: result.message });
//         // 401 = Unauthorized — wrong credentials
//       }

//       res.status(200).json(result);

//     } catch (error) {
//       console.error('Login error:', error);
//       res.status(500).json({ message: 'Something went wrong.' });
//     }
//   },

//   forgotPassword: async (req, res) => {
//     try {
//       const { email } = req.body;

//       if (!email) {
//         return res.status(400).json({ message: 'Email is required' });
//       }

//       const result = await authService.forgotPassword({ email });
//       res.status(200).json(result);
//       // Always 200 here — we don't reveal if email exists or not

//     } catch (error) {
//       console.error('ForgotPassword error:', error);
//       res.status(500).json({ message: 'Something went wrong.' });
//     }
//   },

//   resetPassword: async (req, res) => {
//     try {
//       const { userId, otp, newPassword } = req.body;

//       if (!userId || !otp || !newPassword) {
//         return res.status(400).json({ message: 'userId, otp and newPassword are required' });
//       }

//       if (newPassword.length < 6) {
//         return res.status(400).json({ message: 'Password must be at least 6 characters' });
//       }

//       const result = await authService.resetPassword({ userId, otp, newPassword });

//       if (!result.success) {
//         return res.status(400).json({ message: result.message });
//       }

//       res.status(200).json(result);

//     } catch (error) {
//       console.error('ResetPassword error:', error);
//       res.status(500).json({ message: 'Something went wrong.' });
//     }
//   },

//   resendOtp: async (req, res) => {
//     try {
//       const { userId, type } = req.body;

//       if (!userId || !type) {
//         return res.status(400).json({ message: 'userId and type are required' });
//       }

//       const result = await authService.resendOtp({ userId, type });

//       if (!result.success) {
//         return res.status(400).json({ message: result.message });
//       }

//       res.status(200).json(result);

//     } catch (error) {
//       console.error('ResendOtp error:', error);
//       res.status(500).json({ message: 'Something went wrong.' });
//     }
//   },
// };

// module.exports = authController;

import UserModal from "../modals/User.js"
import bcrypt from "bcrypt";

//after finding or creating user & password hash , now we will work on jwt
import jwt from 'jsonwebtoken'

import connectDB from "../../config/DB.js";

//complete logic here , then export to router page
export async function register(req, res) {
  try {
      //ready user data from req.body

  //check user already existing or not , if present then find 
    const { username, email, password } = req.body;

    const isAlreadyRegistered = await UserModal.findOne({
      $or: [{ username }, { email }],
    });

    //if existing then show message 
    if (isAlreadyRegistered) {
      return res.status(400).json({
        success: false,
        message: "Username or Email already exists",
      });
    }

      //store password in hash 
    const hashedPassword = await bcrypt.hash(password, 10);

    //user register if not existing
    const user = await UserModal.create({
      username,
      email,
      password: hashedPassword,
    });


    //after importing db , now creating token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,                                                                                                                                 
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE
        // "1d",
      }
    );


    return res.status(201).json({
      success: true,
      message: "User registered successfully",
        token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } 
  catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function getMe(req,res)
{
  //logic - inside server , which user send request, identify it, with token , all user have token with it
  const token = req.headers.authorization?.split(" ")[1]  

  console.log("req header",req.headers)

  //check user have token or not
  if(!token)
  {
    return res.status(401).json({
      message:"token not found"
    })
  }

  //read token--inside have data 
  const decorded = jwt.verify(token,process.env.JWT_SECRET)
  console.log("decorded",decorded)

}
