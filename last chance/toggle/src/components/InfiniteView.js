import InfiniteViewer from "react-infinite-viewer";
import { useUtils } from '../modules/Utils';
import MovableTool from "./MovableTool";
import { useEffect, useRef, useState } from "react";

function InfiniteView() {
  const { viewerRef, zoom, setZoom, guidesHorizontal, guidesHorizontalR, guidesVertical, guidesVerticalB } = useUtils();
  const [ones, setOnes] = useState(0);
  const hasRun = useRef(false);
  
  useEffect(() => {
    if (!hasRun.current && ones === 0) {
      const content = localStorage.getItem('content');
      if (content !== null) {
        document.querySelector('.viewport').insertAdjacentHTML('beforeend', content);
        setOnes(1);
      }
      hasRun.current = true;
    }
  }, [ones]);

  return (
    <>

<div className="temp"></div>
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

          <MovableTool />

        </div>
      </InfiniteViewer >


    </>
  );
}

export default InfiniteView;
