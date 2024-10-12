import './toolbox.css';
import React from 'react';
import { CiLocationArrow1,CiImageOn } from "react-icons/ci";
import { RxFrame } from "react-icons/rx";
import { PiBoundingBoxThin } from "react-icons/pi";
import { TfiText } from "react-icons/tfi";
import { useUtils } from '../modules/Utils';



function ToolBox() {
  const { setTargets,activeTool,setActiveTool} = useUtils();

  const addImage =(e)=>{
    const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
          localStorage.setItem('wallpaper', base64String);
          // document.body.style.background = `url(data:image/png;base64,${base64String})`;
          setActiveTool('Media');
        };
        reader.readAsDataURL(file);
  }

  const CreateNewPage = () => {
    
      let width = 0;
      let i = 0;
      const length = document.querySelectorAll('.page').length;
      while (i < length) {
        if (document.querySelectorAll('.page')[i].clientWidth + document.querySelectorAll('.page')[i].offsetLeft > width) {
          width = document.querySelectorAll('.page')[i].clientWidth + document.querySelectorAll('.page')[i].offsetLeft;
        }
        i++;
      }
  
  
  
      const length1 = document.querySelectorAll('.target').length;
      i = 0;
      while (i < length1) {
        if (document.querySelectorAll('.target')[i].clientWidth + document.querySelectorAll('.target')[i].offsetLeft > width) {
          width = document.querySelectorAll('.target')[i].clientWidth + document.querySelectorAll('.target')[i].offsetLeft;
        }
        i++;
      }

      const length2 = document.querySelectorAll('.img').length;
      i = 0;
      while (i < length2) {
        if (document.querySelectorAll('.img')[i].clientWidth + document.querySelectorAll('.img')[i].offsetLeft > width) {
          width = document.querySelectorAll('.img')[i].clientWidth + document.querySelectorAll('.img')[i].offsetLeft;
        }
        i++;
      }

      const length3 = document.querySelectorAll('.text').length;
      i = 0;
      while (i < length3) {
        if (document.querySelectorAll('.text')[i].clientWidth + document.querySelectorAll('.text')[i].offsetLeft > width) {
          width = document.querySelectorAll('.text')[i].clientWidth + document.querySelectorAll('.text')[i].offsetLeft;
        }
        i++;
      }

      var div = document.createElement('div');
      div.setAttribute('class', 'page page' + length);
      div.style.cssText = "width: 300px;height: 500px;position: absolute;top: 0;left: " + (width + 100) + "px;background:white";
      console.log(div);
      document.getElementsByClassName('viewport')[0].appendChild(div);

      


      const htmldata = document.querySelector('.viewport').innerHTML;

// Create a temporary container to parse the HTML string
const tempContainer = document.createElement('div');
tempContainer.innerHTML = htmldata;

// Remove the first child from the temporary container
if (tempContainer.firstChild) {
    tempContainer.removeChild(tempContainer.firstChild);
}

// Update htmldata with the modified HTML
const updatedHtmldata = tempContainer.innerHTML;
    localStorage.setItem('content', updatedHtmldata);
    }
  


  return (


      <div className='ToolBox'>
      <CiLocationArrow1 className={activeTool === 'Select' ? 'active' : null} />
      <RxFrame className={activeTool === 'Page' ? 'active' : null} onClick={() => { CreateNewPage(); setTargets([]) }}/>
      <PiBoundingBoxThin className={activeTool === 'Element' ? 'active' : null} onClick={() => { setActiveTool('Element'); setTargets([]) }}/>
      <input type="file" id="file" onChange={addImage} style={{display:"none"}} />
      <CiImageOn className={activeTool === 'Media' ? 'active' : null} onClick={() => { document.getElementById('file').click(); setTargets([]) }}/>
      <TfiText className={activeTool === 'Text' ? 'active' : null} onClick={() => { setActiveTool('Text'); setTargets([]) }}/>

      </div>

  );
}

export default ToolBox;
