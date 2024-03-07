import mongoose from "mongoose";
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URL_DATABASE);
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default connectDB;