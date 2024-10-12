import React from 'react';
import './index.css';

function Left() {

  return (
    <div className='left'>
      <div className='workspace_top'>
        <div className='left'>
          <button><span className="material-symbols-outlined">search</span></button>
          <div className='text'>Workspace</div>
        </div>
        <button className='add'><span className="material-symbols-outlined">add</span></button>
      </div>

      <div className='workspaces'>
      <button>Workspace</button>
      <button>Workspace</button>
      <button>Workspace</button>
      </div>
    </div>
  );
}

export default Left;
