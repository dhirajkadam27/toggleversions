import Google from '../../../image/google.png';
import './index.css';
import { Link } from 'react-router-dom';
import { useToggle } from '../../../config';
function Login() {
  const {setLangingPopup} = useToggle();

  return (
    <div className='popup'>
      <button onClick={() => { setLangingPopup({ status: false, type: null }) }} className='close'><span className="material-symbols-outlined">close</span></button>
      <button className='google'><img src={Google} alt='Google Logo' />Continue with Goggle</button>
      <div className='or'>or</div>
      <input type='text' placeholder='Email' />
      <input type='text' placeholder='Password' />
      <Link to="/applications"><button className='continue'>Log In</button></Link>
      <div className='redirect'>No account?<div onClick={() => { setLangingPopup({ status: true, type: "Start" }) }} className='link'>Create one</div></div>
    </div>
  );
}

export default Login;
