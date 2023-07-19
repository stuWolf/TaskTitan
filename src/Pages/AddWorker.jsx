import React, { useState} from "react";
// import React, { useState, useEffect } from "react";
import '../App.css';
import {  useNavigate} from 'react-router-dom';

import Header from '../components/header';
import Footer from '../components/footer';





const AddWorker = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [license, setLicense] = useState("");
  const [licenseno, setLicenseNo] = useState("");
  const [phone, setPhone] = useState("");
  // const [status, setStatus] = useState("");
//   let location = useLocation();
// let status = location.state.status;

  // Get a reference to the history object
  let navigate = useNavigate();

  const handleAddWorker = () => {
    // Handle registration
    if (true) {
      alert("New Worker added Sucessfully");
        // Redirect to manager home page
    navigate('/managerHome');
      return;
  };

   // Assume some registration API call happens here, and it was successful.

  
  };

  const handleCancel = () => {
    // Handle login
    navigate('/managerHome');
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
          <input type="license" value={license} onChange={e => setLicense(e.target.value)} placeholder="License" />
          <input type="licenseno" value={licenseno} onChange={e => setLicenseNo(e.target.value)} placeholder="License Number" />
          <input type="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
          {/* <input type="status" value={status} onChange={e => setStatus(e.target.value)} placeholder="Status" /> */}
          {/* <p>User status: {props.status}</p> */}
          <button onClick={handleAddWorker}>Add Worker</button>
          <button onClick={handleCancel}>Cancel</button>
        
          
      </div>

      <Footer/>
    </div> 
    
  );
};

export default AddWorker;