import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';
import { getLoggedInUser, updateUser } from "../services/userServices";
import Header from '../components/header';
import Footer from '../components/footer';
const Profile = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
// additional state variables for worker
const [dob, setDob] = useState("");
const [license, setLicense] = useState("");
const [licenseNo, setLicenseNo] = useState("");
const [employedSince, setEmployedSince] = useState("");

  let location = useLocation();
  let userStatus = location.state.userStatus;
  let navigate = useNavigate();






  useEffect(() => {

   const fetchUser = async () => {
    try {
      const response = await getLoggedInUser();
      console.log('from fetch user', response); // log the entire response object
      setFirstName(response.firstName);
      setLastName(response.lastName);
      setEmail(response.email);
      setPassword(localStorage.getItem('password'));
      setAddress(response.address);
      setPhone(response.contactNumber); 
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
    const data = {
      FirstName,
      LastName,
      email,
      password,
      address,
      phone,
      dob,
      license,
      licenseNo,
      employedSince
    };
    const response = await updateUser(data);
    if (response.error) {
      setErrorMessage("The email address already exists, please choose another one");
    } else {
      // if  email updated does new token need to be created or can i get going withthe old one till next login?
      setErrorMessage("Your profile was updated successfully plesae login again");
      // old: navigate('/home', { state: { userStatus } });
      // 3s timer
      setTimeout(() => {
        navigate('/login');
      }, 3000); // 3000 milliseconds = 3 seconds
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
       <input type="FirstName" value={FirstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
       <input type="LastName" value={LastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" />
          <input type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
          <input type="text" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
          <input type="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
          <input type="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />

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
          <p>User status: {userStatus}</p>
          {errorMessage && <p>{errorMessage}</p>}
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleCancel}>Cancel</button>
        
          
      </div>

      <Footer/>
    </div> 
    
  );
};

export default Profile;