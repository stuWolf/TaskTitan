import React, { useState} from "react";
// import React, { useState, useEffect } from "react";
import '../App.css';
import { registerWorker} from "../services/userServices";
import { useNavigate } from 'react-router-dom';

import Header from '../components/header';
import Footer from '../components/footer';





const AddWorker = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // additional state variables for worker
  const [dob, setDob] = useState("");
  const [license, setLicense] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [employedSince, setEmployedSince] = useState("");
  // const [termsAgreed, setTermsAgreed] = useState(false);

  // Get a reference to the history object
  let navigate = useNavigate();
  const userStatus = 'manager'

  const handleAddWorker = async  () => {
    // Handle registration
    console.log('add worker clicked')
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;

  
      

  };
  //  if  (!termsAgreed){
  //       setErrorMessage("please agree with the terms and conditions");
  //       return;

  //  }
     // Check if email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setErrorMessage("Please enter a valid email address");
    return;
  }
    


  const data = {
    firstName,
    lastName,
    email,
    password,
    address,
      contactNumber,
      dob,
      license,
      licenseNo,
      employedSince
    // ... add other fields as necessary
  };

  console.log('firstname ' + firstName)
  console.log('email ' + email)
  try {
    const response = await registerWorker(data); // replace with your actual function call
    console.log('id ' + response.user_id)
    console.log('Response email ' + response.email)
    if (response.email) {
      setErrorMessage("Your new worker is registered.");
      // Redirect to manage worker page
      setTimeout(() => {
        navigate('/managerWorkers',{ state: { userStatus } });
      }, 1000); // 2000 milliseconds = 2 seconds
    } else if (response.message.includes('E11000')) {
      setErrorMessage("The email address already exists, please choose another one");
   // this works
   
    } else {
      setErrorMessage("Registration failed. Please try again.");
    }
  } catch (error) {
    console.log('Registration failed:', error);
    setErrorMessage("Registration failed. Please try again." + error);
  }
  };

  const handleCancel = () => {
    // Handle login
    navigate('/managerWorkers',{ state: { userStatus }} );
  };

  return (
    <div className="App">
       <Header/>
       <div className="login-form">
       <p>You are logged in as: {userStatus}</p>
        <h2>Sign up a new worker here</h2>
       <input type="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
       <input type="fastName" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" />
          <input type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
          <input type="text" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
          <input type="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
          <input type="contactNumber" value={contactNumber} onChange={e => setContactNumber(e.target.value)} placeholder="Contact Number" />

          {/* additional input fields for worker */}
            <p> DOB</p>
            <input type="date" value={dob} onChange={e => setDob(e.target.value)} placeholder="Date of Birth" />
            <input type="text" value={license} onChange={e => setLicense(e.target.value)} placeholder="License" />
            <input type="text" value={licenseNo} onChange={e => setLicenseNo(e.target.value)} placeholder="License Number" />
            {/* < div className="form-row"> */}
            <p>Employment start</p>
            <input type="date" value={employedSince} onChange={e => setEmployedSince(e.target.value)} placeholder="Employed Since" />
            {/* </div> */}
          
            <button onClick={handleAddWorker}>Add Worker</button>
          <button onClick={handleCancel}>Cancel</button>
          {errorMessage && <p>{errorMessage}</p>}
          
          {/* <input type="checkbox" checked={termsAgreed} onChange={e => setTermsAgreed(e.target.checked)} /> I agree with the terms and conditions
          <Link to="/login">Already registered? Login here</Link> */}
      </div>

      <Footer/>
    </div> 
    
  );
};

export default AddWorker;