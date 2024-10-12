import './RightSidebar.css';
import ToolVector from '../Tool/Vector';

function RightSidebar() {
  return (
    <div className="RightSidebar">
      <div className="Tabs">
        <button className="active">Design</button>
        <button>State</button>
        <button>Interact</button>
      </div>
      <ToolVector />
    </div>
  );
}

export default RightSidebar;
