// import logo from './logo.svg';
import './App.css';
import LandingPage from './LandingPage'; // Assuming LandingPage is in the same directory
import Header from './header';
import Footer from './footer';
import Home from './home';
// import LandingPage from './LandingPage';
// import LandingPage from './LandingPage';
// import LandingPage from './LandingPage';
// import LandingPage from './LandingPage';
function App() {
  return (
    <div className="App">
       {/* <LandingPage /> */}
       <Header />
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;
