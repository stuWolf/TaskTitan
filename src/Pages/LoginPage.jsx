import React, { useState } from "react";
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { login } from "../services/loginServices";
import Header from '../components/header';
import Footer from '../components/footer';
import { login } from "../services/loginServices";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [userStatus, setStatus] = useState("");
  let navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home',{ state: { userStatus } });
    // Handle login
    console.log('loginpage' + {userStatus})
  };
  



  const handleCancel = () => {
    navigate('/landing');
  };

  return (
    <div className="App">
      <Header/>
      <div className="login-form">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        {errorMessage && <p>{errorMessage}</p>}
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
