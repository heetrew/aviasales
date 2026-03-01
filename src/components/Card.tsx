import React, { useRef, useState, useEffect } from 'react';

interface CardProps {
  index: number;
  text: string;
  onSwipe: (direction: 'left' | 'right') => void;
  threshold: number;
  styles?: React.CSSProperties;
  icon?: string;
}

const Card: React.FC<CardProps> = ({ text, onSwipe, threshold, styles, icon }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const badgeYesRef = useRef<HTMLDivElement>(null);
  const badgeNoRef = useRef<HTMLDivElement>(null);
  
  const [isSwiped, setIsSwiped] = useState(false);
  
  const dragInfo = useRef({
    isDragging: false,
    startX: 0,
    currentX: 0
  });

  const updateBadges = (deltaX: number) => {
    if (!badgeYesRef.current || !badgeNoRef.current) return;
    const opacity = Math.min(Math.abs(deltaX) / threshold, 1);
    
    if (deltaX > 0) {
      badgeYesRef.current.style.opacity = String(opacity);
      badgeNoRef.current.style.opacity = '0';
    } else {
      badgeNoRef.current.style.opacity = String(opacity);
      badgeYesRef.current.style.opacity = '0';
    }
  };

  const handleStart = (clientX: number) => {
    if (isSwiped) return;
    dragInfo.current.isDragging = true;
    dragInfo.current.startX = clientX;
    if (cardRef.current) {
      cardRef.current.style.transition = 'none';
    }
  };

  const handleMove = (clientX: number) => {
    if (!dragInfo.current.isDragging || !cardRef.current) return;
    
    const deltaX = clientX - dragInfo.current.startX;
    dragInfo.current.currentX = deltaX;
    
    const rotate = deltaX * 0.05;
    cardRef.current.style.transform = `translateX(${deltaX}px) rotate(${rotate}deg)`;
    updateBadges(deltaX);
  };

  const handleEnd = () => {
    if (!dragInfo.current.isDragging || !cardRef.current) return;
    dragInfo.current.isDragging = false;
    
    const { currentX } = dragInfo.current;
    
    if (currentX > threshold) {
      completeSwipe('right');
    } else if (currentX < -threshold) {
      completeSwipe('left');
    } else {
      resetPosition();
    }
    dragInfo.current.currentX = 0;
  };

  const completeSwipe = (direction: 'left' | 'right') => {
    if (!cardRef.current) return;
    setIsSwiped(true);
    
    const targetX = direction === 'right' ? window.innerWidth : -window.innerWidth;
    const rotate = direction === 'right' ? 30 : -30;
    
    cardRef.current.style.transition = 'transform 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53)';
    cardRef.current.style.transform = `translateX(${targetX}px) rotate(${rotate}deg)`;
    
    setTimeout(() => onSwipe(direction), 300);
  };

  const resetPosition = () => {
    if (!cardRef.current || !badgeYesRef.current || !badgeNoRef.current) return;
    cardRef.current.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    cardRef.current.style.transform = 'translateX(0) rotate(0)';
    badgeYesRef.current.style.opacity = '0';
    badgeNoRef.current.style.opacity = '0';
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.pageX);
    const onMouseUp = () => handleEnd();
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onTouchEnd = () => handleEnd();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <article 
      ref={cardRef} 
      className="card"
      style={styles}
      onMouseDown={(e) => handleStart(e.pageX)}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
    >
      <div ref={badgeYesRef} className="card-badge badge-yes">Да</div>
      <div ref={badgeNoRef} className="card-badge badge-no">Нет</div>
      {icon && (
        <div 
          className='card-icon'
          dangerouslySetInnerHTML={{ __html: icon }} 
        />
      )}
      <p>{text}</p>
    </article>
  );
};

export default Card;
