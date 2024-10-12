import './Tab.css';
import { useToggle } from '../../../../config';
import { useState,useEffect } from 'react';

function Tab({name}) {

  const { useTab,setTab } = useToggle();
  const [active, setactive] = useState('');

  useEffect(()=>{
     if(name===useTab){
      setactive('TabBtn_01_Active');
     }else{
      setactive('');
     }
  },[useTab,name]);

  const changeTab = ()=>{
    setTab(name);
  }

    return (
        <button onClick={changeTab} className={'TabBtn_01 '+active}><span className="material-symbols-outlined">{name}</span></button>
    );
  }
  
  export default Tab;
  