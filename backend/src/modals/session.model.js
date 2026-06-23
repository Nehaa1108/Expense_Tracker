import mongoose from "mongoose";

const sessionSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"User is required"]
    },
    refreshTokenHash:{
        type:String,
        required:[true, "Refresh token hash is required"]
    },
    ip:{
        type:String,
        required:[true,"IP address is required"]
    },
    //browser details like , which browser user use, version and all
    userAgent:{
        type:String,
        required:[true,"User agent is required"]
    }
})