const mongoose = require('mongoose');
// mongoose is our MongoDB library

const connectDB = async () => {
  // async because connecting to a database takes time (it's a network call)
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // process.env.MONGO_URI comes from your .env file
    // mongoose.connect returns a connection object when successful
    
    console.log(`MongoDB connected: ${conn.connection.host}`);
    // Logs which server we connected to — useful for debugging
    
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
    // process.exit(1) means "crash the server with an error code"
    // If we can't connect to the database, the server shouldn't run
  }
};

module.exports = connectDB;
// This makes the function available to import in server.js