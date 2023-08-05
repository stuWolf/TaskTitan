import React, { useState, useEffect } from "react";
import {  useNavigate } from 'react-router-dom';
import '../App.css';
import { updateUser, getUser} from "../services/userServices";
import Header from '../components/header';
import Footer from '../components/footer';




const Profile = () => {
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

  // let location = useLocation();
  // let userStatus = location.state.userStatus;
  let navigate = useNavigate();
  const userStatus = localStorage.getItem('userStatus');






  useEffect(() => {

   const fetchUser = async () => {
    try {
      // const response = await getLoggedInUser();
      const response = await getUser(localStorage.getItem('userId'))
      console.log('from fetch user', response); // log the entire response object
      setFirstName(response.firstName);
      setLastName(response.lastName);
      setEmail(response.email);
      setPassword(localStorage.getItem('password'));
      setAddress(response.address);
      setContactNumber(response.contactNumber); 
      // note that the property is 'contactNumber' in your response, not 'phone'
      // if user is a worker, set additional fields
    if (userStatus === 'worker') {
      setDob(response.dob);
      setLicense(response.license);
      setLicenseNo(response.licenseNo);
      setEmployedSince(response.employedSince);
    }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };
  fetchUser();
  }, [userStatus]);

  
  const handleUpdate = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

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

      
    };
    try {
      // console.log(firstName)
      const response = await updateUser(data);
      // console.log('response email  ' + response.email)
      if (response.email) {
        setErrorMessage("Your update was sucessful. Please login again.");
        // Redirect to the login page
        setTimeout(() => {
          navigate('/login');
        }, 2000); // 2000 milliseconds = 2 seconds
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
    // back home
    navigate('/home',{ state: { userStatus} });
  };


  return (
    <div className="App">
       <Header/>
       <div className="login-form">

         
      <p>You are logged in as: {userStatus}</p>

     
        <h2>Update your profile here</h2>
       <input type="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
       <input type="fastName" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" />
          <input type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
          <input type="text" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
          <input type="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
          <input type="contactNumber" value={contactNumber} onChange={e => setContactNumber(e.target.value)} placeholder="Contact Number" />

          {/* additional input fields for worker */}
        {userStatus === 'worker' && (
          <>
            <input type="date" value={dob} onChange={e => setDob(e.target.value)} placeholder="Date of Birth" />
            <input type="text" value={license} onChange={e => setLicense(e.target.value)} placeholder="License" />
            <input type="text" value={licenseNo} onChange={e => setLicenseNo(e.target.value)} placeholder="License Number" />
            <input type="date" value={employedSince} onChange={e => setEmployedSince(e.target.value)} placeholder="Employed Since" />
          </>
        )}
          {/* <input type="status" value={status} onChange={e => setStatus(e.target.value)} placeholder="Status" /> */}
      
          {errorMessage && <p>{errorMessage}</p>}
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleCancel}>Cancel</button>
        
          
      </div>

      <Footer/>
    </div> 
    
  );
};

export default Profile;