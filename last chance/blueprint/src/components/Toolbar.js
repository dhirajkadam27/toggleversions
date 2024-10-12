import {useUtils} from '../modules/Utils';

function Toolbar() {
  const { setTargets,activeTool,setActiveTool} = useUtils();

  const addImage =(e)=>{
    const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
          localStorage.setItem('wallpaper', base64String);
          // document.body.style.background = `url(data:image/png;base64,${base64String})`;
          setActiveTool('Media');
        };
        reader.readAsDataURL(file);
  }
  return (
    <>
      <div className='Toolbar'>
        <button className={activeTool === 'Select' ? 'active' : null}>Select</button>
        <button className={activeTool === 'Element' ? 'active' : null} onClick={() => { setActiveTool('Element'); setTargets([]) }}>Element</button>
        <input type="file" id="file" onChange={addImage} style={{display:"none"}} />
        <button className={activeTool === 'Media' ? 'active' : null} onClick={() => { document.getElementById('file').click(); setTargets([]) }}>Media</button>
        <button className={activeTool === 'Text' ? 'active' : null} onClick={() => { setActiveTool('Text'); setTargets([]) }}>Text</button>
      </div>
    </>
  );
}

export default Toolbar;
