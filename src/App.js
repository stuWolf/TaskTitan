// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './Pages/LoginPage'; // Assuming LandingPage is in the same directory

import Home from './Pages/home';
import Landing from './Pages/LandingPage';

// import OpenJobs from './OpenJobs';
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
       <Route path="/register" element={<h1>TODO</h1>} />
       <Route path="/profile" element={<h1>TODO</h1>} />
       <Route path="/addWorker" element={<h1>TODO</h1>} />
       <Route path="/managerHome" element={<h1>TODO</h1>} />
       <Route path="/home" element={<Home />} />
       <Route path="/workerHome" element={<h1>TODO</h1>} />
       <Route path="/managerWorkers" element={<h1>TODO</h1>} />

       <Route path="/openjobs" element={<h1>TODO</h1>} />
        <Route path="/quotes" element={<h1>TODO</h1>}/>  {/*displays list of all quotes*/}
        <Route path="/reviews" element={<h1>TODO</h1>}/>  {/*displays list of all reviews*/} 
        <Route path="/search" element={<h1>TODO</h1>}/>

        {/* <Route path="/logout" element={<Login/>}/> */}
        <Route path="/" element={<Landing />} />

       </Routes>



     
    </div>
  );
}

export default App;
