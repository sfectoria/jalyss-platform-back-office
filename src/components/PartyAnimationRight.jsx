import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/party.json';

export default function PartyAnimationRight(){
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return (
      <div style={{ transform: 'rotate(-45deg)' }}>
        <Lottie 
          options={defaultOptions}
          height={300}
          width={300}
        />
      </div>
    );
}