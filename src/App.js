// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './Pages/LoginPage'; // Assuming LandingPage is in the same directory

import Home from './Pages/home';

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
       <Route path="/home" element={<Home />} />
       <Route path="/openjobs" element={<h1>TODO</h1>} />
        <Route path="/quotes" element={<h1>TODO</h1>}/>
        <Route path="/reviews" element={<h1>TODO</h1>}/>
        <Route path="/search" element={<h1>TODO</h1>}/>
        <Route path="/profile" element={<h1>TODO</h1>}/>
        <Route path="/logout" element={<Login />}/>
        <Route path="/" element={<Home />} />

       </Routes>



     
    </div>
  );
}

export default App;
