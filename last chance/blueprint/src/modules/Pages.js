import { useEffect } from "react";
import { useUtils } from '../modules/Utils';

function Pages() {
  const { pages, setpages, targets } = useUtils();

  useEffect(() => {
    const pageElements = Array.from(document.querySelectorAll(".page"));
    const newPages = pageElements
      .map(el => el.classList[1])
      .filter(className => !pages.includes(className));

    if (newPages.length > 0) {
      setpages(prevPages => [...prevPages, ...newPages]);
    }
  }, [targets, pages, setpages]);

  return null;
}

export default Pages;
