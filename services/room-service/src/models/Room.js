const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true
  },

  roomNumber: String,
  price: Number,
  capacity: Number,

  isAvailable: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Room", RoomSchema);