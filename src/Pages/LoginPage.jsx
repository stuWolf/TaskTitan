import React, { useState } from "react";
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { login } from "../services/loginServices";
import Header from '../components/header';
import Footer from '../components/footer';
// import { login } from "../services/loginServices";

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
      // console.log('login pushed with' + data.email,  data.password)
      const response = await login(data);
      if (response.error) {
        setErrorMessage('Please check your username and password');
      } else {
        setErrorMessage(''); // clear error
        // jobsData
        // localStorage.setItem('userData', JSON.stringify(response));
        // console.log('first name ' + response.firstName)
        localStorage.setItem('userName', response.firstName);
        localStorage.setItem('userStatus', response.userStatus);
        localStorage.setItem('userId', response.user_ID);
        localStorage.setItem('token', response.token);
        // console.log('response from login   ' + JSON.parse(localStorage.getItem('userData')) )
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
  
// i want to write the whole of response into local storage.user


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
        <Link to="/workerHome" element={<h1>TODO</h1>} >Forgot Password?</Link>
        <button onClick={handleLogin}>Log in</button>
        <button onClick={handleCancel}>Cancel</button>
        <Link to="/register">Register for Wolf Electrical</Link>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
