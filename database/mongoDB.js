const mongoose = require('mongoose')
require('dotenv').config() // Loads environment variables from .env file

//* Get MongoDB connection string from .env file
let MONGODB_URI = process.env.MONGODB_URI

//* Function to connect to MongoDB
exports.connectDb = async()=>{
    await mongoose.connect(MONGODB_URI)
    console.log('Database is connected..👍')
}
