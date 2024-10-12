import { useUtils } from '../modules/Utils';
import './infinityview.css';
import React from 'react';



function InfinityView() {
  const {layerwidth, propertieswidth} = useUtils();

  return (
      <div style={{"width":`calc(100% - ${(layerwidth===0?250:0) + (propertieswidth===0?250:0)}px)`,"margin-left":`${(layerwidth===0?250:0)}px`}} className='InfinityView'>

      </div>
      
  );
}

export default InfinityView;
