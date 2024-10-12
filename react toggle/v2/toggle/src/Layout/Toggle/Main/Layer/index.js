import React from 'react';
import './index.css';
import { useToggle } from '../../../../config';
import Frame from '../../../../Common/Toggle/Main/Layer/Frame';
import Page from '../../../../Common/Toggle/Main/Layer/Page';

function Layer() {
  const root = 0;
  const {data} = useToggle();

  const reversedData = [...data].reverse();
  return (
    <div className='Layer_01'>
      <div className='PageTitle'>
         <div className='Title'>Pages</div>
         <button><span className="material-symbols-outlined">add</span></button>
      </div>
      <div className='Pages'>
      <div className='Name ActivePage'><span className="material-symbols-outlined">check</span>Page 1</div>
      <div className='Name'><span className="material-symbols-outlined">check</span>Page 1</div>
      <div className='Name'><span className="material-symbols-outlined">check</span>Page 1</div>
      </div>

      
      <div className='LayerTitle'>
         <div className='Title'>Layer</div>
      </div>
      
      {reversedData.map((item, index) => {
        if (item.type === "page") {
          return (
            <div key={index}>
              {/* Render nested frames */}
              {(item.elements)?
              <Page id={root} name={item.name} data={item.elements}/>:
              <Page id={root} name={item.name}/>
              }

            </div>
          );
        } else {
          return (
            <div key={index}>
              
              {(item.elements)?
                <Frame id={root+1} name={item.name} data={item.elements}/>:<Frame id={root} name={item.name}/>
              }
            </div>
          );
        }
      })}


    </div>
  );
}

export default Layer;
