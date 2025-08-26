import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/admin/login", {
        username,
        password,
      });
      setMessage(res.data.msg);
      localStorage.setItem("adminLoggedIn", true);
      navigate("/register-technician");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Login error");
    }
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/admin/register", {
        username,
        password,
      });
      setMessage(res.data.msg);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Registration error");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
        <button type="button" onClick={handleRegister} style={{ ...styles.button, backgroundColor: "#28a745" }}>
          Register Admin
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}

const styles = {
  container: {
    background: "#f4f4f4",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "300px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    color: "white",
    backgroundColor: "#007bff",
    border: "none",
    cursor: "pointer",
  },
};

export default AdminLogin;
