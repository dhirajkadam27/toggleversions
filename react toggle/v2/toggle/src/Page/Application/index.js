import React from 'react';
import Navbar from '../../Layout/Toggle/Top/Navbar/'
import Layer from '../../Layout/Toggle/Main/Layer';
import Properties from '../../Layout/Toggle/Main/Properties';
import './index.css';
import Canvas from '../../Layout/Toggle/Main/Canvas';

function Application() {
  
  return (
    <>
    <Navbar />
    <div className='Main_01'>
      <Layer />
      <Canvas />
      <Properties />
    </div>
    </>
  );
}

export default Application;
