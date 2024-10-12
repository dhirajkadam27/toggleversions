import Logo from '../../image/Logo.svg';
import './index.css';
import { useToggle } from '../../config';

function Navbar() {
  const {setLangingPopup}= useToggle();

  return (
      <div className='navbar'>
        <div className='left'>
          <img src={Logo} alt='Toggle Logo' />
          <div className='logo'>toggle</div>
        </div>
        <div className='right'>
          <button onClick={()=>{setLangingPopup({status:true,type:"Login"})}}>Login</button>
          <button onClick={()=>{setLangingPopup({status:true,type:"Start"})}}>Get started for free</button>
        </div>
      </div>

  );
}

export default Navbar;
