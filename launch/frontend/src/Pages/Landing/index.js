import './index.css';
import Nav from './Nav';
import HeroSection1 from './HeroSection1';
import TrendingTemplates from './TrendingTemplates';
import Testimonials from './Testimonials';
import RightText1 from './RightText1';
import LeftText from './LeftText';
import RightText2 from './RightText2';
import LastCall from './LastCall';
import Footer from './Footer';
import { useEffect } from 'react';


function LandingPage() {

  useEffect(
    () => {
      console.log(localStorage.getItem('userid'));
        if(localStorage.getItem('userid')){
            window.location.href = '/sites/'+localStorage.getItem('userid')
        }
    },
    []
);

  return (
    <div className="LandingPage">
      <Nav />
      <HeroSection1 />
      <TrendingTemplates />
      <Testimonials />
      <RightText1 />
      <LeftText />
      <RightText2 />
      <LastCall />
      <Footer />
    </div>
  );
}

export default LandingPage;
