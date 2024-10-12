import InfiniteView from './components/InfiniteView';
import './App.css';
import Layer from './components/Layer';
import Properties from './components/Properties';
import Toolbar from './components/Toolbar';
import Ruler from './modules/Ruler';
import OnlyDrag from './modules/OnlyDrag';
import SelectElement from './modules/SelectElement';
import Guideline from './modules/Guideline';
import DrawElement from './modules/DrawElement';
import Pages from './modules/Pages';
import Layers from './modules/Layers';
import Selector from './components/Selector';

function App() {

  Ruler();
  OnlyDrag();
  SelectElement();
  Guideline();
  DrawElement();
  Pages();
  Layers();
  return (
    <>
      <Ruler />
      <Layer />
      <Properties />
      <Toolbar />
      <Selector />
      <InfiniteView />
    </>
  );
}

export default App;
