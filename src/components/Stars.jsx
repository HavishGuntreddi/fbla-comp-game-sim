import React, { useEffect, useRef } from 'react';

const Stars = () => {
  const starsRef = useRef(null);

  useEffect(() => {
    if (starsRef.current) {
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsRef.current.appendChild(star);
      }
    }
  }, []);

  return <div className="stars" ref={starsRef}></div>;
};

export default Stars;
