import { useEffect } from "react";
import { useUtils } from '../modules/Utils';

function OnlyDrag() {
  const { targets, SetMoveableTriggers } = useUtils();

  useEffect(() => {
    if (targets.length === 1) {
      const target = targets[0];
      const isPage = target.classList.contains("page");
      
      SetMoveableTriggers({
        draggable: true,
        resizable: !isPage,
        rotatable: !isPage,
        snappable: true,
      });
    } else {
      console.log("Error: Select exactly one target.");
    }
  }, [targets, SetMoveableTriggers]);

  return null;
}

export default OnlyDrag;
