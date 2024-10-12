import './LandingPage.css';
import Feedback from '../assets/Feedback.svg';
import Statistics from '../assets/MobileApps/Statistics.svg';
import Blog from '../assets/MobileApps/Blog.svg';
import onboarding from '../assets/MobileApps/onboarding.svg';
import Shop from '../assets/MobileApps/Shop.svg';
import Product from '../assets/MobileApps/Product.svg';
import login1 from '../assets/Webpages/1.png';
import login2 from '../assets/Webpages/2.png';
import login3 from '../assets/Webpages/3.png';
import login4 from '../assets/Webpages/4.png';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {Input} from "@nextui-org/react";


function LandingPage() {
  const navigate = useNavigate();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div className="LandingPage">
      <div className="logo">Toggle<div className="tag">Beta</div></div>
      <div className="tagline">We<img alt="UIUX" src="https://www.naapbooks.com/media/rzyffzgf/mobile_app_development_banner.jfif?width=700" />deliver<br />technology that puts<br /> creators<img alt="UIUX" src="https://s29814.pcdn.co/wp-content/uploads/2023/04/shutterstock_2085604534.jpg.optimal.jpg" />first</div>
      <button className="trybtn"  onClick={onOpen}>Try Now</button>
      <img className="feedback" alt="feedback" src={Feedback} />

<div className='viewmarquee'>
<div className='marquee'>
      <div className='mobile'>
        <img alt="Screenshots" src={Statistics} />
        <img alt="Screenshots" src={Blog} />
        <img alt="Screenshots" src={onboarding} />
        <img alt="Screenshots" src={Shop} />
        <img alt="Screenshots" src={Product} />
        <img alt="Screenshots" src={Statistics} />
        <img alt="Screenshots" src={Blog} />
        <img alt="Screenshots" src={onboarding} />
        <img alt="Screenshots" src={Shop} />
        <img alt="Screenshots" src={Product} />
      </div>
      <div className='desktop'>
        <img alt="Screenshots" src={login1} />
        <img alt="Screenshots" src={login2} />
        <img alt="Screenshots" src={login3} />
        <img alt="Screenshots" src={login4} />
        <img alt="Screenshots" src={login1} />
        <img alt="Screenshots" src={login2} />
        <img alt="Screenshots" src={login3} />
        <img alt="Screenshots" src={login4} />
      </div>
    </div>
</div>


      <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Get Started</ModalHeader>
              <ModalBody>
              <Input
          type="email"
          label="Email"
          placeholder="you@example.com"
          labelPlacement="outside"
          startContent={
            <MdOutlineAlternateEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={()=>{onClose();navigate('/app');}}>
                  Continue
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
    </div>
  );
}

export default LandingPage;
