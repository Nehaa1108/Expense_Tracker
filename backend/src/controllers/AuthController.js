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
    //after decoded token replace with access and refresh
    //access token
    const accesstoken = jwt.sign(
      {
        id: user._id,
        email: user.email,                                                                                                                                 
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m"
      }
    );

    const refreshtoken = jwt.sign({
      id: user._id
    },
  process.env.JWT_SECRET,
{
  expiresIn: "7d"
})

//add cookieparser for refersh token

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      //it store in memory , so need to send req.body
      accesstoken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } 
  //refresh token -- install cookie-parser 
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

  // console.log("req header",req.headers)

  //check user have token or not
  if(!token)
  {
    return res.status(401).json({
      message:"token not found"
    })
  }

  // iat--initialise at(when token created)
// decorded {
//   id: '6a2ad3f',
//   email: 'test2@gmail.com',
//   iat: 10779,
//   exp: 17879
// }


  //read token--inside have data 
  const decorded = jwt.verify(token,process.env.JWT_SECRET)
  // console.log("decorded",decorded)

  //user find
  const user = await UserModal.findById(decorded.id)

  res.status(200).json({
    message:"User fetched successfully",
    user:{
      username:user.username,
      email:user.email
    }
  })

  // frontend (client side) store token ---
  // 2 ways--localstorage(still hacker take token ) & cookies(token not access but token dircet access)
  //solution----> store token in memory but if we refresh , token will also refresh , so its solution is , we will use 2 tokens
  // access token and refresh token
  // acess toekn - its  a normal token , with the help of this, middleware and server known which user request ,so we will not store access token
  // on localstorage, cookies, memory,server read this acess token, which user request , because in this token have user details

  // refresh token---->when user refresh /load the page (memory), then menory will reset , token remove, in refresh token , it use separate 
  // refresh api ,refresh token store in cookies, refresh token mainly generate new access token 
  //access toekn store in memory
  //access token time is 15mins max
  // refresh token , 7days , 15 days , and days
}
