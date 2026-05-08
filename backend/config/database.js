require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI)
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");``
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

module.exports = connectDB;
