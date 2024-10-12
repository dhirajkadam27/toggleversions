import './LeftSidebar.css';
import LayerObject from '../Layer/Object';
import LayerFrame from '../Layer/Frame';

function LeftSidebar() {
  return (
    <div className="LeftSidebar">
      <div className="Title">Layer</div>
      <LayerObject data={{"object":"Rectangle 1","root":0}}/>
      <LayerObject data={{"object":"Text 1","root":0}}/>
      <LayerFrame data={{"frame":"Frame 1","root":0,"objects": <><LayerObject data={{"object":"Text 1","root":1}}/> <LayerObject data={{"object":"Text 1","root":1}}/><LayerFrame data={{"frame":"Frame 2","root":1,"objects": <><LayerObject data={{"object":"Text 1","root":2}}/> <LayerObject data={{"object":"Text 1","root":2}}/><LayerFrame data={{"frame":"Frame 2","root":2,"objects": <><LayerObject data={{"object":"Text 1","root":3}}/> <LayerObject data={{"object":"Text 1","root":3}}/></>}} /></>}} /></>}} />
    </div>
  );
}

export default LeftSidebar;
