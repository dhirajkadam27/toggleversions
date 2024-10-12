import * as React from 'react';
import { MdOutlineDelete } from "react-icons/md";
import './CustomPage.css';


export default function CustomPage({
  pages,
  selected,
  add,
  select,
  remove,
}) {
  const addNewPage = () => {
    const nextIndex = pages.length + 1;
    add({
      name: `New page ${nextIndex}`,
      component: `<h1>Page content ${nextIndex}</h1>`,
    });
  };

  return (
    <div className="CustomPage">
      <div className="newpagebtn">
        <button type="button" onClick={addNewPage}>
          Add new page
        </button>
      </div>
      {pages.map((page, index) => (
        <div
          key={page.getId()}
          className='pagename'
        >
          <button
            type="button"
            onClick={() => select(page)}
          >
            {page.getName() || 'Untitled page'}
          </button>
          {selected !== page && (
            <button type="button" onClick={() => remove(page)}>
              <MdOutlineDelete />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
