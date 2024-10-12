import './responsivetoolbar.css';
import React from 'react';
import { CiDesktop,CiLaptop,CiMobile1 } from "react-icons/ci";
import { IoIosTabletPortrait } from "react-icons/io";
import { useUtils } from '../modules/Utils';


function ResponsiveToolBar() {
  const { layerwidth} = useUtils();

  return (
      <div style={{"left": `calc(270px - ${layerwidth}px)`}} className='ResponsiveToolBar'>
      <CiDesktop />
      <CiLaptop className='active' />
      <IoIosTabletPortrait />
      <CiMobile1 />
      </div>
  
  );
}

export default ResponsiveToolBar;
