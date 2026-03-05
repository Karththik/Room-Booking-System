const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property"
  },

  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    default: null
  },

  bed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bed",
    default: null
  },

  startDate: Date,
  endDate: Date,

  totalPrice: Number,

  status: {
    type: String,
    enum: ["PENDING", "CONFIRMED", "CANCELLED"],
    default: "CONFIRMED"
  }

}, { timestamps: true });

module.exports = mongoose.model("Booking", BookingSchema);