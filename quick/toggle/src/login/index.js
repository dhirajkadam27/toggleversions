import './index.css';

function LoginPage() {


  return (
    <div className="LoginPage">
      <div className='bg'>
        <img src={'https://static.canva.com/web/images/42153edee14c6bb2affb2bdb5c065004.jpg'} />
      </div>

      <div className='logo'>Toggle</div>

      <div className='box'>
        <div className='title'>Log in or sign up in seconds</div>
        <div className='subtitle'>Use your email or another service to continue with Toggle (it's free)!</div>
        <button><img src='https://www.edigitalagency.com.au/wp-content/uploads/google-logo-icon-PNG-Transparent-Background-letter-G-multiple-colors.png' />Continue with Google</button>
        <button><img src='https://freepnglogo.com/images/all_img/facebook-logo.png' />Continue with Facebook</button>
        <button><img src='https://pnghq.com/wp-content/uploads/pnghq.com-email-icon-png-for-design-4.png'/>Continue with email</button>

        <div className='privacy'>By continuing, you agree to Toggle's Terms of Use. Read our Privacy Policy.</div>
      </div>
    </div>
  );
}

export default LoginPage;
