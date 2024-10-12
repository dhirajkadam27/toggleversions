import './alignmenttoolbar.css';
import React, { useEffect, useState } from 'react';
import { PiAlignBottomLight,PiAlignCenterHorizontalLight,PiAlignCenterVerticalLight,PiAlignLeftLight,PiAlignRightLight,PiAlignTopLight } from "react-icons/pi";
import { LuAlignVerticalSpaceBetween,LuAlignHorizontalSpaceBetween } from "react-icons/lu";
import { useUtils } from '../modules/Utils';



function AlignmentToolBar() {
  const { propertieswidth,targets} = useUtils();

  const [display,setdisplay] = useState('none')

  useEffect(()=>{
    if(targets.length===1){
      setdisplay('none');
    }else if(targets.length===0){
      setdisplay('none');
    }else{
      setdisplay('flex');
    }
    console.log(targets);
  },[targets])

  return (
 
      <div style={{"left": `calc(100% -  620px + ${propertieswidth}px)`,"display":display}} className='AlignmentToolBar'>
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
