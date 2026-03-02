const mongoose = require("mongoose");

const BedSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true
  },

  bedNumber: String,
  price: Number,

  isAvailable: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Bed", BedSchema);