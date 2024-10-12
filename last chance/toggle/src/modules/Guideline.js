import { useEffect } from "react";
import { useUtils } from '../modules/Utils';

function Guideline() {
  const { elementGuidelines ,layer} = useUtils();

  useEffect(() => {

    for (let i = 0; i < layer.length; i++) {
      if(document.querySelector(`.${layer[i].name}`) && document.querySelector(`.${layer[i].name}`).classList[0]==="page"){
        elementGuidelines.push({
          element: `.${layer[i].name}`,
          className: "green",
        });
      }else if(document.querySelector(`.${layer[i].name}`) && document.querySelector(`.${layer[i].name}`).classList[0]==="page"){
        elementGuidelines.push({
          element: `.${layer[i].name}`,
          className: "red",
        });
      }else if(document.querySelector(`.${layer[i].name}`) && document.querySelector(`.${layer[i].name}`).classList[0]==="target"){
        elementGuidelines.push({
          element: `.${layer[i].name}`,
          className: "red",
        });
      }else if(document.querySelector(`.${layer[i].name}`) && document.querySelector(`.${layer[i].name}`).classList[0]==="text"){
        elementGuidelines.push({
          element: `.${layer[i].name}`,
          className: "red",
        });
      }else if(document.querySelector(`.${layer[i].name}`) && document.querySelector(`.${layer[i].name}`).classList[0]==="img"){
        elementGuidelines.push({
          element: `.${layer[i].name}`,
          className: "red",
        });
      }else{
        
      }
    }


  }, [elementGuidelines,layer])



  return null;
}

export default Guideline;
