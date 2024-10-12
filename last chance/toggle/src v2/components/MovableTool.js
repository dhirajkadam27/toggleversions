import Moveable from "react-moveable";
import { useUtils } from "../modules/Utils";


function MovableTool() {
    const { targets,moveable,moveableTriggers,selectoRef,elementGuidelines} = useUtils();

    return (
        <>
            <Moveable
                ref={moveable}
                scrollable={true}
                // scrollOptions={scrollOptions}
                target={targets}
                // checkInput={true}
                // dragFocusedInput={true}
                draggable={moveableTriggers.draggable}
                resizable={moveableTriggers.resizable}
                rotatable={moveableTriggers.rotatable}
                snappable={moveableTriggers.snappable}
                snapRotataionThreshold={5}
                snapRotationDegrees={[0, 90, 180, 270]}
                snapDirections={{
                    top: true,
                    left: true,
                    bottom: true,
                    right: true,
                    center: true,
                    middle: true,
                }}
                elementSnapDirections={{
                    top: true,
                    left: true,
                    bottom: true,
                    right: true,
                    center: true,
                    middle: true,
                }}
                maxSnapElementGuidelineDistance={700}
                // verticalGuidelines={[0,pageWidth/2,pageWidth]}
                // horizontalGuidelines={[0,pageWidth/2,pageWidth]}
                elementGuidelines={elementGuidelines}
                onRender={e => {
                    e.target.style.cssText += e.cssText;
                }}


                onResize={e=>{
                    console.log("re",e.cssText);
                }}



                onClickGroup={e => {
                    selectoRef.current.clickTarget(e.inputEvent, e.inputTarget);
                }}
                onRenderGroup={e => {
                    e.events.forEach(ev => {
                        ev.target.style.cssText += ev.cssText;
                    });
                }}

           
                
            />


        </>
    );
}

export default MovableTool;
