import React, { useState} from "react";
// import React, { useState, useEffect } from "react";
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../components/header';
import Footer from '../components/footer';
// import Profile from '../Pages/ProfilePage';
import { login } from "../services/loginServices";




 const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userStatus, setStatus] = useState("");
  // const [termsAgreed, setTermsAgreed] = useState(false);
 
  // Get a reference to the history object
  let navigate = useNavigate();

  const handleLogin = () => {


// read email and password out of form and write to data
// call login(data)
// jsonn return as follows:
// {
//   "user_ID": "64c2d71c3469de3f27335ace",
//   "userStatus": "customer",
//   "email": "johncusto2@example.com",
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRjMmQ3MWMzNDY5ZGUzZjI3MzM1YWNlIiwidXNlcm5hbWUiOiJqb2huY3VzdG8yQGV4YW1wbGUuY29tIiwiaWF0IjoxNjkwNDkxMjIzLCJleHAiOjE2OTA1Nzc2MjN9.7dWoA0AgMM5R0PFwIuD5Qc9JlxrcWEgOeE5aTwDccHw"
// }
//  set userStatus to userStatus, local memory, must be available in whole program
// set userId to user_ID, local memory, must be available in whole program
// set token to token, local memory, must be available in whole program
// if return = {
//     "error": "authentication failed"
//   }
// display: please check your username and Password bevore forgot password link

    navigate('/home',{ state: { userStatus } });
    // Handle login
    console.log('loginpage' + {userStatus})
  };

  const handleCancel = () => {
    // Handle login
    navigate('/landing');
  };

  return (
    <div className="App">
       <Header/>
      <div className="login-form">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        {/* <select value={userStatus} onChange={e => setStatus(e.target.value)}>
              <option value="">Status</option>
              <option value="Manager">Manager</option>
              <option value="Customer">Customer</option>
              <option value="Worker">Worker</option>
          </select> */}
        {/* <Profile status={status}/> */}
        <Link to="/profile">Forgot Password?</Link>
        <button onClick={handleLogin}>Log in</button>
        <button onClick={handleCancel}>Cancel</button>
        
        <Link to="/register">Register for Wolf Electrical</Link>
       
        
      </div>

      <Footer/>
    </div> 
    
  );
};

export default Login;