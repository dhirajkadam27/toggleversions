import { useEffect } from "react";
import { useUtils } from '../modules/Utils';

function SelectElement() {
  const { targets, setTargets, element } = useUtils();

  useEffect(() => {
    const handleClick = (event) => {
      const targetElement = event.target;

      if (element.backelement === null) {
        if (targetElement.classList.contains('page') || targetElement.classList.contains('target')) {
          setTargets([targetElement]);
        } 
      }

      if (targetElement.classList.contains('text')) {
        if (targets[0]) {
          targetElement.focus();
        }
        setTargets([targetElement]);
      }

      if (targetElement.classList.contains('img')) {
        setTargets([targetElement]);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [targets, setTargets, element]);

  return null;
}

export default SelectElement;
