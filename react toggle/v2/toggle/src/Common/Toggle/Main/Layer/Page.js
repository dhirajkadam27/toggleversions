import React from 'react';
import './Page.css';
import Frame from './Frame';

function Page({ id, name, data }) {

  const closePage = (e) =>{
    if(e.target.parentElement.parentElement.getElementsByClassName('Page_Content')[0].style.display === "" ||e.target.parentElement.parentElement.getElementsByClassName('Page_Content')[0].style.display === "block"){
      console.log(e.target.parentElement.parentElement.getElementsByClassName('Page_Content')[0])
      e.target.parentElement.parentElement.getElementsByClassName('Page_Content')[0].style.display = "none"
    }else{
      
    e.target.parentElement.parentElement.getElementsByClassName('Page_Content')[0].style.display = "block"
    }
  }
  return (
    <div className='Layer_01_Page_01_Main'>
      <div style={{ paddingLeft: id * 30 }} className='TitleBox'>
        <span onClick={closePage} className="material-symbols-outlined">{data?'arrow_right':null}</span>
        <span className="material-symbols-outlined">contextual_token</span>
        <div className='Title'>{name}</div>
      </div>
      <div className='Page_Content'>
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

export default Page;
