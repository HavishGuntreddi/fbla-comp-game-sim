import React from 'react';

const TitleScreen = ({ onStart, isHidden }) => {
  return (
    <div className={`title-screen ${isHidden ? 'hidden' : ''}`}>
      <h1 className="title-logo">CAREER QUEST</h1>
      <p className="title-subtitle">Explore Your Future, One Career at a Time</p>
      <button className="start-button" onClick={onStart}>
        START ADVENTURE
      </button>
      <div className="title-footer">
        FBLA 2025-2026 | Computer Game & Simulation Programming
      </div>
    </div>
  );
};

export default TitleScreen;
