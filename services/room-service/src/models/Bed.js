const mongoose = require("mongoose");

const BedSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true
  },

  bedNumber: {
    type: String,
    required: true
  },

  price: Number,

  isAvailable: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Bed", BedSchema);