const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    console.log("Received login request for:", username, password); // 🪵 debug log
  
    try {
      const admin = await Admin.findOne({ username, password });
      if (!admin) {
        console.log("Invalid admin login");
        return res.status(401).json({ msg: "Invalid credentials" });
      }
  
      console.log("Admin found:", admin);
      res.json({ msg: "Login successful" });
    } catch (err) {
      console.error("Login error:", err); // 🪵 error log
      res.status(500).json({ msg: "Server error", error: err.message });
    }
  });
  
  

  router.post("/register", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const existing = await Admin.findOne({ username });
      if (existing) {
        return res.status(400).json({ msg: "Admin already exists" });
      }
  
      const newAdmin = new Admin({ username, password });
      console.log("Saving admin:", newAdmin);  // 🪵 Add this
      await newAdmin.save();
  
      res.json({ msg: "Admin registered successfully" });
    } catch (err) {
      console.error("Error saving admin:", err);  // 🪵 Add this
      res.status(500).json({ msg: "Registration error" });
    }
  });
  

module.exports = router;
