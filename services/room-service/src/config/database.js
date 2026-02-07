const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_URL;
  console.log("MongoDB connected");
  if (!uri) {
    throw new Error("MONGO_URL is not defined in .env");
  }

  try {
    console.log("MongoDB connected");
    await mongoose.connect(uri);
    
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
