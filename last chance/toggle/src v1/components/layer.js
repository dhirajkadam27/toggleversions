import './layer.css';
import React from 'react';
import { CiImageOn } from "react-icons/ci";
import { RxFrame } from "react-icons/rx";
import { PiBoundingBoxThin } from "react-icons/pi";
import { TfiText } from "react-icons/tfi";
import { useUtils } from '../modules/Utils';

import { LuMoreVertical } from "react-icons/lu";

import {Dropdown, Link, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";





function Layer() {
  const {layerwidth, setlayerwidth} = useUtils();

  return (
    <>

<div style={{"left":`-${layerwidth}px`}} className='Layer'>
        <div className='logo'>Toggle<div className='beta'>beta</div>
        
        <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button className='layeroption'
          variant="bordered" 
        >
         <LuMoreVertical />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Static Actions">
        <DropdownItem key="new" shortcut="⌘M">Show Ruler</DropdownItem>
        <DropdownItem key="copy" shortcut="⌘C">Move to center</DropdownItem>
        <DropdownItem key="edit" shortcut="⌘I" className="text-success">Feedback</DropdownItem>
      </DropdownMenu>
    </Dropdown>

        </div>
        <div className='layertitle'>Layer</div>
        <div className='layerlist'>
           <ul>
            <li> <div className='element'><RxFrame />Page 1</div>
              <ul>
                <li><div className='element'><PiBoundingBoxThin />Container 1</div>
                  <ul>
                    <li><div className='element elementactive'><PiBoundingBoxThin />Container 2</div></li>
                    <li><div className='element'><CiImageOn />Image 1</div></li>
                    <li><div className='element'><TfiText />Text 1</div></li>
                  </ul>
                </li>
              </ul>
            </li>
           </ul>
        </div>

        <div className='pagelist'>
          <div className='pagetitle'>Pages</div>
          <div className='pagename'>Page 1</div>
          <div className='pagename pagenameactive'>Page 2</div>
          <div className='pagename'>Page 3</div>
        </div>

        
<div onClick={(e)=>{
  console.log("wheel")
    if(layerwidth===0){
      setlayerwidth(250);
    }
    if(layerwidth===250){
      setlayerwidth(0);
    }
  }} className='layerbar'>
  <div className='bar'></div>
</div>
      
      </div>
    
    </>
    

  );
}

export default Layer;
