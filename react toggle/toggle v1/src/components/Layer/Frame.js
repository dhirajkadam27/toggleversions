import './Frame.css';
import React, { useRef } from 'react';

function LayerFrame({data}) {
  const LayerFrame = useRef(null);
  
  const AccessRootObjects = (frame) => {
    if(frame.getElementsByClassName('FrameContent')[0].style.display == "none"){
      frame.getElementsByClassName('FrameContent')[0].style.display = "block";
      frame.getElementsByClassName('Arrow')[0].style.transform = "rotate(0deg)";
    }else{
    frame.getElementsByClassName('FrameContent')[0].style.display = "none";
    frame.getElementsByClassName('Arrow')[0].style.transform = "rotate(275deg)";
    }
}

  return (
    <div ref={LayerFrame} className="LayerFrame">
      <div className="FrameInfo">
          <span onClick={() => AccessRootObjects(LayerFrame.current)} style={{ marginLeft: data.root*15+'px' }} className="material-symbols-outlined Arrow">arrow_drop_down</span>
          <span className="material-symbols-outlined">tag</span>
          <div className="FrameName">{data.frame}</div>
      </div>
      <div className="FrameContent">
        {data.objects}
      </div>
    </div>
  );
}

export default LayerFrame;
