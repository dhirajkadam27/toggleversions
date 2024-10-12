import './index.css';
import Nav from './Nav';
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";

function LandingPage() {


  return (
    <div className="LandingPage">
      <Nav />

      <div className='HeroSection'>
        <div className='Title'>Build Your <span>Website</span></div>
        <div className='Subtitle'>Create a professional website without any coding knowledge</div>
        <button>Start designing</button>
        <video autoPlay muted loop>
          <source
            src="https://videos.ctfassets.net/xny2w179f4ki/3J2f3HT8Uhg8EYqVHVn3S5/e638ea2026dc8139f8b1510106b4c893/0129_M5_Messenger-CustomizeMultiBrand-Marketing-_1x1_0922.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>


      <div className='HeroSection'>
        <div className='Title'>What People Are Saying</div>
        <div className='Subtitle'>Don't just take our word for it. Here's what real people are <br /> saying about Toggle on Twitter.</div>

        <Marquee className='marquee' fade={true} >
          <div className='tweet'>
            <div className='top'>
              <div className='left'>
                <img src={'https://pbs.twimg.com/profile_images/1615415654013669387/NoBl-jGW_normal.jpg'} />
                <div className='info'>
                  <div className='name'>Sand</div>
                  <div className='username'>@sndSand</div>
                </div>
              </div>
              <div className='right'>
                <img src={'https://dwglogo.com/wp-content/uploads/2019/02/Twitter_logo.png'} />
              </div>
            </div>
            <div className='msg'>
              This looks crazyy good! Congrats on the launch
            </div>
          </div>
          <div className='tweet'>
            <div className='top'>
              <div className='left'>
                <img src={'https://pbs.twimg.com/profile_images/1615415654013669387/NoBl-jGW_normal.jpg'} />
                <div className='info'>
                  <div className='name'>Sand</div>
                  <div className='username'>@sndSand</div>
                </div>
              </div>
              <div className='right'>
                <img src={'https://dwglogo.com/wp-content/uploads/2019/02/Twitter_logo.png'} />
              </div>
            </div>
            <div className='msg'>
              This looks crazyy good! Congrats on the launch
            </div>
          </div>
          <div className='tweet'>
            <div className='top'>
              <div className='left'>
                <img src={'https://pbs.twimg.com/profile_images/1615415654013669387/NoBl-jGW_normal.jpg'} />
                <div className='info'>
                  <div className='name'>Sand</div>
                  <div className='username'>@sndSand</div>
                </div>
              </div>
              <div className='right'>
                <img src={'https://dwglogo.com/wp-content/uploads/2019/02/Twitter_logo.png'} />
              </div>
            </div>
            <div className='msg'>
              This looks crazyy good! Congrats on the launch
            </div>
          </div>
          <div className='tweet'>
            <div className='top'>
              <div className='left'>
                <img src={'https://pbs.twimg.com/profile_images/1615415654013669387/NoBl-jGW_normal.jpg'} />
                <div className='info'>
                  <div className='name'>Sand</div>
                  <div className='username'>@sndSand</div>
                </div>
              </div>
              <div className='right'>
                <img src={'https://dwglogo.com/wp-content/uploads/2019/02/Twitter_logo.png'} />
              </div>
            </div>
            <div className='msg'>
              This looks crazyy good! Congrats on the launch
            </div>
          </div>
        </Marquee>
      </div>


      <div className='righttext'>
        <div className='text'>
          <div className='title'>What People Are Saying</div>
          <div className='subtitle'>Don't just take our word for it. Here's what real people are saying about Toggle on Twitter.</div>
        </div>
        <img src={'https://content-management-files.canva.com/133df997-f170-4d3d-8f76-68082b965cfd/benefits-magic-en-in-desktop.jpg'}/>
      </div>

      <div className='lefttext'>
      <img src={'https://content-management-files.canva.com/687e712b-f87c-4fd5-aca7-c2a1c52efe70/benefits-together-en-in-desktop.jpg'}/>
        <div className='text'>
          <div className='title'>What People Are Saying</div>
          <div className='subtitle'>Don't just take our word for it. Here's what real people are saying about Toggle on Twitter.</div>
        </div>
      </div>

      <div className='righttext'>
        <div className='text'>
          <div className='title'>What People Are Saying</div>
          <div className='subtitle'>Don't just take our word for it. Here's what real people are saying about Toggle on Twitter.</div>
        </div>
        <img src={'https://content-management-files.canva.com/9f8d2d84-54ac-4f76-b8f2-19fbe6775730/benefits-print-in-desktop.jpg'}/>
      </div>


      <div className='circle'>
      </div>

      <div className='lastform'>
        <div className='title'>Start building with Toggle</div>
        <button>Get started for free</button>
      </div>

<div className='footer'>
  <div className='footerright'>
  <img src={'https://i.pinimg.com/736x/bd/51/0c/bd510c9c46e3c3a1388776dfb11f5ed9.jpg'}/>
  <img src={'https://i.pinimg.com/1200x/3e/f3/b2/3ef3b280bce4c1209e1e4376c7f452ed.jpg'}/>
  <img src={'https://www.transparentpng.com/download/logo-instagram/SKq9yH-black-and-white-instagram-logo-png.png'}/>
  <img src={'https://static.vecteezy.com/system/resources/thumbnails/026/406/678/small_2x/social-media-x-logo-black-and-white-free-vector.jpg'}/>
  <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVoaJCn9oFy4qI_1da_MTw-IKnVZy1zLe51qvhsyzmXnfJclZ0IqdfyakD5pVeajmh2F0&usqp=CAU'}/>
  </div>
  <div className='links'>
  <a>Terms of Use</a>
  <a>Privacy Policy</a>
  <a>© 2006-2024 Toggle.it, Inc</a>
  </div>
</div>

    </div>
  );
}

export default LandingPage;
