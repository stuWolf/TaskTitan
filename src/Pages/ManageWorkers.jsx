import React from 'react';
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';
import {  useNavigate} from 'react-router-dom';

function ManageWorkers() {

  // let location = useLocation();
  const userStatus = localStorage.getItem('userStatus');
  // let userStatus = location.state.userStatus;
 // Get a reference to the history object
 let navigate = useNavigate();
  const handleWorker = () => {
    // Handle login
    navigate('/addWorker');
  };


  // call API to fetch all workers 

  // write all workers documents in an array of workers
  // display each row as a link, 
  // if (job in jobStatus = work assignment) when click assign worker to job
  return (
    <div className="App">
      <Header />
      <Navbar userStatus = {userStatus} />

      <div className="main-content">
        <h2>My Workers</h2>
        <p>User status: {userStatus}</p>
        <button onClick={handleWorker}>Add New Worker</button>
        <p>display worker columns.</p>
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
