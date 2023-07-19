import React from 'react';
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';
import {  useLocation} from 'react-router-dom';

function Home() {

  let location = useLocation();
  let status = location.state.status;
  return (
    <div className="App">
      <Header />
      <Navbar />

      <div className="main-content">
        <h2>Main Content</h2>
        <p>User status: {status}</p>
        <p>List of jobs with status, assigned worker, quote, and customer details. Option to add new job or quote.</p>
      </div>

      {/* <div className="side-panel">
        <h2>Notifications</h2>
        <p>Notifications about new jobs, quotes, assignments, and reviews.</p>
      </div> */}
      <Side/>

      <Footer/> 
    </div>
  );
}

export default Home;
