const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ================= REGISTER USER =================

exports.register = async (req, res) => {
  try {

    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      identityNumber,
      role,
      password
    } = req.body;


    // ✅ VALIDATION

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !identityNumber ||
      !role ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }


    // ✅ CHECK EMAIL EXISTS

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }


    // ✅ CHECK IDENTITY EXISTS

    const existingIdentity = await User.findOne({ identityNumber });

    if (existingIdentity) {
      return res.status(400).json({
        success: false,
        message: "Identity number already registered"
      });
    }


    // ✅ HASH PASSWORD

    const hashedPassword = await bcrypt.hash(password, 10);


    // ✅ CREATE USER

    const user = await User.create({

      firstName,
      lastName,
      email,
      phone,
      address,
      identityNumber,
      role,
      password: hashedPassword

    });


    // ✅ RESPONSE

    res.status(201).json({

      success: true,

      message: "User registered successfully",

      data: {

        id: user._id,
        name: user.firstName + " " + user.lastName,
        email: user.email,
        role: user.role

      }

    });


  } catch (error) {

    console.error("Register error:", error);

    res.status(500).json({

      success: false,
      message: "Server error"

    });

  }
};


// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // 1️⃣ Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // 3️⃣ Success
    res.status(200).json({
      message: "Login successful",
      userId: user._id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
