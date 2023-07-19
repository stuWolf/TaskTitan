import React from 'react';
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';
import {  useLocation, useNavigate} from 'react-router-dom';

function ManageWorkers() {

  let location = useLocation();
  let status = location.state.status;
 // Get a reference to the history object
 let navigate = useNavigate();
  const handleWorker = () => {
    // Handle login
    navigate('/addWorker');
  };
  return (
    <div className="App">
      <Header />
      <Navbar status = {status} />

      <div className="main-content">
        <h2>My Workers</h2>
        <p>User status: {status}</p>
        <button onClick={handleWorker}>Add New Worker</button>
        <p>List of workers here.</p>
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

export default ManageWorkers;
