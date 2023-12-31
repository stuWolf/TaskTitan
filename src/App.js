// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Landing from './Pages/LandingPage';
import Login from './Pages/LoginPage'; // Assuming LandingPage is in the same directory
import Register from './Pages/RegisterPage';
import Profile from './Pages/ProfilePage';
import AddWorker from './Pages/AddWorker';
import ManageWorkers from './Pages/ManageWorkers';
import JobForm from './Pages/JobForm';
import About from './Pages/About';
import Search from './Pages/Search';
import Completed from './Pages/Completed';

import Home from './Pages/home';



// import Quotes from './Quotes';
// import Reviews from './Reviews';
// import Search from './Search';
// import Profile from './Profile';
//import LandingPage from './pages/LandingPage';

function App() {


  return (
    <div className="App">
       {/* <LandingPage /> */}

       <Routes>
       
       <Route path="/landing" element={<Landing />} />
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register/>} />
       <Route path="/profile" element={<Profile />} />
       <Route path="/addWorker" element={<AddWorker/>} />
       <Route path="/jobForm/:jobId" element={<JobForm/>} />
       <Route path="/home" element={<Home />} />
      
       <Route path="/managerWorkers" element={<ManageWorkers/>} />
       
       {/* search functions */}
       <Route path="/completed" element={<Completed/>} />
       {/* <Route path="/openjobs" element={<ManageWorkers/>} /> */}
        <Route path="/quotes" element={<h1>TODO</h1>}/>  {/*displays list of all quotes*/}
        <Route path="/about" element={<About/>}/>  {/*displays list of all reviews*/} 
        <Route path="/search" element={<Search/>}/>

        {/* <Route path="/logout" element={<Login/>}/> */}
        <Route path="/" element={<Landing />} />

       </Routes>



     
    </div>
  );
}

export default App;
