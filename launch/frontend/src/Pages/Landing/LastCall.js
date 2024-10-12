import './LastCall.css';

function LastCall() {


    return (
        <div className="LastCall">
             <div className='circle'>
      </div>

      <div className='lastform'>
        <div className='title'>Start building with Toggle</div>
        <button onClick={()=>window.location.href = '/signup'}>Get started for free</button>
      </div>
        </div>
    );
}

export default LastCall;
