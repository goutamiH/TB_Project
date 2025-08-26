// ReportPage.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "./ReportPage.css";
function ReportPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { patientName, diagnosis, confidence } = location.state || {};

  if (!patientName) {
    return <h2>No report found. Please submit patient data first.</h2>;
  }

  const downloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Patient Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Patient Name: ${patientName}`, 20, 40);
    doc.text(`Diagnosis: ${diagnosis}`, 20, 50);
    doc.text(`Confidence: ${confidence}%`, 20, 60);

    doc.save(`${patientName}_Report.pdf`);
  };

  return (
    <div className="report-container">
      <h2>📝 Patient Report</h2>
      <p><strong>Patient Name:</strong> {patientName}</p>
      <p><strong>Diagnosis:</strong> {diagnosis}</p>
      <p><strong>Confidence:</strong> {confidence}%</p>

      <button onClick={downloadReport}>⬇️ Download Report</button>
      <button onClick={() => navigate("/")}>🔙 Back to Home</button>
    </div>
  );
}

export default ReportPage;
