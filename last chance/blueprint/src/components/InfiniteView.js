import InfiniteViewer from "react-infinite-viewer";
import {useUtils} from '../modules/Utils';
import MovableTool from "./MovableTool";

function InfiniteView() {
  const { viewerRef,zoom,setZoom,guidesHorizontal,guidesHorizontalR,guidesVertical,guidesVerticalB} = useUtils();
    return (
        <>

            
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
