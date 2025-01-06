const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();



const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user (plain password, as hashing is handled in User schema)
    user = new User({ username, password });
    await user.save();

    const payload = {
      user: {
        name: user.username,
      },
    };

    // Generate JWT token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).send("Server error");

  } 
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Debugging: Log user details
    console.log("User found:", user);
    console.log("Entered password:", password);
    console.log("Hashed password from DB:", user.password);

    // Compare the password entered with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("Passwords do not match");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    // Generate JWT token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {

    console.error("Login error:", error);
    res.status(500).send("Server error");

  }
};

module.exports = { registerUser, loginUser };
