const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // ================= BASIC INFO =================

    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      trim: true
    },

    address: {
      type: String,
      required: true,
      trim: true
    },


    // ================= IDENTITY =================

    identityNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },


    // ================= ROLE =================

    role: {
      type: String,
      enum: ["student", "tourist", "owner", "admin"],
      required: true,
      default: "student"
    },


    // ================= PASSWORD =================

    password: {
      type: String,
      required: true,
      minlength: 6
    }

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
