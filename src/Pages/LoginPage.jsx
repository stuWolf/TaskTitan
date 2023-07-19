import React, { useState} from "react";
// import React, { useState, useEffect } from "react";
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../components/header';
import Footer from '../components/footer';
// import Profile from '../Pages/ProfilePage';





 const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  // const [termsAgreed, setTermsAgreed] = useState(false);
 
  // Get a reference to the history object
  let navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home',{ state: { status } });
    // Handle login
    console.log('loginpage' + {status})
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
        <select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="">Status</option>
              <option value="Manager">Manager</option>
              <option value="Customer">Customer</option>
              <option value="Worker">Worker</option>
          </select>
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