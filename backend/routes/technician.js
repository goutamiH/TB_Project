// backend/routes/technician.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Technician = require("../models/Technician");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder must exist
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage });

// Register Technician Route
router.post(
  "/register",
  upload.fields([
    { name: "identityProof", maxCount: 1 },
    { name: "professionalProof", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        name,
        dob,
        age,
        gender,
        address,
        username,
        password,
      } = req.body;

      const identityProof = req.files["identityProof"]
        ? req.files["identityProof"][0].filename
        : null;
      const professionalProof = req.files["professionalProof"]
        ? req.files["professionalProof"][0].filename
        : null;

      if (!identityProof || !professionalProof) {
        return res.status(400).json({ msg: "File upload missing" });
      }

      const newTech = new Technician({
        name,
        dob,
        age,
        gender,
        address,
        identityProof,
        professionalProof,
        username,
        password,
      });

      await newTech.save();
      res.json({ msg: "Technician registered successfully" });
    } catch (err) {
      console.error("Technician registration error:", err);
      res.status(500).json({ msg: "Registration failed" });
    }
  }
);
// Technician Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const technician = await Technician.findOne({ username, password });
      if (!technician) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }
  
      // ✅ Successful login
      res.json({ msg: "Login successful", technicianId: technician._id });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ msg: "Server error" });
    }
  });
  const Patient = require("../models/Patient");

// Submit patient details
router.post(
  "/submit",
  upload.single("dicomImage"), // can be .dcm or .png
  async (req, res) => {
    try {
      const { technicianId, name, age, mobile, gender, diagnosis } = req.body;
      const dicomImage = req.file ? req.file.filename : null;

      if (!dicomImage) {
        return res.status(400).json({ msg: "DICOM image is required" });
      }

      const newPatient = new Patient({
        technicianId,
        name,
        age,
        mobile,
        gender,
        dicomImage,
        diagnosis,
      });

      await newPatient.save();
      res.json({ msg: "Patient submitted successfully" });
    } catch (err) {
      console.error("Patient submission error:", err);
      res.status(500).json({ msg: "Submission failed" });
    }
  }
);

  
module.exports = router;
