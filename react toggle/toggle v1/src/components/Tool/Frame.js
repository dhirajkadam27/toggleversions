import './Rectangle.css';
import React, { useRef,useState,useEffect } from 'react';
import { ChromePicker } from "react-color";

function ToolRectangle() {
    const ToolBorder = useRef(null);    
    const [ShowSVGBackground, setShowSVGBackground] = useState(false);
    const [RectangleBackgroundRGB, setRectangleBackgroundRGB] = useState({
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
        
        document.querySelector('#SVGBoard').style.backgroundColor = `rgba(${RectangleBackgroundRGB.r},${RectangleBackgroundRGB.g},${RectangleBackgroundRGB.b},${RectangleBackgroundRGB.a})`;
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
    <div className="RectangleCoordinates">
        <div className="Left">
            <div className="Label">X</div>
            <input className="RectangleX" type="text" />
        </div>
        <div className="Middle">
            <div className="Label">Y</div>
            <input className="RectangleY" type="text" />
            </div>
            <button className="Right"></button>
    </div>
    <div className="RectangleSize">
        <div className="Left">
            <div className="Label">W</div>
            <input className="RectangleW" type="text" />
        </div>
        <div className="Middle">
            <div className="Label">H</div>
            <input className="RectangleH" type="text" />
            </div>
            <button className="Right"><span class="material-symbols-outlined">link</span></button>
    </div>
    
    <div className="RectangleMore">
        <div className="Left">
        <span class="material-symbols-outlined">arrows_more_down</span>
            <input className="RectangleA" type="text" />
        </div>
        <div className="Middle">
        <span class="material-symbols-outlined">rounded_corner</span>
            <input className="RectangleR" type="text" />
            </div>
            <button className="Right"><span class="material-symbols-outlined">pageless</span></button>
    </div>
    <div className="ToolBorder"></div>

    <div className="ToolTitle">Fill</div>
    <div className="RectangleFillTool">
        <div ref={ToolBorder} className="Left">
            <div style={{backgroundColor: `rgba(${RectangleBackgroundRGB.r},${RectangleBackgroundRGB.g},${RectangleBackgroundRGB.b},${RectangleBackgroundRGB.a})`}} onClick={()=>{setShowSVGBackground(true);}} className="Color"></div>
            <input className="HexColor" onFocus={() => ToolFocus(ToolBorder.current)}  onBlur={() => ToolBlur(ToolBorder.current)} type="text" defaultValue={rgbaToHex({ r: parseInt(RectangleBackgroundRGB.r), g: parseInt(RectangleBackgroundRGB.g), b: parseInt(RectangleBackgroundRGB.b)}).toUpperCase()}/>
            <input className="ColorOpacity" onFocus={() => ToolFocus(ToolBorder.current)}  onBlur={() => ToolBlur(ToolBorder.current)} type="text" defaultValue={parseInt(parseFloat(RectangleBackgroundRGB.a) * 100)}/>
        </div>
        <button onClick={()=>{
          if(RectangleBackgroundRGB.a!=0){
            setRectangleBackgroundRGB({
              r: RectangleBackgroundRGB.r,
              g: RectangleBackgroundRGB.g,
              b: RectangleBackgroundRGB.b,
              a: "0",
            });
            document.querySelector('#SVGBoard').style.backgroundColor = `rgba(${RectangleBackgroundRGB.r},${RectangleBackgroundRGB.g},${RectangleBackgroundRGB.b},0)`;
            document.querySelector('.VectorVisibility').innerHTML = "visibility_off";
          }else{
          setRectangleBackgroundRGB({
            r: RectangleBackgroundRGB.r,
            g: RectangleBackgroundRGB.g,
            b: RectangleBackgroundRGB.b,
            a: "1",
          });
          document.querySelector('#SVGBoard').style.backgroundColor = `rgba(${RectangleBackgroundRGB.r},${RectangleBackgroundRGB.g},${RectangleBackgroundRGB.b},1)`;
          document.querySelector('.VectorVisibility').innerHTML = "visibility";
          }
        }} className="Right">
            <span className="material-symbols-outlined VectorVisibility">visibility</span>
        </button>
        {(ShowSVGBackground)?
        <ChromePicker
        className="ColorPicker"
          onChange={(color) => {
            document.querySelector('.HexColor').value = (rgbaToHex({ r: parseInt(RectangleBackgroundRGB.r), g: parseInt(RectangleBackgroundRGB.g), b: parseInt(RectangleBackgroundRGB.b)})).toUpperCase();
            document.querySelector('.ColorOpacity').value = parseInt(parseFloat(RectangleBackgroundRGB.a) * 100);
            document.querySelector('#SVGBoard').style.backgroundColor = `rgba(${RectangleBackgroundRGB.r},${RectangleBackgroundRGB.g},${RectangleBackgroundRGB.b},${RectangleBackgroundRGB.a})`;
            setRectangleBackgroundRGB(color.rgb);
          }}
          color={RectangleBackgroundRGB.a===1?"#"+rgbaToHex({ r: parseInt(RectangleBackgroundRGB.r), g: parseInt(RectangleBackgroundRGB.g), b: parseInt(RectangleBackgroundRGB.b)}):RectangleBackgroundRGB}
        />:""
        }

    </div>


    <div className="ToolBorder"></div>
    
    <div className="ToolTitle">Stroke</div>
    <div className="RectangleStrokeTool">
        <div ref={ToolBorder} className="Left">
            <div style={{backgroundColor: `rgba(${RectangleBackgroundRGB.r},${RectangleBackgroundRGB.g},${RectangleBackgroundRGB.b},${RectangleBackgroundRGB.a})`}} onClick={()=>{setShowSVGBackground(true);}} className="Color"></div>
            <input className="HexColor" onFocus={() => ToolFocus(ToolBorder.current)}  onBlur={() => ToolBlur(ToolBorder.current)} type="text" defaultValue={rgbaToHex({ r: parseInt(RectangleBackgroundRGB.r), g: parseInt(RectangleBackgroundRGB.g), b: parseInt(RectangleBackgroundRGB.b)}).toUpperCase()}/>
            <input className="ColorOpacity" onFocus={() => ToolFocus(ToolBorder.current)}  onBlur={() => ToolBlur(ToolBorder.current)} type="text" defaultValue={parseInt(parseFloat(RectangleBackgroundRGB.a) * 100)}/>
        </div>
        <button onClick={()=>{
          if(RectangleBackgroundRGB.a!=0){
            setRectangleBackgroundRGB({
              r: RectangleBackgroundRGB.r,
              g: RectangleBackgroundRGB.g,
              b: RectangleBackgroundRGB.b,
              a: "0",
            });
            document.querySelector('#SVGBoard').style.backgroundColor = `rgba(${RectangleBackgroundRGB.r},${RectangleBackgroundRGB.g},${RectangleBackgroundRGB.b},0)`;
            document.querySelector('.VectorVisibility').innerHTML = "visibility_off";
          }else{
          setRectangleBackgroundRGB({
            r: RectangleBackgroundRGB.r,
            g: RectangleBackgroundRGB.g,
            b: RectangleBackgroundRGB.b,
            a: "1",
          });
          document.querySelector('#SVGBoard').style.backgroundColor = `rgba(${RectangleBackgroundRGB.r},${RectangleBackgroundRGB.g},${RectangleBackgroundRGB.b},1)`;
          document.querySelector('.VectorVisibility').innerHTML = "visibility";
          }
        }} className="Right">
            <span className="material-symbols-outlined VectorVisibility">visibility</span>
        </button>
        {(ShowSVGBackground)?
        <ChromePicker
        className="ColorPicker"
          onChange={(color) => {
            document.querySelector('.HexColor').value = (rgbaToHex({ r: parseInt(RectangleBackgroundRGB.r), g: parseInt(RectangleBackgroundRGB.g), b: parseInt(RectangleBackgroundRGB.b)})).toUpperCase();
            document.querySelector('.ColorOpacity').value = parseInt(parseFloat(RectangleBackgroundRGB.a) * 100);
            document.querySelector('#SVGBoard').style.backgroundColor = `rgba(${RectangleBackgroundRGB.r},${RectangleBackgroundRGB.g},${RectangleBackgroundRGB.b},${RectangleBackgroundRGB.a})`;
            setRectangleBackgroundRGB(color.rgb);
          }}
          color={RectangleBackgroundRGB.a===1?"#"+rgbaToHex({ r: parseInt(RectangleBackgroundRGB.r), g: parseInt(RectangleBackgroundRGB.g), b: parseInt(RectangleBackgroundRGB.b)}):RectangleBackgroundRGB}
        />:""
        }

    </div>
    <div className="RectangleStrokeMore">
        <div className="Left">
            <select>
                <option>Center</option>
                <option>Inside</option>
                <option>Outside</option>
            </select>
        </div>
        <div className="Middle">
        <span class="material-symbols-outlined">line_weight</span>
            <input className="RectangleR" type="text" />
            </div>
            <button className="Right"><span class="material-symbols-outlined">pageless</span></button>
    </div>

    <div className="ToolBorder"></div>    

    </>
  );
}

export default ToolRectangle;
