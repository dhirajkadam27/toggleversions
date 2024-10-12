import './Name.css';
import Nav from './Nav';

function Name() {


    return (
        <div className="Name">
            <Nav />
            <div className='title'>Log in or sign up in <span>seconds!</span></div>
            <div className='subtitle'>Use your email or another service to continue with Toggle (it's free)!</div>
            <input type='email' disabled value="dhirajkadam.official@gmail.com"/>
            <input type='name' placeholder='Your name' />
            <button onClick={()=>window.location.href = '/sites'}>Next</button>

            <div className='privacy'>By continuing, you agree to Toggle's Terms of Use. Read our Privacy Policy.</div>
        </div>
    );
}

export default Name;
