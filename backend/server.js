const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const adminRoutes = require("./routes/admin");
const technicianRoutes = require("./routes/technician");
const patientRoutes = require("./routes/patient");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://127.0.0.1:27017/healthcare");

app.use("/admin", adminRoutes);
app.use("/technician", technicianRoutes);
app.use("/patient", patientRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
