import React from 'react';
import './index.css';

function Right() {

  return (
    <div className='right'>
      <div className='top'>
        <div className='title'>Workspace</div>
        <button><span className="material-symbols-outlined">add</span>Create new</button>
      </div>
      <div className='bottom'>
        <div className='box'>
          <button></button>
          <div className='title'>Project</div>
          <div className='time'>Edited 2 days ago</div>
        </div>
        <div className='box'>
          <button></button>
          <div className='title'>Project</div>
          <div className='time'>Edited 2 days ago</div>
        </div>
        <div className='box'>
          <button></button>
          <div className='title'>Project</div>
          <div className='time'>Edited 2 days ago</div>
        </div>
        <div className='box'>
          <button></button>
          <div className='title'>Project</div>
          <div className='time'>Edited 2 days ago</div>
        </div>
      </div>
    </div>
  );
}

export default Right;
