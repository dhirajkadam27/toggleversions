
import ScreenShot from '../../image/screenshot.png';
import './index.css';
import { useToggle } from '../../config';
import { useState,useEffect } from 'react';

const words = ["creative", "great"];

function Main() {
  const {setLangingPopup} = useToggle();
  const [displayedText, setDisplayedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingSpeed = 200;

    if (isDeleting) {
      typingSpeed /= 2;
    }

    const handleTyping = () => {
      const fullText = words[currentWordIndex];
      const updatedText = isDeleting
        ? fullText.substring(0, displayedText.length - 1)
        : fullText.substring(0, displayedText.length + 1);

      setDisplayedText(updatedText);

      if (!isDeleting && updatedText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWordIndex]);

  return (
 
      <div className='main'>
        <div className='tagline'>
          Build Something <span>{displayedText}<span className="cursor">|</span></span>
        </div>
        <div className='subline'>
          just draw, design ,align ,connect and build
        </div>
        <button onClick={()=>{setLangingPopup({status:true,type:"Start"})}}>Get started</button>
        <img src={ScreenShot} alt='Toggle ScreenShot' />
      </div>

  );
}

export default Main;
