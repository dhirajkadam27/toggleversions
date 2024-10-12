import * as React from 'react';

export default function CustomElements({
  mapCategoryBlocks,
  dragStart,
  dragStop,
}) {
  return (
    <div className="CustomElements">
      {Array.from(mapCategoryBlocks).map(([category, blocks]) => (
        <div key={category}>
          <div className="title">
            {category}
          </div>
          <div className="allelements">
            {blocks.map((block) => (
              <div
                key={block.getId()}
                draggable
                className='element'
                onDragStart={(ev) => dragStart(block, ev.nativeEvent)}
                onDragEnd={() => dragStop(false)}
              >
                <div
                  className="icon"
                  dangerouslySetInnerHTML={{ __html: block.getMedia() }}
                />
                <div
                  className="txt"
                  title={block.getLabel()}
                >
                  {block.getLabel()}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
