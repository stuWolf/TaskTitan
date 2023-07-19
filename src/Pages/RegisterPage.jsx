import React, { useState} from "react";
// import React, { useState, useEffect } from "react";
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../components/header';
import Footer from '../components/footer';





export const Register = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);

  // Get a reference to the history object
  let navigate = useNavigate();

  const handleRegister = () => {
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
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleCancel}>Cancel</button>
        
          <input type="checkbox" checked={termsAgreed} onChange={e => setTermsAgreed(e.target.checked)} /> I agree with the terms and conditions
          <Link to="/login">Already registered? Login here</Link>
      </div>

      <Footer/>
    </div> 
    
  );
};

export default Register;