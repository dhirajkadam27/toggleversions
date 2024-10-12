import './Platform.css';
import React from 'react';
import ResponsiveToolBar from '../components/responsivetoolbar';
import AlignmentToolBar from '../components/alignmenttoolbar';
import Layer from '../components/layer';
import Properties from '../components/properties';
import ToolBox from '../components/toolbox';
import Canvas from '../components/canvas';



function Platform() {

  return (
    <div className="Platform">
      <ResponsiveToolBar />
      <AlignmentToolBar />
      <Layer />
      <Canvas />
      <Properties />
      <ToolBox />
    </div>
  );
}

export default Platform;
