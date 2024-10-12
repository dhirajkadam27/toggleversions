import React from 'react';
import './Frame.css';

function Frame({name,id,data}) {
  const closeFrame = (e) =>{
    if(e.target.parentElement.parentElement.getElementsByClassName('Frame_Content')[0].style.display === "" ||e.target.parentElement.parentElement.getElementsByClassName('Frame_Content')[0].style.display === "block"){
      console.log(e.target.parentElement.parentElement.getElementsByClassName('Frame_Content')[0])
      e.target.parentElement.parentElement.getElementsByClassName('Frame_Content')[0].style.display = "none"
    }else{
      
    e.target.parentElement.parentElement.getElementsByClassName('Frame_Content')[0].style.display = "block"
    }
    // div
  }

  return (

    <div className='Layer_01_Frame_01_Main'>
      <div style={{ paddingLeft: id * 30 }} className='TitleBox1'>
        <span onClick={closeFrame} className="material-symbols-outlined ">{data?'arrow_right':null}</span>
        <span className="material-symbols-outlined">tag</span>
        <div className='Title1'>{name}</div>
      </div>
      <div className='Frame_Content'>
      {data?data.map((item,index)=>{
       return ( <div key={index}>
        {(item.elements)?<Frame id={id+1} name={item.name} data={item.elements}/>:<Frame id={id+1} name={item.name}/>}
        </div>  
        );
      }):null}
      </div>
    </div>


  );
}

export default Frame;
