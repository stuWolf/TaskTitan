// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Landing from './Pages/LandingPage';
import Login from './Pages/LoginPage'; // Assuming LandingPage is in the same directory
import Register from './Pages/RegisterPage';
import Profile from './Pages/ProfilePage';
import AddWorker from './Pages/AddWorker';
import ManageWorkers from './Pages/ManageWorkers';

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
       <Route path="/managerHome" element={<h1>TODO</h1>} />
       <Route path="/home" element={<Home />} />
       <Route path="/workerHome" element={<h1>TODO</h1>} />
       <Route path="/managerWorkers" element={<ManageWorkers/>} />
       
       {/* search functions */}
       <Route path="/completed" element={<h1>TODO</h1>} />
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
