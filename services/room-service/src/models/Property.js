const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    propertyType: {
      type: String,
      enum: ["FULL", "ROOM", "BED"],
      required: true,
    },

    genderAllowed: {
      type: String,
      enum: ["BOYS", "GIRLS", "ANY"],
      default: "ANY",
    },

    price: {
      type: Number,
    },

    // 🔥 PROPERTY STATUS
    isAvailable: {
      type: Boolean,
      default: true,
    },

    // 🔥 WHO RENTED FULL PROPERTY
    rentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // 🔥 ADD THIS (Rooms under this property)
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],

    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Property", PropertySchema);
