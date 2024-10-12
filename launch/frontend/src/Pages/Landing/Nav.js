import './Nav.css';

function Nav() {


    return (
        <div className="Nav">
            <div className='Logo'>Toggle</div>
            <div className='Btns'>
                <button>Pricing</button>
                <button onClick={()=>window.location.href = '/signup'}>Login</button>
            </div>
        </div>
    );
}

export default Nav;
