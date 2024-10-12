import './responsivetoolbar.css';
import React, { useEffect, useState } from 'react';
import { CiDesktop,CiLaptop,CiMobile1 } from "react-icons/ci";
import { IoIosTabletPortrait } from "react-icons/io";
import { useUtils } from '../modules/Utils';


function ResponsiveToolBar() {
  const { layerwidth,targets} = useUtils();
  const [display,setdisplay] = useState('none')

  useEffect(()=>{
    if(targets.length===1){
      if (targets[0].classList[0] === "page") {
        setdisplay('flex');
      }else{
        setdisplay('none');
      }
    }else{
      setdisplay('none');
    }
    console.log(targets);
  },[targets])

  return (
      <div style={{"left": `calc(270px - ${layerwidth}px)`,"display":display}} className='ResponsiveToolBar'>
      <CiDesktop />
      <CiLaptop className='active' />
      <IoIosTabletPortrait />
      <CiMobile1 />
      </div>
  
  );
}

export default ResponsiveToolBar;
