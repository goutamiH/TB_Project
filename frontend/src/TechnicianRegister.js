import React, { useState } from 'react';
import axios from 'axios';
import './TechnicianRegister.css';

const TechnicianRegister = () => {
  const [techName, setTechName] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [identityFile, setIdentityFile] = useState(null);
  const [professionalFile, setProfessionalFile] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleDobChange = (e) => {
    const dobValue = e.target.value;
    setDob(dobValue);
    const birthYear = new Date(dobValue).getFullYear();
    const currentYear = new Date().getFullYear();
    setAge(currentYear - birthYear);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', techName);
    formData.append('dob', dob);
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('address', address);
    formData.append('identityProof', identityFile);
    formData.append('professionalProof', professionalFile);
    formData.append('username', username);
    formData.append('password', password);

    try {
        await axios.post('http://localhost:5000/technician/register', formData);

      alert('Technician Registered Successfully!');
    } catch (err) {
      console.error(err);
      setError('Registration failed. Try again.');
    }
  };

  return (
    <div style={{ backgroundImage: "url('/tb_backround.webp')", backgroundSize: 'cover', height: '100vh', paddingTop: '60px' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto', background: '#fff', padding: '20px', borderRadius: '10px' }}>
        <h3 style={{ textAlign: 'center' }}>Technician Registration</h3>
        
        <input type="text" placeholder="Name" value={techName} onChange={(e) => setTechName(e.target.value)} required className="form-control mb-2" />

        <input type="date" value={dob} onChange={handleDobChange} required className="form-control mb-2" />

        <input type="number" placeholder="Age" value={age} readOnly className="form-control mb-2" />

        <select value={gender} onChange={(e) => setGender(e.target.value)} required className="form-control mb-2">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input type="text" placeholder="Current Address" value={address} onChange={(e) => setAddress(e.target.value)} required className="form-control mb-2" />

        <label>Identity Proof (Aadhaar/PAN):</label>
        <input type="file" onChange={(e) => setIdentityFile(e.target.files[0])} required className="form-control mb-2" />

        <label>Professional Proof:</label>
        <input type="file" onChange={(e) => setProfessionalFile(e.target.files[0])} required className="form-control mb-2" />

        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="form-control mb-2" />
        
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-control mb-3" />

        <button type="submit" className="btn btn-success w-100">Register Technician</button>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      </form>
    </div>
  );
};

export default TechnicianRegister;
