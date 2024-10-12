import { useEffect,useState,useRef } from 'react';
import './Board.css';

function SVGBoard() {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1.0);
  const minScale = 0.1; // Minimum scale (10%)
  const maxScale = 10.0; // Maximum scale (200%)
  const scaleFactor = 0.1; // Adjust as needed
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const panStep = 10; // Pan step in pixels
  var canvas;
  var ctx;

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');

 
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      // Redraw content if necessary
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      // redraw();
    };
    resizeCanvas();
   // Initial draw
   drawCanvas();
   
   const startdrawselector = (event1) =>{
    // Get canvas's position relative to the document
    const rect = canvas.getBoundingClientRect();
    
    // Get the current transformation matrix
    const transform = ctx.getTransform();

    // Calculate the click coordinates adjusted for scale, translation, left, and top
    const clickX = (event1.clientX - rect.left - transform.e) / transform.a;
    const clickY = (event1.clientY - rect.top - transform.f) / transform.d;
    

    const movedrawselector = (event)=>{
      drawselector(event,(clickX - translate.x) / scale,(clickY - translate.x) / scale)
    }
    canvas.addEventListener('mousemove', movedrawselector);

    canvas.addEventListener('mouseup', ()=>{
       canvas.removeEventListener('mousemove', movedrawselector);
     });
  }
   
  canvas.addEventListener('click', createPage);
  canvas.addEventListener('wheel', handleWheel, { passive: false });
   canvas.addEventListener('mousedown', startdrawselector);
 

    return () => {
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('mousedown', startdrawselector);
    };
  }, [scale,translate]);

   // Function to draw on the canvas with current scale
   const drawCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save current transformation matrix
    ctx.save();
    ctx.translate(translate.x, translate.y)
    // Apply scale transformation
    ctx.scale(scale, scale);

    // Draw content on the canvas here, example:
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 200, 100);

    // Restore original transformation matrix
    ctx.restore();
  };

  const handleWheel = (event) => {

    if(event.shiftKey){
      const delta = Math.sign(event.deltaY);
      let newScale = scale;
  
      if (delta > 0) {
        // Zoom out
        newScale = Math.max(minScale, scale - scaleFactor);
      } else {
        // Zoom in
        newScale = Math.min(maxScale, scale + scaleFactor);
      }
  
      setScale(newScale);
      
    }else{
      if(event.deltaX===-0 && event.deltaY>=0 && event.deltaY % 1 == 0){
              console.log("up");
              setTranslate((prevTranslate) => ({
                ...prevTranslate,
                y: prevTranslate.y - panStep,
              }));
            }else if(event.deltaX===-0 && event.deltaY<=0 && event.deltaY % 1 == 0){
              console.log("down");
              setTranslate((prevTranslate) => ({
                ...prevTranslate,
                y: prevTranslate.y + panStep,
              }));
            }else if(event.deltaX>=0 && event.deltaY===-0 && event.deltaY % 1 == 0){
              console.log("right");
              setTranslate((prevTranslate) => ({
            ...prevTranslate,
            x: prevTranslate.x - panStep,
          }));
            }else if(event.deltaX<=0 && event.deltaY===-0 && event.deltaY % 1 == 0){
              console.log("left");
          setTranslate((prevTranslate) => ({
            ...prevTranslate,
            x: prevTranslate.x + panStep / scale,
          }));
            }else{
              const delta = Math.sign(event.deltaY);
              let newScale = scale;
          
              if (delta > 0) {
                // Zoom out
                newScale = Math.max(minScale, scale - scaleFactor);
              } else {
                // Zoom in
                newScale = Math.min(maxScale, scale + scaleFactor);
              }
          
              setScale(newScale);
  
            }
    }
    
    event.preventDefault();
  };

  const handleClick = (event) => {
    // Get canvas's position relative to the document
    const rect = canvas.getBoundingClientRect();
    
    // Get the current transformation matrix
    const transform = ctx.getTransform();

    // Calculate the click coordinates adjusted for scale, translation, left, and top
    const clickX = (event.clientX - rect.left - transform.e) / transform.a;
    const clickY = (event.clientY - rect.top - transform.f) / transform.d;

    console.log(`Clicked at transformed coordinates: (${clickX}, ${clickY})`);

    // Example: Draw a small rectangle at the click position
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    ctx.translate(translate.x, translate.y)
    // Apply scale transformation
    ctx.scale(scale, scale);
    console.log("asa",translate.x);

      // Draw content on the canvas here, example:
      ctx.fillStyle = 'blue';
      ctx.fillRect(50, 50, 200, 100);

    ctx.fillStyle = 'blue';
    ctx.fillRect(((clickX) - translate.x) / scale, ((clickY) - translate.y) / scale, 10, 10); // Example: draw a small rectangle at click position

    
    // Restore original transformation matrix
    ctx.restore();
  };

 
  const drawselector = (event,x,y) =>{

    // Get canvas's position relative to the document
    const rect = canvas.getBoundingClientRect();
    
    // Get the current transformation matrix
    const transform = ctx.getTransform();

    // Calculate the click coordinates adjusted for scale, translation, left, and top
    const clickX = (event.clientX - rect.left - transform.e) / transform.a;
    const clickY = (event.clientY - rect.top - transform.f) / transform.d;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save current transformation matrix
    ctx.save();
    ctx.translate(translate.x, translate.y)
    // Apply scale transformation
    ctx.scale(scale, scale);

     // Define a new path
ctx.beginPath();
// Set start-point
ctx.moveTo(x,y);

// Set sub-points
ctx.lineTo((clickX - translate.x) / scale,y);
ctx.lineTo((clickX - translate.x) / scale,(clickY - translate.x) / scale);
ctx.lineTo(x,(clickY - translate.x) / scale);

// Set end-point
ctx.lineTo(x,y);
// Set fill color
ctx.fillStyle = "#0d99ff2e"; // Set any color here
ctx.strokeStyle = "#0D99FF"; // Set any color here

// Fill the shape
ctx.fill();

// Draw it
ctx.stroke();
// Restore original transformation matrix
ctx.restore();
  }


  const createPage = (event) =>{
    const rect = canvas.getBoundingClientRect();
    
    // Get the current transformation matrix
    const transform = ctx.getTransform();

    // Calculate the click coordinates adjusted for scale, translation, left, and top
    const clickX = (100 - transform.e) / transform.a;
    const clickY = (100 - transform.f) / transform.d;


    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save current transformation matrix
    ctx.save();
    ctx.translate(translate.x, translate.y)
    // Apply scale transformation
    ctx.scale(scale, scale);
    
     // Define a new path
ctx.beginPath();
// Set start-point
ctx.moveTo(100,100);

// Set sub-points
ctx.lineTo(300,100);
ctx.lineTo(300,300);
ctx.lineTo(100,300);

// Set end-point
ctx.lineTo(100,100);
// Set fill color
ctx.fillStyle = "#0d99ff2e"; // Set any color here
ctx.strokeStyle = "#0D99FF"; // Set any color here

// Fill the shape
ctx.fill();

// Draw it
ctx.stroke();
// Restore original transformation matrix
ctx.restore();

  ctx.font = '16px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText("page 1",(100 * scale) + translate.x,(100 * scale) + translate.y);
      
  }
  const createFrame = (event) =>{
  
  
    // Get canvas's position relative to the document
    const rect = canvas.getBoundingClientRect();
    
    // Get the current transformation matrix
    const transform = ctx.getTransform();

    // Calculate the click coordinates adjusted for scale, translation, left, and top
    const clickX = (event.clientX - rect.left - transform.e) / transform.a;
    const clickY = (event.clientY - rect.top - transform.f) / transform.d;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save current transformation matrix
    ctx.save();
    ctx.translate(translate.x, translate.y)
    // Apply scale transformation
    ctx.scale(scale, scale);


    ctx.font = 15/scale+"px Arial";
    ctx.fillText("Frame 1",((clickX - translate.x) / scale)+5,((clickY - translate.x) / scale)-5)
    
     // Define a new path
ctx.beginPath();
// Set start-point
ctx.moveTo(((clickX - translate.x) / scale),((clickY - translate.x) / scale));

// Set sub-points
ctx.lineTo(((clickX - translate.x) / scale)+200,((clickY - translate.x) / scale));
ctx.lineTo(((clickX - translate.x) / scale)+200,((clickY - translate.x) / scale)+200);
ctx.lineTo(((clickX - translate.x) / scale),((clickY - translate.x) / scale)+200);

// Set end-point
ctx.lineTo(((clickX - translate.x) / scale),((clickY - translate.x) / scale));
// Set fill color
ctx.fillStyle = "#0d99ff2e"; // Set any color here
ctx.strokeStyle = "#0D99FF"; // Set any color here

// Fill the shape
ctx.fill();

// Draw it
ctx.stroke();
// Restore original transformation matrix
ctx.restore();
}

  
  return (
    <canvas ref={canvasRef} width="1034" height="400" id="SVGBoard">

    </canvas>
  );
}

export default SVGBoard;
