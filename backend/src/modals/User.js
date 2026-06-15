// const mongoose = require('mongoose');
// // mongoose gives us Schema, model, and all database operations

// // ── 1. Define the Schema ──────────────────────────────────────────────────────
// // A Schema is a blueprint — it defines what fields a User document has
// // and what type/validation rules each field must follow
// // MongoDB is flexible (schemaless) but Mongoose adds structure on top

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type:     String,
//       required: [true, 'Name is required'],
//       // required: true means MongoDB will reject a document without name
//       // The array form [true, 'message'] gives a custom error message
//       trim:     true,
//       // trim removes leading/trailing spaces — "  Neha  " becomes "Neha"
//     },

//     email: {
//       type:     String,
//       required: [true, 'Email is required'],
//       unique:   true,
//       // unique: true tells MongoDB to create an index that prevents
//       // two users from having the same email — enforced at DB level
//       lowercase: true,
//       // Automatically converts to lowercase before saving
//       // So "Neha@Gmail.COM" is stored as "neha@gmail.com"
//       trim:     true,
//     },

//     password: {
//       type:     String,
//       required: [true, 'Password is required'],
//       minlength: [6, 'Password must be at least 6 characters'],
//     },

//     isVerified: {
//       type:    Boolean,
//       default: false,
//       // default: false means every new user starts unverified
//       // We flip this to true after OTP verification
//     },

//     otp: {
//       type:    String,
//       default: null,
//       // Stores the 6-digit OTP as a string
//       // null when no OTP is active
//     },

//     otpExpiry: {
//       type:    Date,
//       default: null,
//       // Stores when the OTP expires
//       // We compare this with new Date() to check if it's still valid
//     },

//     resetToken: {
//       type:    String,
//       default: null,
//       // Stores the OTP for password reset flow
//       // Separate from otp field so both flows don't interfere
//     },

//     resetExpiry: {
//       type:    Date,
//       default: null,
//     },
//   },
//   {
//     timestamps: true,
//     // timestamps: true automatically adds two fields to every document:
//     // createdAt — when the document was first created
//     // updatedAt — when it was last modified
//     // You never have to set these manually — Mongoose handles it
//   }
// );

// // ── 2. Create the Model ───────────────────────────────────────────────────────
// // A Model is a class built from the Schema
// // It gives us methods like User.create(), User.findOne(), User.findById()
// // The first argument 'User' becomes the collection name 'users' in MongoDB
// // (Mongoose automatically lowercases and pluralizes it)

// const User = mongoose.model('User', userSchema);

// module.exports = User;


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
username:{
  type:String,
  required:[true,"Username is required"],
  unique:[true,"Username must be unique"]
},
email:{
  type:String,
  required:[true,"Email is required"],
  unique:[true,"Email must be unique"],
},
password:{
  type:String,
  required:[true,"Password is required"]
}
})

const UserModal = mongoose.model("users",userSchema)

export default UserModal