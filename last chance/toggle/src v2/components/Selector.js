import { useUtils } from "../modules/Utils";
import Selecto from "react-selecto";

function Selector() {
    const { selectoRef, targets,moveable,setTargets } = useUtils();

    return (
        <>

            <Selecto
                ref={selectoRef}
                dragContainer={".infinite-viewer"}
                selectableTargets={[".viewport .target", ".viewport .img", ".viewport .text"]}
                hitRate={0}
                selectByClick={false}
                selectFromInside={true}
                toggleContinueSelect={["shift"]}
                ratio={0}
                keyContainer={window}
                onDragStart={(e) => {
                    const target = e.inputEvent.target;
                    if (
                        moveable.current.isMoveableElement(target)
                        || targets.some(t => t === target || t.contains(target))
                    ) {
                        e.stop();
                    }
                }}
                onSelectEnd={e => {
                    if (e.isDragStartEnd) {
                        e.inputEvent.preventDefault();
                        moveable.current.waitToChangeTarget().then(() => {
                            moveable.current.dragStart(e.inputEvent);
                        });
                    }

                    setTargets(e.selected);

                }}

            ></Selecto>


        </>
    );
}

export default Selector;
