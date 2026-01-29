import React from 'react';

const HUD = ({ score, completedCareers }) => {
  return (
    <div className="hud">
      <div className="hud-title">⚡ CAREER QUEST</div>
      <div className="score-display">
        <span>Score:</span>
        <span>{score}</span>
      </div>
      <div className="score-display">
        <span>Careers:</span>
        <span>{completedCareers.size}/4</span>
      </div>
      <div className="careers-completed">
        <div className={`career-badge engineer ${completedCareers.has('engineer') ? 'completed' : 'incomplete'}`}>
          💻 Engineer
        </div>
        <div className={`career-badge nurse ${completedCareers.has('nurse') ? 'completed' : 'incomplete'}`}>
          ❤️ Nurse
        </div>
        <div className={`career-badge business ${completedCareers.has('business') ? 'completed' : 'incomplete'}`}>
          📊 Business
        </div>
        <div className={`career-badge lawyer ${completedCareers.has('lawyer') ? 'completed' : 'incomplete'}`}>
          ⚖️ Lawyer
        </div>
      </div>
    </div>
  );
};

export default HUD;
