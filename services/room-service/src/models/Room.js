const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true
  },

  roomNumber: {
    type: String,
    required: true
  },

  price: Number,
  capacity: Number,

  isAvailable: {
    type: Boolean,
    default: true
  },

  // 🔥 add this
  beds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bed"
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("Room", RoomSchema);