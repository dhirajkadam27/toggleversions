import './toolbox.css';
import React from 'react';
import { CiLocationArrow1,CiImageOn } from "react-icons/ci";
import { RxFrame } from "react-icons/rx";
import { PiBoundingBoxThin } from "react-icons/pi";
import { TfiText } from "react-icons/tfi";



function ToolBox() {

  return (


      <div className='ToolBox'>
      <CiLocationArrow1 className='active' />
      <RxFrame />
      <PiBoundingBoxThin />
      <CiImageOn />
      <TfiText />

      </div>

  );
}

export default ToolBox;
