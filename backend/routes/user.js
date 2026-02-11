const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/UserModel.js")


const userRoutes = express.Router()

userRoutes.post("/signup", async (req, res) => {
  try {
    const { username, firstname, lastname, password } = req.body;

    const ifExist = await User.findOne({ username });
    if (ifExist) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({
      username,
      firstname,
      lastname,
      password
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: newUser
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRoutes.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

 
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    res.json({
      message: "Login successful",
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = userRoutes;
