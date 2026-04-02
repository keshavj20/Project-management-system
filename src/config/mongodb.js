const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/tma");
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

module.exports = connectdb;
