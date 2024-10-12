import { useEffect } from "react";
import { useUtils } from '../modules/Utils';

function Pages() {
  const { pages, setpages } = useUtils();

  useEffect(() => {
    const pagescount = document.querySelectorAll(".page").length;
    for (let i = 0; i < pagescount; i++) {
      if (!pages.some(page => page === document.querySelectorAll(".page")[i].classList[1])) {
        setpages([...pages, document.querySelectorAll(".page")[i].classList[1]]);
      }
    }
  }, [ pages,setpages])

  return null;
}

export default Pages;
