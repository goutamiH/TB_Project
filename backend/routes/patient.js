const express = require("express");
const router = express.Router();
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const Patient = require("../models/Patient");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname),
});
const upload = multer({ storage });

router.post("/submit", upload.single("dicomFile"), async (req, res) => {
  const { name, age, gender, mobile, technicianId } = req.body;

  try {
    const newPatient = new Patient({
      name,
      age,
      gender,
      mobile,
      dicomImage: req.file.filename,
      submittedBy: technicianId,
    });
    await newPatient.save();

    // Prepare image to send to FastAPI
    const form = new FormData();
    form.append("file", fs.createReadStream(req.file.path));

    const response = await axios.post("http://127.0.0.1:8000/predict", form, {
      headers: form.getHeaders(),
    });

    const { class: prediction, confidence } = response.data;

    res.json({ prediction, confidence });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Backend Error", error: err.message });
  }
});

module.exports = router;
