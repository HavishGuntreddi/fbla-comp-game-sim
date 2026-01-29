import React from 'react';

const CompletionScreen = ({ score, onRestart }) => {
  return (
    <div className="completion-screen">
      <div className="completion-content">
        <h1 className="completion-title">🎉 QUEST COMPLETE!</h1>
        <p className="completion-message">
          Congratulations! You've explored all four career paths and gained valuable insights into each profession. 
          You're now equipped with knowledge about Software Engineering, Nursing, Business Analysis, and Law!
        </p>
        <div className="final-score">Final Score: {score}</div>
        <button className="restart-button" onClick={onRestart}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default CompletionScreen;
