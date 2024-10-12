import { useEffect } from "react";
import { useUtils } from '../modules/Utils';

function Layers() {
  const { pages, targets, setLayer } = useUtils();

  useEffect(() => {
    const viewport = document.querySelector(".viewport");
    if (!viewport) return;

    const newLayer = [];
    let z = 1;

    const processNode = (node, z) => {
      const childNodes = Array.from(node.children);
      childNodes.forEach(child => {
        if (["page", "target", "img", "text"].includes(child.classList[0])) {
          newLayer.push({ name: child.classList[1], padding: z });
          if (child.children.length > 0) {
            processNode(child, z + 1);
          }
        }
      });
    };

    // Start processing from the root level
    processNode(viewport, z);

    // Update layer state
    setLayer(newLayer);

    // Optional: Check target styles (if needed)
    if (targets[0]) {
      console.log("Target position:", targets[0].style.position);
    }

  }, [pages, targets, setLayer]);

  return null;
}

export default Layers;
