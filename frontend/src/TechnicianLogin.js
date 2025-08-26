import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TechnicianLogin.css";  // Ensure this import is present

function TechnicianLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/technician/login", {
        username,
        password,
      });

      alert(res.data.msg);
      localStorage.setItem("technicianId", res.data.technicianId);
      navigate("/patient-form");

    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="page-container">
      <div className="login-box">
        <h2>Technician Login</h2>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default TechnicianLogin;
