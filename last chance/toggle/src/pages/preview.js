import React, { useEffect, useState } from 'react';
import './Preview.css';

function Preview() {
  let page = 0;
  const [changed,setchanged] = useState(0);

  useEffect(() => {
    document.querySelector('.preview_page').innerHTML = localStorage.getItem('content');
    console.log("local ", localStorage.getItem('content'));
    let pages_length = document.querySelector('.preview_page').childElementCount;

    for (let i = 0; i < pages_length; i++) {
      console.log(document.querySelector('.preview_page').childNodes[i].classList[0] !== "page");
      if (document.querySelector('.preview_page').childNodes[i].classList[0] !== "page") {
        document.querySelector('.preview_page').childNodes[i].classList = "delete";
      }
    }

    document.querySelectorAll('.delete').forEach(element => element.remove());
    if(document.querySelectorAll('.page')[page]){
      document.querySelectorAll('.page')[page].style.display = "block";
    }
  }, [page,changed])


  window.addEventListener('storage', (event) => {
    if (event.key === 'content') {
        console.log('New content:', event.newValue);
        setchanged(changed+1);
    }
});
  



  return (
    <>
    <div className='preview_page'>
    </div>
    <div className='previewBtns'>
      <button onClick={()=>{document.querySelectorAll('.page')[page].style.display = "none";page--;document.querySelectorAll('.page')[page].style.display = "block";}}>Prev</button>
      <button onClick={()=>{document.querySelectorAll('.page')[page].style.display = "none";page++;document.querySelectorAll('.page')[page].style.display = "block";}}>Next</button>
    </div>
    </>
  );
}

export default Preview;
