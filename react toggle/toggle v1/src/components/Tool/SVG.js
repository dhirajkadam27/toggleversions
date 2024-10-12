import './SVG.css';
import React, { useRef,useState,useEffect } from 'react';
import { ChromePicker } from "react-color";

function ToolSVG() {
    const ToolBorder = useRef(null);
    const ToolBorder2 = useRef(null);
    const [ShowSVGBackground, setShowSVGBackground] = useState(false);
    const [SVGBackgroundRGB, setSVGBackgroundRGB] = useState({
        r: "241",
        g: "112",
        b: "19",
        a: "1",
      });

    const ToolFocus = (div) => {
        div.style.border = "1px solid #0D99FF";
    }
    const ToolBlur = (div) => {
        div.style.border = "1px solid #181818";
    }


    function rgbaToHex({ r, g, b }) {
        const componentToHex = (c) => {
          const hex = c.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        };
      
        return componentToHex(r) + componentToHex(g) + componentToHex(b);
      }

      useEffect(() => {
        
        document.querySelector('#SVGBoard').style.backgroundColor = `rgba(${SVGBackgroundRGB.r},${SVGBackgroundRGB.g},${SVGBackgroundRGB.b},${SVGBackgroundRGB.a})`;
        if (ShowSVGBackground) {
          
          const handleClick = (event) => {
            if (!event.target.closest('.Color')) {
            if (!event.target.closest('.ColorPicker')) {
              setShowSVGBackground(false);
            }
            }
            
          };

          document.addEventListener('click', handleClick);

          return () => {
            document.removeEventListener('click', handleClick);
          };

        }
    }, [ShowSVGBackground]);


  return (
    <>
    <div className="ToolTitle">Background</div>
    <div className="SVGBackgroundTool">
        <div ref={ToolBorder} className="Left">
            <div style={{backgroundColor: `rgba(${SVGBackgroundRGB.r},${SVGBackgroundRGB.g},${SVGBackgroundRGB.b},${SVGBackgroundRGB.a})`}} onClick={()=>{setShowSVGBackground(true);}} className="Color"></div>
            <input className="HexColor" onFocus={() => ToolFocus(ToolBorder.current)}  onBlur={() => ToolBlur(ToolBorder.current)} type="text" defaultValue={rgbaToHex({ r: parseInt(SVGBackgroundRGB.r), g: parseInt(SVGBackgroundRGB.g), b: parseInt(SVGBackgroundRGB.b)}).toUpperCase()}/>
            <input className="ColorOpacity" onFocus={() => ToolFocus(ToolBorder.current)}  onBlur={() => ToolBlur(ToolBorder.current)} type="text" defaultValue={parseInt(parseFloat(SVGBackgroundRGB.a) * 100)}/>
        </div>
        <button onClick={()=>{
          if(SVGBackgroundRGB.a!=0){
            setSVGBackgroundRGB({
              r: SVGBackgroundRGB.r,
              g: SVGBackgroundRGB.g,
              b: SVGBackgroundRGB.b,
              a: "0",
            });
            document.querySelector('#SVGBoard').style.backgroundColor = `rgba(${SVGBackgroundRGB.r},${SVGBackgroundRGB.g},${SVGBackgroundRGB.b},0)`;
            document.querySelector('.VectorVisibility').innerHTML = "visibility_off";
          }else{
          setSVGBackgroundRGB({
            r: SVGBackgroundRGB.r,
            g: SVGBackgroundRGB.g,
            b: SVGBackgroundRGB.b,
            a: "1",
          });
          document.querySelector('#SVGBoard').style.backgroundColor = `rgba(${SVGBackgroundRGB.r},${SVGBackgroundRGB.g},${SVGBackgroundRGB.b},1)`;
          document.querySelector('.VectorVisibility').innerHTML = "visibility";
          }
        }} className="Right">
            <span className="material-symbols-outlined VectorVisibility">visibility</span>
        </button>
        {(ShowSVGBackground)?
        <ChromePicker
        className="ColorPicker"
          onChange={(color) => {
            document.querySelector('.HexColor').value = (rgbaToHex({ r: parseInt(SVGBackgroundRGB.r), g: parseInt(SVGBackgroundRGB.g), b: parseInt(SVGBackgroundRGB.b)})).toUpperCase();
            document.querySelector('.ColorOpacity').value = parseInt(parseFloat(SVGBackgroundRGB.a) * 100);
            document.querySelector('#SVGBoard').style.backgroundColor = `rgba(${SVGBackgroundRGB.r},${SVGBackgroundRGB.g},${SVGBackgroundRGB.b},${SVGBackgroundRGB.a})`;
            setSVGBackgroundRGB(color.rgb);
          }}
          color={SVGBackgroundRGB.a===1?"#"+rgbaToHex({ r: parseInt(SVGBackgroundRGB.r), g: parseInt(SVGBackgroundRGB.g), b: parseInt(SVGBackgroundRGB.b)}):SVGBackgroundRGB}
        />:""
        }

    </div>
    <div className="ToolBorder"></div>
    <div className="ToolTitle">Version Control</div>
    <div className="VersionControlTool">
        <div ref={ToolBorder2} className="Left">
            <div className="Version">V</div>
            <input className="VersionCode" type="text" onFocus={() => ToolFocus(ToolBorder2.current)}  onBlur={() => ToolBlur(ToolBorder2.current)} defaultValue="1.0"/>
        </div>
    </div>
    <div className="ToolBorder"></div>

    </>
  );
}

export default ToolSVG;
