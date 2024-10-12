import * as React from 'react';
import { useEditor } from '@grapesjs/react';
import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { MAIN_BORDER_COLOR, cx } from './common';

import { FaRegEye,FaRegEyeSlash,FaCaretRight } from "react-icons/fa6";
import './Layeritem.css';

export default function LayerItem({
  component,
  draggingCmp,
  dragParent,
  ...props
}) {
  const editor = useEditor();
  const { Layers } = editor;
  const layerRef = useRef(null);
  const [layerData, setLayerData] = useState(Layers.getLayerData(component));
  const { open, selected, hovered, components, visible, name } = layerData;
  const componentsIds = components.map((cmp) => cmp.getId());
  const isDragging = draggingCmp === component;
  const cmpHash = componentsIds.join('-');
  const level = props.level + 1;
  const isHovered = hovered || dragParent === component;

  useEffect(() => {
    level === 0 && setLayerData(Layers.getLayerData(component));
    if (layerRef.current) {
      layerRef.current.__cmp = component;
    }
  }, [component]);

  useEffect(() => {
    const up = (cmp) => {
      cmp === component && setLayerData(Layers.getLayerData(cmp));
    };
    const ev = Layers.events.component;
    editor.on(ev, up);

    return () => {
      editor.off(ev, up);
    };
  }, [editor, Layers, component]);

  const cmpToRender = useMemo(() => {
    return components.map((cmp) => (
      <LayerItem
        key={cmp.getId()}
        component={cmp}
        level={level}
        draggingCmp={draggingCmp}
        dragParent={dragParent}
      />
    ));
  }, [cmpHash, draggingCmp, dragParent]);

  const toggleOpen = (ev) => {
    ev.stopPropagation();
    Layers.setLayerData(component, { open: !open });
  };

  const toggleVisibility = (ev) => {
    ev.stopPropagation();
    Layers.setLayerData(component, { visible: !visible });
  };

  const select = (event) => {
    event.stopPropagation();
    Layers.setLayerData(component, { selected: true }, { event });
  };

  const hover = (hovered) => {
    if (!hovered || !draggingCmp) {
      Layers.setLayerData(component, { hovered });
    }
  };

  const wrapperCls = cx(
    'LayerItem',
    selected && 'highlightfullelement',
    (!visible || isDragging) && 'opacity-50'
  );

  return (
    <div className={wrapperCls}>
      <div
        onClick={select}
        onMouseEnter={() => hover(true)}
        onMouseLeave={() => hover(false)}
        className="layer"
        data-layer-item
        ref={layerRef}
      >
        <div
          className={cx(
            'innerlayer',
            level === 0 && 'border-t',
            MAIN_BORDER_COLOR,
            isHovered && 'highlighthover',
            selected && 'highlightelement'
          )}
        >
          <div
            style={{ marginLeft: `${level * 10}px` }}
            className={cx(
              'cursor-pointer',
              !components.length && 'pointer-events-none opacity-0'
            )}
            onClick={toggleOpen}
          >
            <FaCaretRight style={{'transform':`rotate(${open ? 90 : 0}deg)`}} rotate={open ? 0 : -90}/>
            {/* <Icon path={mdiMenuDown} size={0.7} rotate={open ? 0 : -90} /> */}
          </div>
          <div className="truncate flex-grow" style={{ maxWidth: '100%' }}>
            {name}
          </div>
          <div
            className={cx(
              'group-hover:opacity-100 cursor-pointer',
              visible ? 'opacity-0' : 'opacity-100'
            )}
            onClick={toggleVisibility}
          >
           {visible ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        </div>
      </div>
      {!!(open && components.length) && (
        <div className={cx('max-w-full', !open && 'hidden')}>
          {cmpToRender}
        </div>
      )}
    </div>
  );
}
