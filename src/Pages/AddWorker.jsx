import React, { useState} from "react";
// import React, { useState, useEffect } from "react";
import '../App.css';
import { registerWorker} from "../services/userServices";
import { useNavigate } from 'react-router-dom';

import Header from '../components/header';
import Footer from '../components/footer';
import InputBox from '../components/inputBox';
import Side from '../components/SidePanel';
import  {validateFields} from '../services/helpFunctions'


const AddWorker = () => {
  const [userMessage, setUserMessage] = useState('')
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
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Get a reference to the history object
  let navigate = useNavigate();
  const userStatus = 'manager'

  const handleAddWorker = async  () => {
    // Handle registration
    // console.log('add worker clicked')


    const { isFormSubmitted, errorMessage } = validateFields(firstName, lastName,email,password,confirmPassword,
      address, contactNumber, dob,license,licenseNo, employedSince);
    setIsFormSubmitted(isFormSubmitted);
    
    if(!errorMessage){




    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return  

  };

     // Check if email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setErrorMessage("Please enter a valid email address");
    return;
  }
    
}else{

  setErrorMessage(errorMessage);
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

  // console.log('firstname ' + firstName)
  // console.log('email ' + email)
  try {
    const response = await registerWorker(data); // replace with your actual function call
    console.log('id ' + response.user_id)
    console.log('Response email ' + response.email)
    if (response.email) {
      setUserMessage("Your new worker is registered.");
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
       <div className="login-form-and-side-panel">
       <div className="login-form">

      <p>You are logged in as: {userStatus}</p>
      <h2>Sign up a new worker here</h2>

      <InputBox 
        id="firstNameInput" 
        label="First Name" 
        setValue={firstName}
        isDisabled={false}
        isSubmitted={isFormSubmitted}
        onChange={(value) => { setFirstName(value); }}
      />

      <InputBox 
        id="lastNameInput" 
        label="Last Name" 
        setValue={lastName}
        isDisabled={false}
        isSubmitted={isFormSubmitted}
        onChange={(value) => { setLastName(value); }}
      />

      <InputBox 
        id="emailInput" 
        label="Email address" 
        setValue={email}
        isDisabled={false}
        isSubmitted={isFormSubmitted}
        onChange={(value) => { setEmail(value); }}
      />

      <InputBox 
        id="passwordInput" 
        label="Password" 
        setValue={password}
        isDisabled={false}
        isSubmitted={isFormSubmitted}
        onChange={(value) => { setPassword(value); }}
      />

      <InputBox 
        id="confirmPasswordInput" 
        label="Confirm Password" 
        setValue={confirmPassword}
        isDisabled={false}
        isSubmitted={isFormSubmitted}
        onChange={(value) => { setConfirmPassword(value); }}
      />

      <InputBox 
        id="addressInput" 
        label="Address" 
        setValue={address}
        isDisabled={false}
        isSubmitted={isFormSubmitted}
        onChange={(value) => { setAddress(value); }}
      />

      <InputBox 
        id="contactNumberInput" 
        label="Contact Number" 
        setValue={contactNumber}
        isDisabled={false}
        isSubmitted={isFormSubmitted}
        onChange={(value) => { setContactNumber(value); }}
      />
      {dob? (
          <div>
      <InputBox 
        id="dobInput" 
        label="Date of Birth" 
        setValue={dob}
        isDisabled={false}
        isSubmitted={isFormSubmitted}
        onChange={(value) => { setDob(value); }}
      />
</div>
        ) : (
          <div>
      <p>DOB</p>
      <input type="date" value={dob} onChange={e => setDob(e.target.value)} placeholder="Date of Birth" />
      </div>
        )}  
        {/* end Job Status */}
      

      <InputBox 
        id="licenseInput" 
        label="License" 
        setValue={license}
        isDisabled={false}
        isSubmitted={isFormSubmitted}
        onChange={(value) => { setLicense(value); }}
      />

      <InputBox 
        id="licenseNoInput" 
        label="License Number" 
        setValue={licenseNo}
        isDisabled={false}
        isSubmitted={isFormSubmitted}
        onChange={(value) => { setLicenseNo(value); }}
      />

{employedSince? (
          <div>
      <InputBox 
        id="employedSinceInput" 
        label="Employed Since" 
        setValue={employedSince}
        isDisabled={false}
        isSubmitted={isFormSubmitted}
        onChange={(value) => { setEmployedSince(value); }}
      />
  </div>
        ) : (
          <div>

      <p>Employment start</p>
      <input type="date" value={employedSince} onChange={e => setEmployedSince(e.target.value)} placeholder="Employed Since" />
      </div>
        )}  
        {/* end Job Status */}
      
      
      <button onClick={handleAddWorker}>Add Worker</button>
      <button onClick={handleCancel}>Cancel</button>
      {errorMessage && <p>{errorMessage}</p>}
      </div>
      <Side userMessage={userMessage} />
      </div>
    
      <Footer/>
    </div> 
);

};

export default AddWorker;