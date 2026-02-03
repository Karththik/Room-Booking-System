const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_URL;

  if (!uri) {
    throw new Error("MONGO_URL is not defined in .env");
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
