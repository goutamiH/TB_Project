import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import TechnicianRegister from "./TechnicianRegister";
import TechnicianLogin from "./TechnicianLogin";
import PatientForm from "./PatientForm";
import ReportPage from "./ReportPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/register-technician" element={<TechnicianRegister />} />
        <Route path="/technician-login" element={<TechnicianLogin />} />
        <Route path="/patient-form" element={<PatientForm />} />
        <Route path="/report" element={<ReportPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
