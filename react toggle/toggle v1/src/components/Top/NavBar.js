import './NavBar.css';

function NavBar() {
  return (
    <div className="NavBar">
      <div className="Left">
        <button className="ProjectInfo">
          <div className="ProjectName">Project Name</div>
          <div className="WorkspaceName">Workspace Name</div>
        </button>

        <button className="ToolBtn"><span className="material-symbols-outlined">near_me</span></button>
        <button className="ToolBtn"><span className="material-symbols-outlined">tag</span></button>
        <button className="ToolBtn"><span className="material-symbols-outlined">rectangle</span></button>
        <button className="ToolBtn"><span className="material-symbols-outlined">pen_size_2</span></button>
        <button className="ToolBtn"><span className="material-symbols-outlined">title</span></button>
        <button className="ToolBtn"><span className="material-symbols-outlined">pan_tool</span></button>
      </div>
      <div className="Middle">
        <button className="ToolBtn active"><span className="material-symbols-outlined">design_services</span></button>
        <button className="ToolBtn"><span className="material-symbols-outlined">code</span></button>
        <button className="ToolBtn"><span className="material-symbols-outlined">database</span></button>
      </div>
      <div className="Right">
        <button className="ToolBtn"><span className="material-symbols-outlined">play_arrow</span></button>
        <button className="ToolBtn">100%</button>
      </div>
    </div>
  );
}

export default NavBar;
