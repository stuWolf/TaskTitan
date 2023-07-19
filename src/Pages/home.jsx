import React from 'react';
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';
import JobColumns from '../components/jobColumns';
// import JobForm from '../components/JobForm';
import {  useLocation, useNavigate} from 'react-router-dom';

function Home() {

  let location = useLocation();
  let status = location.state.status;
  let navigate = useNavigate();

  const handleNewJob = () => {
    navigate('/jobForm',{ state: { status } });
    // Handle login
    console.log('loginpage' + {status})
  };

  console.log('home  ' + status)
  return (
    <div className="App">
      <Header />
      <Navbar status = {status} />

      <div className="main-content">
      <p>User status: {status}</p>

      <div className="form-row">
        <h2>My Jobs</h2>
        
        {status === "Manager" &&
        <div>
        <button onClick={handleNewJob}>Create New Job</button>
        </div>
        }
      </div>
      <JobColumns />
        {status === "Manager" &&
        <div>
          <p>Manager view : List of all jobs with status, assigned worker, quote, and customer details. Option to add new job or quote.</p> 
         </div>
        }

        {status === "Worker" &&
        <p>Worker view: List jobs with status, assigned worker.</p> }
         {status === "Customer" &&
         <div>
         <button onClick={handleNewJob}>Create New Job</button> 
        <p>Customer view: List jobs with status, specific to customer</p>
         
        </div>}
      
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
