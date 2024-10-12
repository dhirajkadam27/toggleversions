import Tab from "../../../../Common/Toggle/Top/Button/Tab";
import Tool from "../../../../Common/Toggle/Top/Button/Tool";
import { useToggle } from "../../../../config";
import './index.css';

function Navbar() {
  const { useTab } = useToggle();
  const {scale} = useToggle();

    return (
        <div className="Navbar_01">
        <div className="Left">
          <button className="ProjectInfo">
            <div className="ProjectName">Project Name</div>
            <div className="WorkspaceName">Workspace Name</div>
          </button>
          {(useTab==="design_services") ?
          <><Tool name="near_me"/>
          <Tool name="tag"/>
          <Tool name="rectangle"/>
          <Tool name="pen_size_2"/>
          <Tool name="title"/>
          <Tool name="pan_tool"/></>:
          ""
        }
          
  
        </div>
        <div className="Middle">
          
        <Tab name="design_services"/>
          <Tab name="code"/>
          <Tab name="database"/>

        </div>
        <div className="Right">
        <Tool name="play_arrow"/>
          <button className="ZoomButton">{parseInt(scale*100)}%</button>
        </div>
      </div>
    );
  }
  
  export default Navbar;
  