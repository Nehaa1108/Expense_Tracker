// const express = require('express');  
// // express is our web framework — it handles all HTTP requests

// const dotenv = require('dotenv');    
// // dotenv loads our .env file into process.env

// const cors = require('cors');        
// // cors lets other origins (your React Native app) call this server

// const connectDB = require('./config/DB.js')  
// // our own file that connects to MongoDB

// // 2. Load environment variables FIRST — before anything else
// dotenv.config();
// // After this line, process.env.PORT, process.env.MONGO_URI etc. are available

// // 3. Connect to database
// connectDB();
// // This runs our MongoDB connection function

// // 4. Create Express app
// const app = express();
// // app is our server — we add routes and middleware to it

// // 5. Add middleware that every request needs
// app.use(cors());
// // Allows requests from any origin — fine for development
// // In production you'd restrict to your app's URL: cors({ origin: 'https://yourapp.com' })

// app.use(express.json());
// // Without this, req.body would be undefined
// // This tells Express to read JSON from request bodies

// // 6. Import and use routes
// // const authRoutes = require('./src/routes/authRoutes');
// // app.use('/api/auth', authRoutes);
// // All auth routes are at /api/auth/...
// // So POST /api/auth/login, POST /api/auth/signup etc.

// // 7. Root route — just to test server is running
// app.get('/', (req, res) => {
//   res.json({ message: 'Server is running' });
// });

// // 8. Start listening
// const PORT = process.env.PORT || 5000;
// // process.env.PORT comes from .env — if not found, use 5000 as fallback

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


import connectDB from './config/DB.js'
import app from './src/app.js'
import dotenv from 'dotenv'

dotenv.config()

connectDB()

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
  console.log("server start successfully")
})

