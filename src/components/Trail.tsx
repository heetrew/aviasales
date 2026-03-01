import React, { useEffect, useRef } from 'react';

const TRAIL_SIZE = 20;

const Trail: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const poolRef = useRef<HTMLDivElement[]>([]);
  const activeRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    for (let i = 0; i < TRAIL_SIZE; i++) {
      const el = document.createElement('div');
      el.className = 'trail';
      el.textContent = '?';
      el.style.opacity = '0';
      containerRef.current.appendChild(el);
      poolRef.current.push(el);
    }

    const spawn = (x: number, y: number) => {
      if (poolRef.current.length === 0) {
        const oldest = activeRef.current.shift();
        if (oldest) poolRef.current.push(oldest);
      }

      const particle = poolRef.current.pop();
      if (!particle) return;
      activeRef.current.push(particle);

      particle.style.transition = 'none';
      particle.style.transform = `translate(${x}px, ${y}px) scale(1) rotate(0deg)`;
      particle.style.opacity = '0.8';

      void particle.offsetWidth;

      requestAnimationFrame(() => {
        particle.style.transition = 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.7s ease';
        particle.style.transform = `translate(${x}px, ${y + 50}px) scale(0.3) rotate(25deg)`;
        particle.style.opacity = '0';
      });

      setTimeout(() => {
        const idx = activeRef.current.indexOf(particle);
        if (idx > -1) {
          activeRef.current.splice(idx, 1);
          poolRef.current.push(particle);
        }
      }, 400);
    };

    const handleMouseMove = (e: MouseEvent) => spawn(e.pageX - 16, e.pageY - 16);
    const handleTouchMove = (e: TouchEvent) => spawn(e.touches[0].clientX - 16, e.touches[0].clientY - 16);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return <div id="trail-container" ref={containerRef} />;
};

export default Trail;
