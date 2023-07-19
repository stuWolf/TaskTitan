import React from 'react';
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import { Link, useNavigate } from 'react-router-dom';



export default function Landing(){

  // Get a reference to the history object
  let navigate = useNavigate();

  const handleQuote = () => {
    // Handle login
    navigate('/login');
  };
  return (

    
    <div className="App">
      <Header/>
      

      <div className="landing-page">
      <div className="top-section">
        <Link to="/login">SignIn</Link>
      </div>
        <h2>The one stop shop</h2>
        <h2>for all electrical needs</h2>
        <p>All workers licensed and fully qualified</p>
        <div className="quote-section">
      <button onClick={handleQuote}>Get a Quote</button>
      </div>
      <h2>12 Years in operation and still going strong <strong></strong> !</h2>
     <h1> We stand foor: Quality, Reliability and just great value</h1>
      <h2>What customers say about Wolf Electrical</h2>
      <div className="testimonial-section">
 
      </div>
      </div>
      <Footer/>
    </div>
  );
}


//  <div className="navbar">
//   <Link to="/home">Home</Link>
//   <Link to="/openjobs">Open Jobs</Link>
//   <Link to="/quotes">Quotes</Link> 
//   {/* <Link to="/assignments">Assignments</Link> */}
//   <Link to="/reviews">Reviews</Link>
//   <Link to="/search">Search</Link>
//   <Link to="/profile">Profile</Link>
//   <Link to="/logout">Logout</Link>
// </div>


