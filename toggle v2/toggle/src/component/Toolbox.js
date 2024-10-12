import { useData } from '../Data';
import './Toolbox.css';

function Toolbox() {
  const {activeTool, setActiveTool} = useData();
  return (
    <div className="Toolbox">
    <button onClick={()=>{setActiveTool('Screen')}} style={{background: activeTool === "Screen" ? "#1E88E5" : "white",color: activeTool === "Screen" ? "white" : "#5f6368"}}>
      <span className="material-symbols-outlined">
        computer
      </span>
    </button>
      <button onClick={()=>{setActiveTool('Select')}} style={{background: activeTool === "Select" ? "#1E88E5" : "white",color: activeTool === "Select" ? "white" : "#5f6368"}}>
        <span className="material-symbols-outlined">
          arrow_selector_tool
        </span>
      </button>
      <button onClick={()=>{setActiveTool('Container')}} style={{background: activeTool === "Container" ? "#1E88E5" : "white",color: activeTool === "Container" ? "white" : "#5f6368"}}>
        <span className="material-symbols-outlined">
          check_box_outline_blank
        </span>
      </button>
      <button onClick={()=>{setActiveTool('Text')}} style={{background: activeTool === "Text" ? "#1E88E5" : "white",color: activeTool === "Text" ? "white" : "#5f6368"}}>
        <span className="material-symbols-outlined">
          title
        </span>
      </button>
      <button onClick={()=>{setActiveTool('Media')}} style={{background: activeTool === "Media" ? "#1E88E5" : "white",color: activeTool === "Media" ? "white" : "#5f6368"}}>
        <span className="material-symbols-outlined">
          perm_media
        </span>
      </button>
    </div>
  );
}

export default Toolbox;
