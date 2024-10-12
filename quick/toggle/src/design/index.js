import './index.css';
import { FaEye } from "react-icons/fa";
import { IoRocketOutline, IoLayersOutline } from "react-icons/io5";
import { LiaElementor } from "react-icons/lia";
import { LuUndo2, LuRedo2 } from "react-icons/lu";
import { PiDesktopDuotone, PiDeviceTabletSpeakerDuotone, PiDeviceMobileSpeakerDuotone } from "react-icons/pi";
import { SiCloudflarepages } from "react-icons/si";
import GjsEditor, {
  Canvas,
  BlocksProvider,
  LayersProvider,
  PagesProvider,
  DevicesProvider,
  SelectorsProvider,
  StylesProvider
} from '@grapesjs/react';


import CustomElements from './modules/CustomElements';
import CustomLayer from './modules/CustomLayer';
import CustomPage from './modules/CustomPage';
import { useState } from 'react';
import CustomSelector from './modules/CustomSelector';
import CustomStyle from './modules/CustomStyle';

const gjsOptions = {
  height: '100vh',
  storageManager: false,
  undoManager: { trackSelection: false },
  selectorManager: { componentFirst: true },
  projectData: {
    assets: [
      'https://via.placeholder.com/350x250/78c5d6/fff',
      'https://via.placeholder.com/350x250/459ba8/fff',
      'https://via.placeholder.com/350x250/79c267/fff',
      'https://via.placeholder.com/350x250/c5d647/fff',
      'https://via.placeholder.com/350x250/f28c33/fff',
    ],
    pages: [
      {
        name: 'Home page',
        component: `<h1>GrapesJS React Custom UI</h1>`,
      },
    ],
  },
};

function DesignPage() {


  const onEditor = (editor) => {
    console.log('Editor loaded');

    // Store editor globally
    window.editor = editor;

  };


  const commands = (cmd) => {
    if (window.editor) {
      const { Commands } = window.editor;

      // Use Commands here, e.g., to execute a specific command

      if (Commands.isActive('core:' + cmd)) {
        Commands.stop('core:' + cmd)
        if (cmd === "preview") {
          const canvasElement = document.querySelector('.canvas');
          canvasElement.style.position = 'unset';
          canvasElement.style.top = '0';
          canvasElement.style.left = '0';
          canvasElement.style.width = 'calc(100% - 90px)';
          canvasElement.style.height = 'calc(100vh - 60px)';
        }
      } else {
        Commands.run('core:' + cmd, {})
        const canvasElement = document.querySelector('.canvas');
        canvasElement.style.position = 'fixed';
        canvasElement.style.top = '60px';
        canvasElement.style.left = '0';
        canvasElement.style.width = '100%';
        canvasElement.style.height = 'calc(100vh - 60px)';
      }
    } else {
      console.error('Editor is not initialized yet');
    }
  };


  function myPlugin(editor) {
    // Use the API: https://grapesjs.com/docs/api/
    editor.Blocks.add('my-first-block', {
      label: 'Simple block',
      media: "<img src='https://i.pinimg.com/736x/bd/51/0c/bd510c9c46e3c3a1388776dfb11f5ed9.jpg' />",
      category: 'Radix',
      content: '<div style="color:red" class="my-block">This is a simple block</div>',
    });
  }

  const [module, setModule] = useState('');


  return (
    <GjsEditor
      className="gjs-custom-editor text-white bg-slate-900"
      grapesjs="https://unpkg.com/grapesjs"
      grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
      options={gjsOptions}
      plugins={[
        {
          id: 'gjs-blocks-basic',
          src: 'https://unpkg.com/grapesjs-blocks-basic',
        }, myPlugin
      ]}
      onEditor={onEditor}
    >
      <div className="DesignPage">
        <div className='nav'>
          <div className='navleft'>
            <div className='logo'>Toggle</div>
            <input type='text' value={'project name'} />
          </div>
          <div className='navcenter'>

            <DevicesProvider>
              {({ select }) => (
                <>
                  <button onClick={() => select('desktop')}><PiDesktopDuotone /></button>
                  <button onClick={() => select('tablet')}><PiDeviceTabletSpeakerDuotone /></button>
                  <button onClick={() => select('mobilePortrait')}><PiDeviceMobileSpeakerDuotone /></button>
                </>
              )}
            </DevicesProvider>

          </div>
          <div className='navright'>
            <button onClick={() => commands('undo')}><LuUndo2 /></button>
            <button onClick={() => commands('redo')}><LuRedo2 /></button>
            <button onClick={() => commands('preview')}><FaEye />Preview</button>
            <button><IoRocketOutline />Publish</button>
          </div>
        </div>

        <div className='editor'>
          <div className='modules'>
            <button onClick={() => {
              if (module === 'element') {
                setModule('');
              } else {
                setModule('element');
              }
            }}>
              <LiaElementor />
              <div className='btntxt'>Element</div>
            </button>
            <button onClick={() => {
              if (module === 'layer') {
                setModule('');
              } else {
                setModule('layer');
              }
            }}>
              <IoLayersOutline />
              <div className='btntxt'>Layer</div>
            </button>
            <button onClick={() => {
              if (module === 'page') {
                setModule('');
              } else {
                setModule('page');
              }
            }}>
              <SiCloudflarepages />
              <div className='btntxt'>Page</div>
            </button>
          </div>


          <div className='modulesslider'>

            {
              module === "element" ?


                <>

                  <SelectorsProvider>
                    {(props) => (
                      props.targets.length !== 0 ? <CustomSelector {...props} /> : null
                    )}
                  </SelectorsProvider>
                  <StylesProvider>


                    {(props) => (
                      props.sectors.length !== 0 ? <CustomStyle {...props} /> : null
                    )}
                  </StylesProvider>
                </> : null
            }


            {
              module === "element" ? <BlocksProvider>
                {(props) => <CustomElements {...props} />}
              </BlocksProvider> : null
            }


            {
              module === "layer" ? <LayersProvider>
                {(props) => <CustomLayer {...props} />}
              </LayersProvider> : null
            }

            {
              module === "page" ? <PagesProvider>
                {(props) => <CustomPage {...props} />}
              </PagesProvider> : null
            }
          </div>
          <div className='canvas'>


            <Canvas className="flex-grow gjs-custom-editor-canvas" />
          </div>
        </div>

      </div>
    </GjsEditor>
  );
}

export default DesignPage;
