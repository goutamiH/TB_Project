const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  technicianId: { type: mongoose.Schema.Types.ObjectId, ref: "Technician" },
  name: String,
  age: Number,
  mobile: String,
  gender: String,
  dicomImage: String,
  diagnosis: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Patient", patientSchema);
