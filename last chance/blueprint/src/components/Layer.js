import {useUtils} from '../modules/Utils';

function Layer() {
    const { setTargets,pages,layer } = useUtils();

    const CreateNewPage = () => {
        let width = 0;
        let i = 0;
        const length = document.querySelectorAll('.page').length;
        while (i < length) {
          if (document.querySelectorAll('.page')[i].clientWidth + document.querySelectorAll('.page')[i].offsetLeft > width) {
            width = document.querySelectorAll('.page')[i].clientWidth + document.querySelectorAll('.page')[i].offsetLeft;
          }
          i++;
        }
    
    
    
        const length1 = document.querySelectorAll('.target').length;
        i = 0;
        while (i < length1) {
          if (document.querySelectorAll('.target')[i].clientWidth + document.querySelectorAll('.target')[i].offsetLeft > width) {
            width = document.querySelectorAll('.target')[i].clientWidth + document.querySelectorAll('.target')[i].offsetLeft;
          }
          i++;
        }

        const length2 = document.querySelectorAll('.img').length;
        i = 0;
        while (i < length2) {
          if (document.querySelectorAll('.img')[i].clientWidth + document.querySelectorAll('.img')[i].offsetLeft > width) {
            width = document.querySelectorAll('.img')[i].clientWidth + document.querySelectorAll('.img')[i].offsetLeft;
          }
          i++;
        }

        const length3 = document.querySelectorAll('.text').length;
        i = 0;
        while (i < length3) {
          if (document.querySelectorAll('.text')[i].clientWidth + document.querySelectorAll('.text')[i].offsetLeft > width) {
            width = document.querySelectorAll('.text')[i].clientWidth + document.querySelectorAll('.text')[i].offsetLeft;
          }
          i++;
        }

        var div = document.createElement('div');
        div.setAttribute('class', 'page page' + length);
        div.style.cssText = "width: 300px;height: 500px;border: 1px solid black;position: absolute;top: 0;left: " + (width + 100) + "px;background:white";
        document.getElementsByClassName('viewport')[0].appendChild(div);
      }
    


    return (
        <>
            <div className='layer'>
                <div className='pagenav'>
                    <div className='pagetitle'>Pages</div>
                    <button onClick={() => { CreateNewPage(); setTargets([]) }}>+</button>
                </div>

                <div className='pagelist'>
                    {pages.map((page, index) => <div key={index} onClick={() => { setTargets(document.getElementsByClassName(page)[0]) }} className='pagename'>{page}</div>)}
                </div>

                <div className='pagenav'>
                    <div className='pagetitle'>Layer</div>
                </div>

                <div className='pagelist'>
                    {layer.map((element, index) => <div key={index} onClick={() => { setTargets(document.getElementsByClassName(element.name)[0]) }} style={{ "paddingLeft": element.padding * 10 + "px" }} className='pagename'>{element.name}</div>)}

                </div>

            </div>
        </>
    );
}

export default Layer;
