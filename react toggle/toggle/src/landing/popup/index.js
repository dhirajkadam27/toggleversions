import './index.css';
import Login from './login';
import SignUp from './signup';
import { useToggle } from '../../config';

function Popup() {
  const {LangingPopup} = useToggle()
  

  return (
    <>
{
  (LangingPopup.status)?
  
  <div className='popupbg'>
  {(LangingPopup.type==="Start")?<SignUp />:<Login/>}
</div>
:null
}
    </>
  );
}

export default Popup;
