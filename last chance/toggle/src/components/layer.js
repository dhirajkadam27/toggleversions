import './layer.css';
import React, { useEffect, useState } from 'react';
import { CiImageOn } from "react-icons/ci";
import { RxFrame } from "react-icons/rx";
import { PiBoundingBoxThin } from "react-icons/pi";
import { TfiText } from "react-icons/tfi";
import { useUtils } from '../modules/Utils';

import { LuMoreVertical } from "react-icons/lu";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";




const transformData = (data) => {
  const map = new Map();
  const roots = [];

  data.forEach(item => {
    map.set(item.name, { ...item, children: [] });
  });

  data.forEach(item => {
    if (item.padding > 1) {
      const parent = data.find(p => p.padding === item.padding - 1);
      if (parent) {
        map.get(parent.name).children.push(map.get(item.name));
      } else {
        roots.push(map.get(item.name));
      }
    } else {
      roots.push(map.get(item.name));
    }
  });

  return roots;
};





function getDomStructure(element) {
  const structure = {
    tagName: element.tagName.toLowerCase(),
    className: element.className || null,
    children: []
  };

  element.childNodes.forEach((child) => {
    if (child.classList[0] === "page" || child.classList[0] === "target" || child.classList[0] === "img" || child.classList[0] === "text") {
      if (child.nodeType === 1) { // Only process element nodes
        structure.children.push(getDomStructure(child));
      } else if (child.nodeType === 3 && child.nodeValue.trim()) { // Process text nodes if not empty
        structure.children.push({
          tagName: 'text',
          content: child.nodeValue.trim()
        });
      }
    }

  });

  return structure;
}

function renderDomStructure(node) {
  if (node.tagName === 'text') {
    return <li key={node.content}>{node.content}</li>;
  }

  return (

    <>

      <li key={node.className || node.tagName}>
        <div className='element'>{node.className}</div>
        {node.children.length > 0 && (
          <ul>
            {node.children.map((child, index) => renderDomStructure(child))}
          </ul>
        )}
      </li>


      {/* <li key={node.className || node.tagName}>
<div className='element'>{node.tagName.toUpperCase()}{node.className ? ` (class: ${node.className})` : ''}</div> 
{node.children.length > 0 && (
  <ul>
    {node.children.map((child, index) => renderDomStructure(child))}
  </ul>
)}
</li> */}

    </>
  );
}




function Layer() {
  const { layerwidth, setlayerwidth, layer, setTargets, pages, viewerRef } = useUtils();
  const [ruler, setruler] = useState(true);

  // Render HTML dynamically based on hierarchical data
  const renderElement = (item) => {
    const icons = {
      page: <RxFrame />,
      target: <PiBoundingBoxThin />,
      img: <CiImageOn />,
      text: <TfiText />,
    };

    // Determine type based on name (you may adjust this logic)
    const type = item.name.startsWith('page') ? 'page' :
      item.name.startsWith('target') ? 'target' :
        item.name.startsWith('img') ? 'img' : 'text';

    return (
      <li key={item.name}>
        <div onClick={() => { setTargets(document.getElementsByClassName(item.name)[0]) }} className='element'>
          {icons[type]}{item.name}
        </div>
        {item.children && item.children.length > 0 && (
          <ul>
            {item.children.map(renderElement)}
          </ul>
        )}
      </li>
    );
  };


  const hierarchicalData = transformData(layer);


  const hideRuler = () => {
    document.querySelectorAll('.HorizontalRuler').forEach(element => element.style.display = 'none');
    document.querySelectorAll('.VerticalRuler').forEach(element => element.style.display = 'none');
    document.querySelectorAll('.HorizontalRulerR').forEach(element => element.style.display = 'none');
    document.querySelectorAll('.VerticalRulerB').forEach(element => element.style.display = 'none');
    setruler(false);
  }

  const showRuler = () => {
    document.querySelectorAll('.HorizontalRuler').forEach(element => element.style.display = 'block');
    document.querySelectorAll('.VerticalRuler').forEach(element => element.style.display = 'block');
    document.querySelectorAll('.HorizontalRulerR').forEach(element => element.style.display = 'block');
    document.querySelectorAll('.VerticalRulerB').forEach(element => element.style.display = 'block');
    setruler(true);
  }



  const [structure, setStructure] = useState(null);

  useEffect(() => {
    const mainDiv = document.querySelector('.viewport');
    if (mainDiv) {
      const domStructure = getDomStructure(mainDiv);
      setStructure(domStructure);
    }
  }, []);

  return (
    <>

      <div style={{ "left": `-${layerwidth}px` }} className='Layer'>
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
              {ruler ?
                <DropdownItem key="show" onClick={hideRuler} shortcut="⌘M">Hide Ruler</DropdownItem> :
                <DropdownItem key="hide" onClick={showRuler} shortcut="⌘M">Show Ruler</DropdownItem>
              }

              <DropdownItem onClick={() => { viewerRef.current.scrollCenter(); }} key="copy" shortcut="⌘C">Move to center</DropdownItem>
              <DropdownItem key="edit" onClick={() => { localStorage.clear(); }} shortcut="⌘I" className="text-success">Feedback</DropdownItem>
            </DropdownMenu>
          </Dropdown>

        </div>
        <div className='layertitle'>Layer</div>


        <div className='layerlist'>
          {/* <ul>
        {hierarchicalData.map(renderElement)}
      </ul> */}

          {structure ? (
            <ul>
              {renderDomStructure(structure)}
            </ul>
          ) : (
            <p>Loading structure...</p>
          )}

        </div>

        <div className='pagelist'>
          <div className='pagetitle'>Pages</div>

          {pages.map((page, index) => <div key={index} onClick={() => { setTargets(document.getElementsByClassName(page)[0]) }} className='pagename'>{page}</div>)}

        </div>


        <div onClick={(e) => {
          if (layerwidth === 0) {
            setlayerwidth(250);
          }
          if (layerwidth === 250) {
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
