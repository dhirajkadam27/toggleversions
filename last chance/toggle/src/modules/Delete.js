import React, { useEffect } from 'react';
import { useUtils } from './Utils';

function Delete() {
  const {targets,setTargets} = useUtils();
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete') {
        console.log('Delete key pressed!');
        console.log("Asa",targets);
        for(let i=0;i<targets.length;i++){
          targets[i].remove();
        }
        setTargets([]);
        // Perform your delete action here
      }
    };

    // Add event listener to the document
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [targets]);

  return null;
}

export default Delete;
