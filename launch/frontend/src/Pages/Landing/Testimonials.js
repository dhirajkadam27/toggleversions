import './Testimonials.css';
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";

function Testimonials() {


    return (
        <div className="Testimonials">
        <div className='MainLine'>What People Are Saying</div>
        <div className='SubLine'>Don't just take our word for it. Here's what real people are<br/>saying about Toggle on Twitter.</div>

        <Marquee className='marquee' fade={true} >
          <div className='tweet'>
            <div className='top'>
              <div className='left'>
                <img alt="img"  src={'https://pbs.twimg.com/profile_images/1467923681905053696/PnQseNnx_normal.jpg'} />
                <div className='info'>
                  <div className='name'>Kanishk Khurana</div>
                  <div className='username'>@KanishkKhurana_</div>
                </div>
              </div>
              <div className='right'>
                <img alt="img"  src={'https://dwglogo.com/wp-content/uploads/2019/02/Twitter_logo.png'} />
              </div>
            </div>
            <div className='msg'>
            Looks great! Keep building🔥
            </div>
          </div>
          <div className='tweet'>
            <div className='top'>
              <div className='left'>
                <img alt="img"  src={'https://pbs.twimg.com/profile_images/1615415654013669387/NoBl-jGW_normal.jpg'} />
                <div className='info'>
                  <div className='name'>Jake Duth</div>
                  <div className='username'>@JakeDuth</div>
                </div>
              </div>
              <div className='right'>
                <img alt="img"  src={'https://dwglogo.com/wp-content/uploads/2019/02/Twitter_logo.png'} />
              </div>
            </div>
            <div className='msg'>
            Okay this is amazing
            </div>
          </div>
          <div className='tweet'>
            <div className='top'>
              <div className='left'>
                <img alt="img"  src={'https://pbs.twimg.com/profile_images/1833232062582546432/mjdlna28_normal.jpg'} />
                <div className='info'>
                  <div className='name'>Fred Maia ☄️</div>
                  <div className='username'>@fredmaiaarantes</div>
                </div>
              </div>
              <div className='right'>
                <img alt="img"  src={'https://dwglogo.com/wp-content/uploads/2019/02/Twitter_logo.png'} />
              </div>
            </div>
            <div className='msg'>
            I was looking for something like that yesterday. Well done and tks for sharing!
            </div>
          </div>
          <div className='tweet'>
            <div className='top'>
              <div className='left'>
                <img alt="img"  src={'https://pbs.twimg.com/profile_images/1834996898920312832/VEacRGaD_normal.jpg'} />
                <div className='info'>
                  <div className='name'>jordi</div>
                  <div className='username'>@jordienr</div>
                </div>
              </div>
              <div className='right'>
                <img alt="img"  src={'https://dwglogo.com/wp-content/uploads/2019/02/Twitter_logo.png'} />
              </div>
            </div>
            <div className='msg'>
            This is awesome 👏
            </div>
          </div>
          <div className='tweet'>
            <div className='top'>
              <div className='left'>
                <img alt="img"  src={'https://pbs.twimg.com/profile_images/1506792347840888834/dS-r50Je_normal.jpg'} />
                <div className='info'>
                  <div className='name'>Steven Tey</div>
                  <div className='username'>@steventey</div>
                </div>
              </div>
              <div className='right'>
                <img alt="img"  src={'https://dwglogo.com/wp-content/uploads/2019/02/Twitter_logo.png'} />
              </div>
            </div>
            <div className='msg'>
            bruh this is so good 🤤
            </div>
          </div>
        </Marquee>

        </div>
    );
}

export default Testimonials;
