import React, { useState, useEffect } from "react";
import {  useNavigate } from 'react-router-dom';
import '../App.css';
import { updateUser, getUser} from "../services/userServices";
import Header from '../components/header';
import Footer from '../components/footer';
import Side from '../components/SidePanel';
import InputBox from '../components/inputBox';
import  {validateFields} from '../services/helpFunctions'

const Profile = () => {
  const [userMessage, setUserMessage] = useState('')
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
// additional state variables for worker
const [dob, setDob] = useState("");
const [license, setLicense] = useState("");
const [licenseNo, setLicenseNo] = useState("");
const [employedSince, setEmployedSince] = useState("");

  // let location = useLocation();
  // let userStatus = location.state.userStatus;
  let navigate = useNavigate();
  const userStatus = localStorage.getItem('userStatus');


// Function to format the date

const formatDate = (dateString) => {
  if(dateString === 'No Data'){
  return 'No Data';
  
  }else{
    
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;  // Months are 0-indexed in JavaScript
    const year = date.getFullYear().toString().slice(-2);  // Last 2 digits of year
    return `${day}/${month}/${year}`;
  }
   
  }; // end format date



  useEffect(() => {

   const fetchUser = async () => {
    try {
      // const response = await getLoggedInUser();
      // console.log('userId  '   + localStorage.getItem('userId'))
      // console.log('token  '   + localStorage.getItem('token'))
      const response = await getUser(localStorage.getItem('userId'))
      // console.log('from fetch user', response); // log the entire response object
      setFirstName(response.firstName);
      setLastName(response.lastName);
      setEmail(response.email);
      setPassword(localStorage.getItem('password'));
      setAddress(response.address);
      setContactNumber(response.contactNumber); 
      // note that the property is 'contactNumber' in your response, not 'phone'
      // if user is a worker, set additional fields
    if (userStatus === 'worker') {
      setDob(formatDate(response.dob));
      setLicense(response.license);
      setLicenseNo(response.licenseNo);
      setEmployedSince(formatDate(response.employedSince));
    }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };
  console.log('fetch user called')
  fetchUser();
  }, []);

  
  const handleUpdate = async () => {
    const { isFormSubmitted, errorMessage } = validateFields(firstName, lastName,email,password,confirmPassword);
    setIsFormSubmitted(isFormSubmitted);
    
    if(!errorMessage){
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

      
    };
    try {
      // console.log(firstName)
      const response = await updateUser(data);
      // console.log('response email  ' + response.email)
      if (response.email) {
        setUserMessage("Profile data updated");
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
       <div className="login-form-and-side-panel">
       <div className="login-form">

      <p>You are logged in as: {userStatus}</p>
      <h2>Update your profile here</h2>

      <InputBox 
        id="firstNameInput" 
        label="First Name" 
        setValue={firstName}
        isDisabled={false}
        isSubmitted={isFormSubmitted}
        onChange={(value) => { setFirstName(value); }}
      />
{/* {firstName && <p>{firstName}</p>} */}
      <InputBox 
        id="lastNameInput" 
        label="Last Name" 
        setValue={lastName}
        isDisabled={false}
        isSubmitted={isFormSubmitted}
        onChange={(value) => { setLastName(value); }}
      />
{/* {lastName && <p>{lastName}</p>} */}
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

      {userStatus === 'worker' && (
        <>
          <InputBox 
            id="dobInput" 
            label="Date of Birth" 
            setValue={dob}
            isDisabled={false}
            isSubmitted={isFormSubmitted}
            onChange={(value) => { setDob(value); }}
          />

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
{/* {licenseNo && <p>{licenseNo}</p>} */}
          <InputBox 
            id="employedSinceInput" 
            label="Employed Since" 
            setValue={employedSince}
            isDisabled={false}
            isSubmitted={isFormSubmitted}
            onChange={(value) => { setEmployedSince(value); }}
          />
        </>
      )}

      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleCancel}>Cancel</button>
      
      </div>
      <Side userMessage={userMessage} />
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <Footer/>
    </div> 
);

};

export default Profile;