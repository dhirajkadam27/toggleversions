import React from 'react';
import Logo from '../../image/Logo.svg';
import './index.css';

function Navbar() {

  return (
      <div className='nav'>
        <div className='left'>
          <img src={Logo} alt='Toggle Logo' />
          <div className='Text'>Toggle</div>
        </div>
        <div className='right'>
          <button>D</button>
        </div>
      </div>
  );
}

export default Navbar;
