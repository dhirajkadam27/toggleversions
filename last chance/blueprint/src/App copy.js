import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import InfiniteViewer from "react-infinite-viewer";
import Guides from "@scena/guides";
import Moveable from "react-moveable";
import Selecto from "react-selecto";

function App() {
  const [zoom, setZoom] = useState(1);
  const [targets, setTargets] = useState([]);
  const moveable = useRef(null);
  const viewerRef = React.useRef(null);
  const selectoRef = React.useRef(null);
  const guidesHorizontal = useRef(null);
  const guidesVertical = useRef(null);
  const guidesHorizontalR = useRef(null);
  const guidesVerticalB = useRef(null);
  const [moveableTriggers, SetMoveableTriggers] = useState({ "draggable": true, "resizable": true, "rotatable": true, "snappable": true });
  const elementGuidelines = [];
  const [activeTool, setActiveTool] = useState('Select');


  useEffect(() => {
    guidesHorizontal.current = new Guides(document.body, {
      className: 'HorizontalRuler',
      type: "horizontal",
      zoom: zoom,
      backgroundColor: "#F5F5F5",
      textColor: "#4b555b",
      lineColor: "#d2d4e5"
    }).on("changeGuides", e => {
      console.log(e.guides);
    });


    guidesVertical.current = new Guides(document.body, {
      className: 'VerticalRuler',
      type: "vertical",
      zoom: zoom,
      backgroundColor: "#F5F5F5",
      textColor: "#4b555b",
      lineColor: "#d2d4e5"
    }).on("changeGuides", e => {
      console.log(e.guides);
    });

    guidesHorizontalR.current = new Guides(document.body, {
      className: 'HorizontalRulerR',
      type: "horizontal",
      zoom: zoom,
      backgroundColor: "#F5F5F5",
      textColor: "#4b555b",
      lineColor: "#d2d4e5"
    }).on("changeGuides", e => {
      console.log(e.guides);
    });


    guidesVerticalB.current = new Guides(document.body, {
      className: 'VerticalRulerB',
      type: "vertical",
      zoom: zoom,
      backgroundColor: "#F5F5F5",
      textColor: "#4b555b",
      lineColor: "#d2d4e5"
    }).on("changeGuides", e => {
      console.log(e.guides);
    });
  }, [zoom])



  useEffect(() => {

    if (targets.length === 1) {
      if (targets[0].classList[0] === "page") {
        SetMoveableTriggers({ "draggable": true, "resizable": false, "rotatable": false, "snappable": true });
      } else {
        SetMoveableTriggers({ "draggable": true, "resizable": true, "rotatable": true, "snappable": true });
      }
    }
  }, [targets]);

  useEffect(() => {
    const handleClick = (event) => {

      if (event.target.classList[0] === 'page' && element.backelement === null) {
        setTargets([event.target]);
      }
      // if (event.target.classList[0] === 'target' && (targets.length === 1 && targets[0].classList[0] === "page")) {
      //   setTargets([event.target]);
      // }
      if (event.target.classList[0] === 'target' && element.backelement === null) {
        setTargets([event.target]);
      }


      if (event.target.classList[0] === 'text') {
        event.target.focus();
        setTargets([event.target]);
      }

      

      if (event.target.classList[0] === 'img') {
        setTargets([event.target]);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [targets]);

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
    var div = document.createElement('div');
    div.setAttribute('class', 'page page' + length);
    div.style.cssText = "width: 300px;height: 500px;border: 1px solid black;position: absolute;top: 0;left: " + (width + 100) + "px;background:white";
    document.getElementsByClassName('viewport')[0].appendChild(div);
  }


  useEffect(() => {
    for (let i = 0; i < document.querySelector('.viewport').childElementCount; i++) {
      if (document.querySelector('.viewport').childNodes[i].classList[0] === "page") {
        elementGuidelines.push({
          element: `.${document.querySelector('.viewport').childNodes[i].classList[1]}`,
          className: "green",
        });
      }

      if (document.querySelector('.viewport').childNodes[i].classList[0] === "target") {
        elementGuidelines.push({
          element: `.${document.querySelector('.viewport').childNodes[i].classList[1]}`,
          className: "red",
        });
      }

      if (document.querySelector('.viewport').childNodes[i].classList[0] === "text") {
        elementGuidelines.push({
          element: `.${document.querySelector('.viewport').childNodes[i].classList[1]}`,
          className: "red",
        });
      }

      if (document.querySelector('.viewport').childNodes[i].classList[0] === "img") {
        elementGuidelines.push({
          element: `.${document.querySelector('.viewport').childNodes[i].classList[1]}`,
          className: "red",
        });
      }

    }
  }, [elementGuidelines])



  const [isMouseDown, setIsMouseDown] = useState({ status: false, moved: false });
  const [element, setElement] = useState({ x: 0, y: 0, name: null, backelement: null });
  useEffect(() => {

    // Handler for mouse down event

    const handleMouseDown = (e) => {
      e.preventDefault();
      setElement({ x: 0, y: 0, name: null, backelement: null });
      if (activeTool === "Element") {
        const length = document.querySelectorAll('.target').length;

        setIsMouseDown({ status: true, moved: false });
        setElement((prevState) => ({
          ...prevState,
          x: e.clientX - e.target.getBoundingClientRect().left,
          y: e.clientY - e.target.getBoundingClientRect().top,
          name: "target" + length,
          backelement: e.target
        }));

        var div = document.createElement('div');
        div.setAttribute('class', 'target target' + length);
        div.style.cssText = "width: 0px;height: 0px;border: 1px solid black;position: absolute;top: " + (e.clientY - e.target.getBoundingClientRect().top) / zoom + "px;left: " + (e.clientX - e.target.getBoundingClientRect().left) / zoom + "px;background:white";
        e.target.appendChild(div);
      }

      if (activeTool === "Media") {
        const length = document.querySelectorAll('.img').length;

        setIsMouseDown({ status: true, moved: false });
        setElement((prevState) => ({
          ...prevState,
          x: e.clientX - e.target.getBoundingClientRect().left,
          y: e.clientY - e.target.getBoundingClientRect().top,
          name: "img" + length,
          backelement: e.target
        }));

        var img = document.createElement('img');
        img.setAttribute('class', 'img img' + length);
        img.setAttribute('src', 'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=');
        img.style.cssText = "width: 0px;height: 0px;border: 1px solid black;position: absolute;top: " + (e.clientY - e.target.getBoundingClientRect().top) / zoom + "px;left: " + (e.clientX - e.target.getBoundingClientRect().left) / zoom + "px;";
        e.target.appendChild(img);
      }

      if (activeTool === "Text") {
        const length = document.querySelectorAll('.text').length;

        setIsMouseDown({ status: true, moved: false });
        setElement((prevState) => ({
          ...prevState,
          x: e.clientX - e.target.getBoundingClientRect().left,
          y: e.clientY - e.target.getBoundingClientRect().top,
          name: "text" + length,
          backelement: e.target
        }));

        var text = document.createElement('div');
        text.setAttribute('class', 'text text' + length);
        text.setAttribute('contenteditable', 'true');
        text.style.cssText = "width: 0px;height: 0px;position: absolute;top: " + (e.clientY - e.target.getBoundingClientRect().top) / zoom + "px;left: " + (e.clientX - e.target.getBoundingClientRect().left) / zoom + "px;";
        e.target.appendChild(text);
      }




    };

    // Handler for mouse up event
    const handleMouseUp = (e) => {

      if (activeTool === "Element" || activeTool === "Media" || activeTool === "Text") {
        if (isMouseDown.moved) {
          setTargets([document.getElementsByClassName(element.name)[0]]);
          setActiveTool('Select');
        } else {
          document.querySelector("." + element.name).remove();
          setElement({ x: 0, y: 0, name: null, backelement: null });
        }
        setIsMouseDown({ status: false, i: 0 });
        console.log("mouse up");
      }
    };

    // Handler for mouse move event
    const handleMouseMove = (e) => {

      if (isMouseDown.status) {
        setIsMouseDown({ status: true, moved: true });
        document.querySelector("." + element.name).style.width = ((e.clientX - element.backelement.getBoundingClientRect().left) - element.x) / zoom + "px";
        document.querySelector("." + element.name).style.height = ((e.clientY - element.backelement.getBoundingClientRect().top) - element.y) / zoom + "px";
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    // Add event listeners for mouse events

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMouseDown, element, activeTool, zoom]);

  useEffect(() => {

    // Handler for mouse down event

    const resize = (e) => {
      guidesHorizontal.current.resize();
      guidesHorizontalR.current.resize();
      guidesVertical.current.resize();
      guidesVerticalB.current.resize();
    };


    window.addEventListener('resize', resize);

    // Add event listeners for mouse events

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);


  const [pages, setpages] = useState([]);

  useEffect(() => {
    const pagescount = document.querySelectorAll(".page").length;
    for (let i = 0; i < pagescount; i++) {
      if (!pages.some(page => page === document.querySelectorAll(".page")[i].classList[1])) {
        setpages([...pages, document.querySelectorAll(".page")[i].classList[1]]);
      }
    }
  }, [targets, pages])

  const [layer, setLayer] = useState([]);
  useEffect(() => {
    const nodecount = document.querySelector(".viewport").childElementCount;
    let z = 1;
    setLayer([]);


    const render = (div,z) => {
      const nodeinnercount = div.childElementCount;
      z++;
      for (let i = 0; i < nodeinnercount; i++) {
          setLayer(prevLayer => [
            ...prevLayer,
            { name: div.childNodes[i].classList[1], padding: z }
          ]);
          if (div.childNodes[i].childElementCount > 0) {
            render(div.childNodes[i],z);
          }
        
      }
    }

    for (let i = 0; i < nodecount; i++) {
      if (document.querySelector(".viewport").childNodes[i].classList[0] === "page" || document.querySelector(".viewport").childNodes[i].classList[0] === "target" || document.querySelector(".viewport").childNodes[i].classList[0] === "img" || document.querySelector(".viewport").childNodes[i].classList[0] === "text") {
        setLayer(prevLayer => [
          ...prevLayer,
          { name: document.querySelector(".viewport").childNodes[i].classList[1], padding: z }
        ]);
        if (document.querySelector(".viewport").childNodes[i].childElementCount > 0) {
          render(document.querySelector(".viewport").childNodes[i],z);
        }
      }
    }

    if(targets[0]){
      console.log("asas",targets[0].style.position)
    }

  }, [pages,targets])






  return (
    <>

      <div className='layer'>
        <div className='pagenav'>
          <div className='pagetitle'>Pages</div>
          <button onClick={() => { CreateNewPage(); setTargets([]) }}>+</button>
        </div>

        <div className='pagelist'>
          {pages.map((page, index) => <div key={index} onClick={()=>{setTargets(document.getElementsByClassName(page)[0])}} className='pagename'>{page}</div>)}
        </div>

        <div className='pagenav'>
          <div className='pagetitle'>Layer</div>
        </div>

        <div className='pagelist'>
        {layer.map((element, index) => <div key={index} onClick={()=>{setTargets(document.getElementsByClassName(element.name)[0])}} style={{"paddingLeft":element.padding*10+"px"}} className='pagename'>{element.name}</div>)}
     
        </div>

      </div>
      <div className='properties'>



        {targets.length===1 && targets[0].style.position?<><label>position</label>
        <select onClick={(e)=>{e.target.focus();}} defaultValue={targets[0].style.position}>
        <option value="absolute">absolute</option>
        <option value="fixed">fixed</option>
        <option value="sticky">sticky</option>
        <option value="relative">relative</option>
        </select></>:null}
        
        {targets.length===1 && targets[0].style.top?<><br />  
        <label>top</label>
        <input defaultValue={targets[0].style.top} onClick={(e)=>{e.target.focus();}} onChange={(e)=>{targets[0].style.top = e.target.value}} type='text' /></>:null}

        {targets.length===1 && targets[0].style.left?<><br />  
        <label>left</label>
        <input defaultValue={targets[0].style.left} onClick={(e)=>{e.target.focus();}} type='text' /></>:null}

        {targets.length===1 && targets[0].style.width?<><br />  
        <label>width</label>
        <input defaultValue={targets[0].style.width} onClick={(e)=>{e.target.focus();}} type='text' /></>:null}


        {targets.length===1 && targets[0].style.height?<><br />  
        <label>height</label>
        <input defaultValue={targets[0].style.height} onClick={(e)=>{e.target.focus();}} type='text' /></>:null}

        {targets.length===1 && targets[0].style.background?<><br />  
        <label>background</label>
        <input defaultValue={targets[0].style.background} onClick={(e)=>{e.target.focus();}} type='text' /></>:null}

        {targets.length===1 && targets[0].src?<><br />  
        <label>background</label>
        <input defaultValue={targets[0].src} onClick={(e)=>{e.target.focus();}} type='text' /></>:null}



        {targets.length===1 && targets[0].style.border?<><br />  
          <label>border</label>
        <input defaultValue={targets[0].style.borderWidth} type='text' />
        <select defaultValue={targets[0].style.borderStyle}>
        <option value="solid">solid</option>
        <option value="dashed">dashed</option>
        </select>
        <input defaultValue={targets[0].style.borderColor} type='text' /></>:null}
        
        

      </div>

      <div className='Toolbox'>
        <button className={activeTool === 'Select' ? 'active' : null}>Select</button>
        <button className={activeTool === 'Element' ? 'active' : null} onClick={() => { setActiveTool('Element'); setTargets([]) }}>Element</button>
        <button className={activeTool === 'Media' ? 'active' : null} onClick={() => { setActiveTool('Media'); setTargets([]) }}>Media</button>
        <button className={activeTool === 'Text' ? 'active' : null} onClick={() => { setActiveTool('Text'); setTargets([]) }}>Text</button>
      </div>

      <Selecto
        ref={selectoRef}
        dragContainer={".infinite-viewer"}
        selectableTargets={[".viewport .target", ".viewport .img", ".viewport .text"]}
        hitRate={0}
        selectByClick={false}
        selectFromInside={true}
        toggleContinueSelect={["shift"]}
        ratio={0}
        keyContainer={window}
        onDragStart={(e) => {
          const target = e.inputEvent.target;
          if (
            moveable.current.isMoveableElement(target)
            || targets.some(t => t === target || t.contains(target))
          ) {
            e.stop();
          }
        }}
        onSelectEnd={e => {
          if (e.isDragStartEnd) {
            e.inputEvent.preventDefault();
            moveable.current.waitToChangeTarget().then(() => {
              moveable.current.dragStart(e.inputEvent);
            });
          }

          setTargets(e.selected);

        }}

      ></Selecto>

      <InfiniteViewer
        ref={viewerRef}
        className="infinite-viewer"
        usePinch={true}
        pinchThreshold={100}
        zoom={zoom}
        onScroll={e => {
          guidesHorizontal.current.scrollGuides(e.scrollLeft);
          guidesHorizontal.current.scroll(e.scrollLeft);
          guidesVertical.current.scrollGuides(e.scrollTop);
          guidesVertical.current.scroll(e.scrollTop);

          guidesHorizontalR.current.scrollGuides(e.scrollLeft);
          guidesHorizontalR.current.scroll(e.scrollLeft);
          guidesVerticalB.current.scrollGuides(e.scrollTop);
          guidesVerticalB.current.scroll(e.scrollTop);
        }}
        onPinch={e => {
          if ((e.zoom >= 0.5) && (e.zoom <= 2)) {
            setZoom(e.zoom);
          }
        }}
      >
        <div className="viewport">

          <Moveable
            ref={moveable}
            scrollable={true}
            // scrollOptions={scrollOptions}
            target={targets}
            dragFocusedInput={true}
            draggable={moveableTriggers.draggable}
            resizable={moveableTriggers.resizable}
            rotatable={moveableTriggers.rotatable}
            snappable={moveableTriggers.snappable}
            snapRotataionThreshold={5}
            snapRotationDegrees={[0, 90, 180, 270]}
            snapDirections={{
              top: true,
              left: true,
              bottom: true,
              right: true,
              center: true,
              middle: true,
            }}
            elementSnapDirections={{
              top: true,
              left: true,
              bottom: true,
              right: true,
              center: true,
              middle: true,
            }}
            maxSnapElementGuidelineDistance={700}
            // verticalGuidelines={[0,pageWidth/2,pageWidth]}
            // horizontalGuidelines={[0,pageWidth/2,pageWidth]}
            elementGuidelines={elementGuidelines}
            onRender={e => {
              e.target.style.cssText += e.cssText;

            }}

          

            onClickGroup={e => {
              selectoRef.current.clickTarget(e.inputEvent, e.inputTarget);
            }}
            onRenderGroup={e => {
              e.events.forEach(ev => {
                ev.target.style.cssText += ev.cssText;
              });
            }}

          />

        </div>
      </InfiniteViewer >
    </>
  );
}

export default App;
