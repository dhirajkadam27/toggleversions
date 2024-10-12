import React from 'react';
import './index.css';

function Properties() {
  return (
    <div className='Properties_01'>
      <div className='Flexbox_01'>
        <div className='Left'>
          <div className='Object_name'>Frame 1</div>
        </div>
        <div className='Right'>
        <button><span className="material-symbols-outlined">crop_9_16</span></button>
        <button><span className="material-symbols-outlined">crop_16_9</span></button>
        <button><span className="material-symbols-outlined">zoom_in_map</span></button>
        </div>
      </div>

      <div className='Flexbox_02'>
        <div className='border'>
          <div className='label'>X</div>
          <input type='text'/>
        </div>
        <div className='border'>
          <div className='label'>Y</div>
          <input type='text'/>
        </div>
      </div>
      <div className='Flexbox_02'>
        <div className='border'>
          <div className='label'>W</div>
          <input type='text'/>
        </div>
        <div className='border'>
          <div className='label'>H</div>
          <input type='text'/>
        </div>
        <button><span className="material-symbols-outlined">link</span></button>
      </div>
      <div className='Flexbox_02'>
        <div className='border'>
        <span className="material-symbols-outlined">arrows_more_down</span>
          <input type='text'/>
        </div>
        <div className='border'>
        <span className="material-symbols-outlined">line_curve</span>
          <input type='text'/>
        </div>
        <button><span className="material-symbols-outlined">link</span></button>
      </div>
      
      <div className='Flexbox_02'>
        <div className='border2'>
        <span className="material-symbols-outlined">visibility</span>
        <select>
          <option>Hidden</option>
          <option>Visible</option>
          <option>Scroll</option>
        </select>
        </div>
      </div>


      <div className='borderline'></div>
      <div className='Property_title'>Fill</div>
      <div className='Fill'>
        <div className='Left'>
          <div className='FillColorBox'></div>
          <input className='FillHex' />
          <input className='FillOpacity' />
        </div>
        <div className='Right'>
        <button><span className="material-symbols-outlined">visibility</span></button>
        <button><span className="material-symbols-outlined">remove</span></button>
        </div>
      </div>
      <div className='borderline'></div>
      <div className='Property_title'>Stroke</div>
      <div className='Fill'>
        <div className='Left'>
          <div className='FillColorBox'></div>
          <input className='FillHex' />
          <input className='FillOpacity' />
        </div>
        <div className='Right'>
        <button><span className="material-symbols-outlined">visibility</span></button>
        <button><span className="material-symbols-outlined">remove</span></button>
        </div>
      </div>
      <div className='StrokeBox'>
        <div className='Left'>
          <select>
          <option>Inside</option>
            <option>Center</option> 
          <option>Outside</option>
          </select>
          <div className='strokewidthbox'>
          <span className="material-symbols-outlined">line_weight</span>
          <input />
          </div>
        </div>
        
        <div className='Right'>
        <button><span className="material-symbols-outlined">border_outer</span></button>
        </div>
      </div>

      
      <div className='Flexbox_02'>
        <div className='border'>
        <span className="material-symbols-outlined">border_left</span>
          <input type='text'/>
        </div>
        <div className='border'>
        <span className="material-symbols-outlined">border_top</span>
          <input type='text'/>
        </div>
      </div>
      
      <div className='Flexbox_02'>
        <div className='border'>
        <span className="material-symbols-outlined">border_right</span>
          <input type='text'/>
        </div>
        <div className='border'>
        <span className="material-symbols-outlined">border_bottom</span>
          <input type='text'/>
        </div>
      </div>

      <div className='borderline'></div>

    </div>
  );
}

export default Properties;
