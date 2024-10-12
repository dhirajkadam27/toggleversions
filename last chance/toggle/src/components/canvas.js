import { useUtils } from '../modules/Utils';
import './canvas.css';
import React from 'react';
import InfiniteView from './InfiniteView';
import Ruler from '../modules/Ruler';
import DrawElement from '../modules/DrawElement';
import Guideline from '../modules/Guideline';
import OnlyDrag from '../modules/OnlyDrag';
import SelectElement from '../modules/SelectElement';
import Selector from './Selector';
import Layer from '../modules/Layers';
import Pages from '../modules/Pages';
import Delete from '../modules/Delete';



function Canvas() {
  const {layerwidth, propertieswidth} = useUtils();

  Layer();
  Pages();
  Ruler();
  DrawElement();
  Guideline();
  OnlyDrag();
  SelectElement();
  Delete();
  return (
      <div style={{"width":`calc(100% - ${(layerwidth===0?250:0) + (propertieswidth===0?250:0)}px)`,"marginLeft":`${(layerwidth===0?250:0)}px`}} className='canvas'>
        <Selector />
        <InfiniteView />
      </div>
  );
}

export default Canvas;
