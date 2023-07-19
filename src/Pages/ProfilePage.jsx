import React, { useState} from "react";
// import React, { useState, useEffect } from "react";
import '../App.css';
import {  useNavigate } from 'react-router-dom';

import Header from '../components/header';
import Footer from '../components/footer';





export const Profile = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  // Get a reference to the history object
  let navigate = useNavigate();

  const handleUpdate = () => {
    // Handle registration
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
  };

   // Assume some registration API call happens here, and it was successful.

    // Redirect to the login page
    navigate('/login');
  };

  const handleCancel = () => {
    // Handle login
    navigate('/landing');
  };

  return (
    <div className="App">
       <Header/>
       <div className="login-form">
       <input type="FirstName" value={FirstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
       <input type="LastName" value={LastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
          <input type="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
          <input type="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
          {/* <input type="status" value={status} onChange={e => setStatus(e.target.value)} placeholder="Status" /> */}
          <select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="">Status</option>
              <option value="Manager">Manager</option>
              <option value="Customer">Customer</option>
          </select>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleCancel}>Cancel</button>
        
          
      </div>

      <Footer/>
    </div> 
    
  );
};

export default Profile;