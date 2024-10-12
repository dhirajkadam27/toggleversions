import { useUtils } from '../modules/Utils';

function Properties() {
    const { targets, moveable } = useUtils();


    return (
        <>
            <div className='properties'>



                {targets.length === 1 && targets[0].style.position ? <><label>position</label>
                    <select onChange={(e) => {
                        moveable.current.request("draggable", {
                            deltaX: -49,
                            deltaY: 0,
                            useSnap: true,
                        }, true);

                    }} className='propertiestags' defaultValue={targets[0].style.position}>
                        <option value="absolute">absolute</option>
                        <option value="fixed">fixed</option>
                        <option value="sticky">sticky</option>
                        <option value="relative">relative</option>
                    </select></> : null}

                {targets.length === 1 && targets[0].style.top ? <><br />
                    <label>top</label>
                    <input className='propertiestags' defaultValue={parseInt(targets[0].style.top, 10)} onChange={(e) => {
                        moveable.current.request("draggable", {
                            y: parseInt(e.target.value),
                        }, true);
                    }} type='number' /></> : null}

                {targets.length === 1 && targets[0].style.left ? <><br />
                    <label>left</label>
                    <input className='propertiestags' defaultValue={parseInt(targets[0].style.left, 10)} onChange={(e) => {
                        moveable.current.request("draggable", {
                            x: parseInt(e.target.value),
                        }, true);
                    }} type='number' /></> : null}

                {targets.length === 1 && targets[0].style.width ? <><br />
                    <label>width</label>
                    <input className='propertiestags' defaultValue={parseInt(targets[0].style.width, 10)} onChange={(e) => {
                        moveable.current.request("resizable", {
                            offsetWidth: parseInt(e.target.value),
                        }, true);
                    }} type='number' /></> : null}


                {targets.length === 1 && targets[0].style.height ? <><br />
                    <label>height</label>
                    <input className='propertiestags' defaultValue={parseInt(targets[0].style.height, 10)} onChange={(e) => {
                        moveable.current.request("resizable", {
                            offsetHeight: parseInt(e.target.value),
                        }, true);
                    }} type='number' /></> : null}

                {targets.length === 1 && targets[0].style.background ? <><br />
                    <label>background</label>
                    <input className='propertiestags' defaultValue={targets[0].style.background} onChange={(e) => { targets[0].style.background = e.target.value }} type='color' /></> : null}

                {targets.length === 1 && targets[0].src ? <><br />
                    <label>background</label>
                    <input className='propertiestags' defaultValue={targets[0].src} onChange={(e) => { targets[0].src = e.target.value }} type='text' /></> : null}



                {targets.length === 1 && targets[0].style.border ? <><br />
                    <label>border</label>
                    <input className='propertiestags' defaultValue={parseInt(targets[0].style.borderWidth, 10)} onChange={(e) => {
                        targets[0].style.borderWidth = e.target.value + "px";
                        moveable.current.request("resizable", {
                        }, true);
                    }} type='number' />
                    <select className='propertiestags' defaultValue={targets[0].style.borderStyle} onChange={(e) => {
                        moveable.current.request("resizable", {
                        }, true);
                    }}>
                        <option value="solid">solid</option>
                        <option value="dashed">dashed</option>
                    </select>
                    <input className='propertiestags' defaultValue={targets[0].style.borderColor} onChange={(e) => {
                        targets[0].style.borderColor = e.target.value;
                        moveable.current.request("resizable", {
                        }, true);
                    }} type='text' /></> : null}



                {targets.length === 1 && targets[0].style.top ? <><br />
                    <button onClick={() => {
                        console.log(targets[0].parentElement.firstChild)
                        targets[0].parentElement.appendChild(targets[0]);
                        moveable.current.request("resizable", {
                        }, true);
                    }}>front</button>
                    <button onClick={() => {
                        console.log(targets[0].parentElement.firstChild)
                        targets[0].parentElement.insertBefore(targets[0], targets[0].parentElement.firstChild);
                        moveable.current.request("resizable", {
                        }, true);
                    }}>back</button>
                </> : null}


                <button onClick={() => {
                    const rect = moveable.current.getRect();
                    const moveables = moveable.current.getMoveables();

                    if (moveables.length <= 1) {
                        return;
                    }
                    moveables.forEach(child => {
                        child.request("draggable", {
                            y: rect.top,
                        }, true);
                    });

                    moveable.current?.updateRect();
                }}>Align Top</button>&nbsp;
                <button onClick={() => {
                    const rect = moveable.current.getRect();
                    const moveables = moveable.current.getMoveables();

                    if (moveables.length <= 1) {
                        return;
                    }
                    moveables.forEach(child => {
                        child.request("draggable", {
                            y: rect.top + rect.height,
                        }, true);
                    });

                    moveable.current?.updateRect();
                }}>Align Bottom</button>&nbsp;
                <button onClick={() => {
                    const rect = moveable.current.getRect();
                    const moveables = moveable.current.getMoveables();

                    if (moveables.length <= 1) {
                        return;
                    }
                    moveables.forEach(child => {
                        child.request("draggable", {
                            x: rect.left,
                        }, true);
                    });

                    moveable.current?.updateRect();
                }}>Align Left</button>&nbsp;
                <button onClick={() => {
                    const rect = moveable.current.getRect();
                    const moveables = moveable.current.getMoveables();

                    if (moveables.length <= 1) {
                        return;
                    }
                    moveables.forEach(child => {
                        child.request("draggable", {
                            y: rect.left + rect.width,
                        }, true);
                    });

                    moveable.current?.updateRect();
                }}>Align Right</button>&nbsp;
                <button onClick={() => {
                    const rect = moveable.current.getRect();
                    const moveables = moveable.current.getMoveables();

                    if (moveables.length <= 1) {
                        return;
                    }
                    moveables.forEach((child, i) => {
                        child.request("draggable", {
                            y: rect.top + rect.height / 2 - rect.children[i].height / 2,
                        }, true);
                    });

                    moveable.current?.updateRect();
                }}>Align Vertical Center</button>&nbsp;
                <button onClick={() => {
                    const rect = moveable.current.getRect();
                    const moveables = moveable.current.getMoveables();

                    if (moveables.length <= 1) {
                        return;
                    }
                    moveables.forEach((child, i) => {
                        child.request("draggable", {
                            x: rect.left + rect.width / 2 - rect.children[i].width / 2,
                        }, true);
                    });

                    moveable.current?.updateRect();
                }}>Align Horizontal Center</button>&nbsp;
                <button onClick={() => {
                    const groupRect = moveable.current.getRect();
                    const moveables = moveable.current.getMoveables();
                    let top = groupRect.top;

                    if (moveables.length <= 1) {
                        return;
                    }
                    const gap = (groupRect.height - groupRect.children.reduce((prev, cur) => {
                        return prev + cur.height;
                    }, 0)) / (moveables.length - 1);

                    moveables.sort((a, b) => {
                        return a.state.top - b.state.top;
                    });
                    moveables.forEach(child => {
                        const rect = child.getRect();

                        child.request("draggable", {
                            y: top,
                        }, true);

                        top += rect.height + gap;
                    });


                    moveable.current?.updateRect();
                }}>Arrange Vertical Spacing</button>&nbsp;
                <button onClick={() => {
                    const groupRect = moveable.current.getRect();
                    const moveables = moveable.current.getMoveables();
                    let left = groupRect.left;

                    if (moveables.length <= 1) {
                        return;
                    }
                    const gap = (groupRect.width - groupRect.children.reduce((prev, cur) => {
                        return prev + cur.width;
                    }, 0)) / (moveables.length - 1);

                    moveables.sort((a, b) => {
                        return a.state.left - b.state.left;
                    });
                    moveables.forEach(child => {
                        const rect = child.getRect();

                        child.request("draggable", {
                            x: left,
                        }, true);

                        left += rect.width + gap;
                    });

                    moveable.current?.updateRect();
                }}>Arrange Horizontal Spacing</button>&nbsp;


                <button onClick={() => {
                    targets[0].style.display = "unset";
                    targets[0].style.flexWrap = "unset";

                    const targetDivs = targets[0].querySelectorAll("div");
                    targetDivs.forEach(div => {
                        div.style.position = ""; // or any valid CSS position value
                        div.style.transform = ""; // or any valid CSS position value
                    });

                    moveable.current.request("resizable", {
                    }, true);
                }}>none</button>

                <button onClick={() => {
                    targets[0].style.display = "block";

                    const targetDivs = targets[0].querySelectorAll("div");
                    targetDivs.forEach(div => {
                        div.style.position = "unset !important"; // or any valid CSS position value
                        div.style.transform = "unset !important"; // or any valid CSS position value
                    });

                    moveable.current.request("resizable", {
                    }, true);
                }}>Vertical</button>
                <button onClick={() => {
                    targets[0].style.display = "flex";
                    targets[0].style.flexWrap = "unset";

                    const targetDivs = targets[0].querySelectorAll("div");
                    targetDivs.forEach(div => {
                        div.style.position = "unset !important"; // or any valid CSS position value
                        div.style.transform = "unset !important"; // or any valid CSS position value
                    });

                    moveable.current.request("resizable", {
                    }, true);
                }}>Horizontal</button>
                <button onClick={() => {
                    targets[0].style.display = "flex";
                    targets[0].style.flexWrap = "wrap";

                    const targetDivs = targets[0].querySelectorAll("div");
                    targetDivs.forEach(div => {
                        div.style.position = "unset !important"; // or any valid CSS position value
                        div.style.transform = "unset !important"; // or any valid CSS position value
                    });

                    moveable.current.request("resizable", {
                    }, true);
                }}>wrap</button>


                <label>Font</label>

                <input onChange={(e) => {
                    targets[0].style.fontSize =  e.target.value + "px";
                    moveable.current.request("resizable", {
                    }, true);
                }} className='propertiestags' type='number' />
                <select onChange={(e) => {
                    targets[0].style.fontFamily =  e.target.value;
                    moveable.current.request("resizable", {
                    }, true);
                }} className='propertiestags'>
                    <option value='"Roboto", sans-serif'>Roboto</option>
                    <option value='"Open Sans", sans-serif'>Open Sans</option>
                    <option value='"Montserrat", sans-serif'>Montserrat</option>
                    <option value='"Lato", sans-serif'>Lato</option>
                    <option value='"Noto Sans", sans-serif'>Noto Sans</option>
                </select>

                <select onChange={(e) => {
                    targets[0].style.fontWeight =  e.target.value;
                    moveable.current.request("resizable", {
                    }, true);
                }} className='propertiestags'>
                    <option>100</option>
                    <option>200</option>
                    <option>300</option>
                    <option>400</option>
                    <option>500</option>
                    <option>600</option>
                    <option>700</option>
                    <option>800</option>
                    <option>900</option>
                </select>

            </div>

        </>
    );
}

export default Properties;
