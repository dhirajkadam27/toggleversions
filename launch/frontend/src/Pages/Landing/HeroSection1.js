import './HeroSection.css';

function HeroSection1() {


    return (
        <div className="HeroSection1">
            <div className='MainLine'>Create a website<br/>in just a <span>second!</span></div>
            <div className='SubLine'>Launch your website just for ₹70/month</div>
            <button onClick={()=>window.location.href = '/signup'}>Create your Website</button>
        </div>
    );
}

export default HeroSection1;
