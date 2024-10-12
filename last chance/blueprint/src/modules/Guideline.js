import { useEffect } from "react";
import { useUtils } from '../modules/Utils';

function Guideline() {
  const { elementGuidelines } = useUtils();

  // useEffect(() => {
  //   for (let i = 0; i < document.querySelector('.viewport').childElementCount; i++) {
  //     if (document.querySelector('.viewport').childNodes[i].classList[0] === "page") {
  //       elementGuidelines.push({
  //         element: `.${document.querySelector('.viewport').childNodes[i].classList[1]}`,
  //         className: "green",
  //       });
  //     }

  //     if (document.querySelector('.viewport').childNodes[i].classList[0] === "target") {
  //       elementGuidelines.push({
  //         element: `.${document.querySelector('.viewport').childNodes[i].classList[1]}`,
  //         className: "red",
  //       });
  //     }

  //     if (document.querySelector('.viewport').childNodes[i].classList[0] === "text") {
  //       elementGuidelines.push({
  //         element: `.${document.querySelector('.viewport').childNodes[i].classList[1]}`,
  //         className: "red",
  //       });
  //     }

  //     if (document.querySelector('.viewport').childNodes[i].classList[0] === "img") {
  //       elementGuidelines.push({
  //         element: `.${document.querySelector('.viewport').childNodes[i].classList[1]}`,
  //         className: "red",
  //       });
  //     }

  //   }
  // }, [elementGuidelines])


  const { pages, targets, setLayer } = useUtils();

  useEffect(() => {
    const viewport = document.querySelector(".viewport");
    if (!viewport) return;


    function clearArray(array) {
      while (array.length > 0) {
        array.pop();
      }
    }

    clearArray(elementGuidelines);

    let z = 1;

    const processNode = (node, z) => {
      const childNodes = Array.from(node.children);
      childNodes.forEach((child,i) => {
        if (["page"].includes(child.classList[0])) {
          elementGuidelines.push({
                    element: `.${document.querySelector('.viewport').childNodes[i].classList[1]}`,
                    className: "green",
                  });
          if (child.children.length > 0) {
            processNode(child, z + 1);
          }
        }

        
        if (["target", "img", "text"].includes(child.classList[0])) {
          elementGuidelines.push({
                    element: `.${document.querySelector('.viewport').childNodes[i].classList[1]}`,
                    className: "red",
                  });
          if (child.children.length > 0) {
            processNode(child, z + 1);
          }
        }
      });
    };

    // Start processing from the root level
    processNode(viewport, z);

  

  }, [elementGuidelines,pages, targets, setLayer]);


  return null;
}

export default Guideline;
