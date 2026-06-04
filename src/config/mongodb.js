const mongoose = require("mongoose");

let isConnected = false;

const connectdb = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/tma");
    isConnected = db.connections[0].readyState;
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

module.exports = connectdb;
