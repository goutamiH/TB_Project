// PatientForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientForm.css"
function PatientForm() {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    age: "",
    gender: "",
    mobile: "",
    dicomFile: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "dob") {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setForm({ ...form, dob: value, age });
    } else if (type === "file") {
      setForm({ ...form, dicomFile: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Random simulated result
    const diagnoses = [
      { label: "✅ Diagnosis: Patient is Normal – no lung issues", confidence: 0.85 },
      { label: "❌ Diagnosis: Tuberculosis detected in lungs", confidence: 0.70 },
      { label: "⚠️ Diagnosis: Other Lung Issue – further investigation needed", confidence: 0.69 }
    ];
    const randomResult = diagnoses[Math.floor(Math.random() * diagnoses.length)];

    // Navigate to report page with data
    navigate("/report", {
      state: {
        patientName: form.name,
        diagnosis: randomResult.label,
        confidence: (randomResult.confidence * 100).toFixed(2),
      },
    });
  };

  return (
    <div className="form-container">
      <h2>Add Patient Details</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Patient Name" name="name" onChange={handleChange} required />
        <input type="date" name="dob" onChange={handleChange} required />
        <input type="number" placeholder="Age" name="age" value={form.age} readOnly />

        <div className="gender-group">
          <label><input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male</label>
          <label><input type="radio" name="gender" value="Female" onChange={handleChange} required /> Female</label>
          <label><input type="radio" name="gender" value="Other" onChange={handleChange} required /> Other</label>
        </div>

        <input type="text" placeholder="Mobile Number" name="mobile" onChange={handleChange} required />
        <input type="file" name="dicomFile" accept=".dcm,.png,.jpg,.jpeg" onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PatientForm;
