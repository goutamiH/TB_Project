const mongoose = require("mongoose");

const technicianSchema = new mongoose.Schema({
  name: String,
  dob: String,
  age: Number,
  gender: String,
  currentAddress: String,
  identityProof: String,
  professionalProof: String,
  username: String,
  password: String,
});

module.exports = mongoose.model("Technician", technicianSchema);
