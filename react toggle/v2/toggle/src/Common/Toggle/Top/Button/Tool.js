import './Tool.css';
import { useToggle } from '../../../../config';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";


function Tool({name}) {
  const { useTool,setTool } = useToggle();
  const [active, setactive] = useState('');

  useEffect(()=>{
     if(name===useTool){
      setactive('ToolBtn_01_Active');
     }else{
      setactive('');
     }
  },[useTool,name]);

  const changeTool = ()=>{
    setTool(name);
  }
    return (
      (name!=="play_arrow")?
        <button onClick={changeTool} className={'ToolBtn_01 '+active}><span className="material-symbols-outlined">{name}</span></button>
        :
        <Link to="/preview"><button onClick={changeTool} className={'ToolBtn_01 '+active}><span className="material-symbols-outlined">{name}</span></button></Link>
    );
  }
  
  export default Tool;
  