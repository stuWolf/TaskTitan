import React, { useState } from "react";
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../components/header';
import Footer from '../components/footer';
import { login } from "../services/loginServices";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [userStatus, setStatus] = useState("");
  let navigate = useNavigate();

  const handleLogin = async () => {
    // login button pressed
    const data = {
      email,
      password
    };
    try {
      console.log('login pushed with' + data.email,  data.password)
      const response = await login(data);
      if (response.error) {
        setErrorMessage('Please check your username and password');
      } else {
        setErrorMessage(''); // clear error
        localStorage.setItem('userStatus', response.userStatus);
        localStorage.setItem('userId', response.user_ID);
        localStorage.setItem('token', response.token);
        console.log('response from login   ' +response.token )
        // localStorage.setItem('password', password);
        navigate('/home', { state: { userStatus: response.userStatus } });
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        setErrorMessage('Request timed out. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
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
