const mongoose = require("mongoose");
// const colors = require("colors"); 
 
const connectDB = async () => { 
  try { 
    const conn = await mongoose.connect(process.env.MONGO_URI); 
 
    console.log(`MongoDB Connected: ${conn.connection.host}`); 
  } catch (error) { 
    console.log("hello")
    console.error(`Error: ${error.message}`); 
    process.exit(1); // Exit with a non-zero status code to indicate an error 
  } 
}; 
 
module.exports = connectDB;