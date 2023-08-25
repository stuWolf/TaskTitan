import React, { useState} from "react";
// import React, { useState, useEffect } from "react";
import '../App.css';
// import {printError} from '../services/print_error'
import { Link, useNavigate } from 'react-router-dom';
import { registerCustomer } from "../services/loginServices";
import Header from '../components/header';
import Footer from '../components/footer';
import InputBox from '../components/inputBox';
import Side from '../components/SidePanel';
import  {validateFields} from '../services/helpFunctions'


export const Register = () => {
  const [userMessage, setUserMessage] = useState('')
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  // Get a reference to the history object
  let navigate = useNavigate();

  const handleRegister = async () => {
    // Handle registration

    const { isFormSubmitted, errorMessage } = validateFields(firstName, lastName,email,password,confirmPassword);
    setIsFormSubmitted(isFormSubmitted);
    
    if(!errorMessage){

      // setUserMessage(`Field value:  ${name} ${ surname}`);
   

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;

  };
   if  (!termsAgreed){
        setErrorMessage("please agree with the terms and conditions");
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
    password
    // ... add other fields as necessary
  };

  // console.log('firstname ' + firstName)
  // console.log('email ' + email)
  try {
    const response = await registerCustomer(data); // replace with your actual function call
    // console.log('id ' + response.user_id)
    // console.log('Response email ' + response.email)
    if (response.email) {
      setUserMessage("You registered");
      setErrorMessage("Your registration was successful. Please login");
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
    // console.log('Registration failed:', error);
    setErrorMessage("Registration failed. Please try again." + error);
  }

// console.log('userMessage  '  + userMessage)
    
};


  const handleCancel = () => {
    // Handle login
    navigate('/landing');
  };

  return (
    <div className="App">
       <Header/>
       <h3> Please sign up first</h3>
       <div className="login-form">
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
          
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleCancel}>Cancel</button>
          {errorMessage && <p>{errorMessage}</p>}
          <input type="checkbox" checked={termsAgreed} onChange={e => setTermsAgreed(e.target.checked)} /> I agree with the terms and conditions
          <Link to="/login">Already registered? Login here</Link>
      </div>
      <div style={{ position: 'absolute', left: '-9999px' }}>
          <Side userMessage={userMessage} />
      </div>
      <Footer/>
    </div> 
);

};

export default Register;