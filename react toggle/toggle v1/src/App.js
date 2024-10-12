import './App.css';
import Nav from './components/Top/NavBar';
import LeftSidebar from './components/Left/LeftSidebar';
import RightSidebar from './components/Right/RightSidebar';
import SVGBoard from './components/SVG/Board';
import React,{useEffect} from 'react';

function App() {

  useEffect(() => {
    const preventDefault = (event) => {
      event.preventDefault();
    };
    
    document.addEventListener('wheel', preventDefault, {passive:false});

    return () => {
      document.removeEventListener('wheel', preventDefault);
    };
  }, []);

  return (
    <div className="App">
      <Nav />
      <div className="AppContainer">
      <LeftSidebar />
      <SVGBoard />
      <RightSidebar />
      </div>
    </div>
  );
}

export default App;
