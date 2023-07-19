import React, { useState} from "react";
// import React, { useState, useEffect } from "react";
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../components/header';
import Footer from '../components/footer';


// function Login() {
//   return (
//     <div className="App">
      
//       <div className="login-form">
//         <input type="email" placeholder="Email" />
//         <input type="password" placeholder="Password" />
//         <button>Log in</button>
//         <button>Forgot Password?</button>
//         <button>Register for Wolf Electrical</button>
//         <div className="terms">
//           <input type="checkbox" id="terms" name="terms" />
//           <label htmlFor="terms">I agree with the terms and conditions</label>
//         </div>
//       </div>
      
//     </div>
//   );
// }

// export default Login;


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [termsAgreed, setTermsAgreed] = useState(false);

  // Get a reference to the history object
  let navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home');
    // Handle login
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