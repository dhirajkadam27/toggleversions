import './Platform.css';
import React from 'react';
import ResponsiveToolBar from '../components/responsivetoolbar';
import AlignmentToolBar from '../components/alignmenttoolbar';
import Layer from '../components/layer';
import InfinityView from '../components/infinityview';
import Properties from '../components/properties';
import ToolBox from '../components/toolbox';



function Platform() {

  return (
    <div className="Platform">
      <ResponsiveToolBar />
      <AlignmentToolBar />
      <Layer />
      <InfinityView />
      <Properties />
      <ToolBox />
    </div>
  );
}

export default Platform;
