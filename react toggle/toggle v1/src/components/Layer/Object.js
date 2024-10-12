import './Object.css';

function LayerObject({data}) {

  return (
    <div className="LayerObject">
      {data.root === 0 ? (
        <span
          style={{ marginLeft: (data.root * 15) + 'px' }}
          className="material-symbols-outlined"
        >
          rectangle
        </span>
      ) : (
        <span
          style={{ marginLeft: (data.root * 15) + 22 + 'px' }}
          className="material-symbols-outlined"
        >
          rectangle
        </span>
      )}
      <div className="ObjectName">{data.object}</div>
    </div>
  );
}

export default LayerObject;
