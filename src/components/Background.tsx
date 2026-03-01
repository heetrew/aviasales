import React, { useState, useEffect } from 'react';

interface BackgroundProps {
  currentBg: string;
  currentIndex: number;
}

const Background: React.FC<BackgroundProps> = ({ currentBg, currentIndex }) => {
  const [evenBg, setEvenBg] = useState('');
  const [oddBg, setOddBg] = useState('');

  useEffect(() => {
    if (currentIndex % 2 === 0) {
      setEvenBg(currentBg);
    } else {
      setOddBg(currentBg);
    }
  }, [currentBg, currentIndex]);

  const isEvenActive = currentIndex % 2 === 0;

  return (
    <div className="bg-wrap">
      <div 
        className={`bg-layer ${isEvenActive ? 'active' : ''}`} 
        style={{ 
          backgroundImage: evenBg ? `url('${evenBg}')` : 'none'
        }}
      />
      <div 
        className={`bg-layer ${!isEvenActive ? 'active' : ''}`} 
        style={{ 
          backgroundImage: oddBg ? `url('${oddBg}')` : 'none'
        }}
      />
    </div>
  );
};

export default Background;
