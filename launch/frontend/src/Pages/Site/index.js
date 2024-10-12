import axios from 'axios';
import './index.css';

import React, { useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { IoRocketOutline, IoLayersOutline } from "react-icons/io5";
import { LiaElementor } from "react-icons/lia";
import { LuUndo2, LuRedo2 } from "react-icons/lu";
import { PiDesktopDuotone, PiDeviceTabletSpeakerDuotone, PiDeviceMobileSpeakerDuotone } from "react-icons/pi";
import { SiCloudflarepages } from "react-icons/si";
import { useParams } from 'react-router-dom';

function Site() {
  const { id } = useParams();
  const [changes, setChanges] = useState(1);
  const [site, setSite] = useState([]);

  useEffect(
    () => {
            axios.post('http://localhost:8080/api/v1/auth/site', {
              _id: id
            }).then((result) => {
                if (result.data.message === "found") {
                  console.log(result.data.site[0].name);
                    setSite(result.data.site);
                }
            })
    },
    [id, changes]
);

    return (
        <div className="Site">
         <div className='nav'>
          <div className='navleft'>
            <div className='logo'>Toggle</div>
            <input type='text' defaultValue={site[0] ?site[0].name:""} />
          </div>
          <div className='navcenter'>

                  <button><PiDesktopDuotone /></button>
                  <button><PiDeviceTabletSpeakerDuotone /></button>
                  <button><PiDeviceMobileSpeakerDuotone /></button>
              
          </div>
          <div className='navright'>
            <button><LuUndo2 /></button>
            <button><LuRedo2 /></button>
            <button><FaEye />Preview</button>
            <button><IoRocketOutline />Publish</button>
          </div>
        </div>

        <div className='editor'>
          <div className='modules'>
            <button>
              <LiaElementor />
              <div className='btntxt'>Element</div>
            </button>
            <button>
              <IoLayersOutline />
              <div className='btntxt'>Layer</div>
            </button>
            <button>
              <SiCloudflarepages />
              <div className='btntxt'>Page</div>
            </button>
          </div>


          <div className='modulesslider'>

        
          </div>
          <div className='canvas'>

          </div>
        </div>

      </div>
    );
}

export default Site;
