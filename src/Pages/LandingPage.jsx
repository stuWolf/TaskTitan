import React from 'react';
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';




export default function Landing(){
  return (

    
    <div className="App">
      <Header/>
      


      


      <div className="main-content">
        <h2>The one stop shop</h2>
        <h2>for all electrical needs</h2>
        <p>All workers licensed and fully qualified</p>
      </div>

      <h1>What customers say about Wolf Electrical</h1>

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


