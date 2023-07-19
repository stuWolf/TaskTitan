import React from 'react';
import '../App.css';

function Login() {
  return (
    <div className="App">
      
      <div className="login-form">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Log in</button>
        <button>Forgot Password?</button>
        <button>Register for Wolf Electrical</button>
        <div className="terms">
          <input type="checkbox" id="terms" name="terms" />
          <label htmlFor="terms">I agree with the terms and conditions</label>
        </div>
      </div>

      
    </div>
  );
}

export default Login;
