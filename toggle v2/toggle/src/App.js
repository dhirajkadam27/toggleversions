import './App.css';
// import Layer from './section/Layer';
import Canvas from './section/Canvas';
// import Property from './section/Property';
import Toolbox from './component/Toolbox';
import usePreventZoom from './tool/useZoomPrevent';

function App() {
  usePreventZoom();
  
  
  return (
    <div className="App">
      {/* <Layer /> */}
      <Canvas />
      {/* <Property /> */}
      <Toolbox />
    </div>
  );
}

export default App;
