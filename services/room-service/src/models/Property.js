const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: String,
  location: String,

  propertyType: {
    type: String,
    enum: ["FULL", "ROOM", "BED"],
    required: true
  },

  genderAllowed: {
    type: String,
    enum: ["BOYS", "GIRLS", "ANY"],
    default: "ANY"
  },

  price: Number,

  // 🔥 NEW IMPORTANT FIELDS
  isAvailable: {
    type: Boolean,
    default: true
  },

  rentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }
});

module.exports = mongoose.model("Property", PropertySchema);