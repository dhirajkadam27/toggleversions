import './alignmenttoolbar.css';
import React from 'react';
import { PiAlignBottomLight,PiAlignCenterHorizontalLight,PiAlignCenterVerticalLight,PiAlignLeftLight,PiAlignRightLight,PiAlignTopLight } from "react-icons/pi";
import { LuAlignVerticalSpaceBetween,LuAlignHorizontalSpaceBetween } from "react-icons/lu";
import { useUtils } from '../modules/Utils';



function AlignmentToolBar() {
  const { propertieswidth} = useUtils();

  return (
 
      <div style={{"left": `calc(100% -  620px + ${propertieswidth}px)`}} className='AlignmentToolBar'>
      <PiAlignBottomLight />
      <PiAlignLeftLight />
      <PiAlignCenterHorizontalLight className='active' />
      <LuAlignHorizontalSpaceBetween className='lu' />
      <LuAlignVerticalSpaceBetween className='lu' />
      <PiAlignCenterVerticalLight />
      <PiAlignRightLight />
      <PiAlignTopLight />


      </div>
 
  );
}

export default AlignmentToolBar;
