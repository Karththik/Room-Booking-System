const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// ✅ MIDDLEWARES
app.use(cors());
app.use(express.json());

// ✅ ROUTES IMPORT
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const propertyRoutes = require("./routes/property.routes");
const roomRoutes = require("./routes/room.routes");
const bedRoutes = require("./routes/bed.routes");
const bookingRoutes = require("./routes/booking.routes");

// 🔥 CONNECT DATABASE (ONLY ONCE)
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  });

// ✅ API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/bed", bedRoutes);
app.use("/api/booking", bookingRoutes);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ❌ GLOBAL ERROR HANDLER (OPTIONAL BUT GOOD)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong",
    error: err.message
  });
});

// ✅ SERVER START
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});