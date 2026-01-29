import React, { useState, useEffect } from 'react';
import { careers } from '../data/careers';
import CodingChallenge from './CodingChallenge';
import PatientTriage from './PatientTriage';
import DataAnalysis from './DataAnalysis';
import DocumentReview from './DocumentReview';

const MiniGame = ({ careerType, onClose, onComplete, onScoreUpdate }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [activityComplete, setActivityComplete] = useState(false);
  const [activityScore, setActivityScore] = useState(0);

  const career = careers[careerType];

  const handleActivityComplete = (score) => {
    setActivityScore(score);
    setActivityComplete(true);
    onScoreUpdate(score);
  };

  const selectOption = (questionIndex, optionIndex) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const submitChallenge = () => {
    let correctCount = 0;
    
    career.challenge.questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) {
        correctCount++;
      }
    });

    const points = correctCount * 100;
    onScoreUpdate(points);
    setSubmitted(true);

    setTimeout(() => {
      setShowSkills(true);
      const skillsSection = document.querySelector('.skills-learned');
      if (skillsSection) {
        skillsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000);
  };

  const completeCareer = () => {
    onComplete(careerType);
    onClose();
  };

  const renderInteractiveActivity = () => {
    switch(careerType) {
      case 'engineer':
        return <CodingChallenge onComplete={handleActivityComplete} />;
      case 'nurse':
        return <PatientTriage onComplete={handleActivityComplete} />;
      case 'business':
        return <DataAnalysis onComplete={handleActivityComplete} />;
      case 'lawyer':
        return <DocumentReview onComplete={handleActivityComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="mini-game">
      <div className="mini-game-header">
        <div className="mini-game-title" style={{ color: career.color }}>
          {career.title}
        </div>
        <button className="close-button" onClick={onClose}>
          ← Back to Hub
        </button>
      </div>
      
      <div className="mini-game-content">
        <div className="scenario-box" style={{ borderColor: career.color }}>
          <h3 className="scenario-title" style={{ color: career.color }}>
            {career.scenario.title}
          </h3>
          <p className="scenario-text">{career.scenario.text}</p>
        </div>

        {/* Interactive Activity */}
        {!activityComplete ? (
          renderInteractiveActivity()
        ) : (
          <div style={{ 
            background: 'rgba(6, 255, 165, 0.1)',
            border: '2px solid var(--success)',
            borderRadius: '15px',
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.3rem', color: 'var(--success)', marginBottom: '0.5rem' }}>
              ✓ Interactive Activity Complete!
            </div>
            <div style={{ fontSize: '1.1rem' }}>
              Activity Score: <strong>{activityScore} points</strong>
            </div>
            <div style={{ marginTop: '1rem', opacity: 0.8 }}>
              Now answer the scenario questions below to complete this career!
            </div>
          </div>
        )}

        {/* Traditional Questions - only show after activity is complete */}
        {activityComplete && (
          <div className="challenge-section" style={{ borderColor: career.color }}>
            <h3 className="challenge-title">{career.challenge.title}</h3>
            
            {career.challenge.questions.map((question, qIndex) => (
              <div key={qIndex} className="question">
                <p className="question-text">
                  {qIndex + 1}. {question.question}
                </p>
                <div className="options">
                  {question.options.map((option, oIndex) => {
                    let buttonClass = 'option-button';
                    if (selectedAnswers[qIndex] === oIndex) {
                      buttonClass += ' selected';
                    }
                    if (submitted) {
                      if (oIndex === question.correct) {
                        buttonClass += ' correct';
                      } else if (selectedAnswers[qIndex] === oIndex) {
                        buttonClass += ' incorrect';
                      }
                    }

                    return (
                      <button
                        key={oIndex}
                        className={buttonClass}
                        onClick={() => selectOption(qIndex, oIndex)}
                        disabled={submitted}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                
                {submitted && (
                  <div className={`feedback show ${selectedAnswers[qIndex] === question.correct ? 'correct' : 'incorrect'}`}>
                    {selectedAnswers[qIndex] === question.correct ? '✓' : '✗'} {question.explanation}
                  </div>
                )}
              </div>
            ))}

            {!submitted && (
              <button 
                className="submit-button" 
                onClick={submitChallenge}
                disabled={Object.keys(selectedAnswers).length < career.challenge.questions.length}
              >
                Submit Answers
              </button>
            )}
          </div>
        )}

        {showSkills && (
          <div className="skills-learned">
            <h3 className="skills-title">🎓 Skills You've Learned</h3>
            {career.skills.map((skill, index) => (
              <div key={index} className="skill-item">{skill}</div>
            ))}
            <div style={{ 
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'rgba(0, 217, 255, 0.1)',
              borderRadius: '10px',
              fontSize: '1.1rem'
            }}>
              <strong>Total Score for this Career:</strong> {activityScore + (Object.keys(selectedAnswers).filter((key) => selectedAnswers[key] === career.challenge.questions[key].correct).length * 100)} points
            </div>
            <button className="submit-button" onClick={completeCareer} style={{ marginTop: '1.5rem' }}>
              Complete Career & Return to Hub
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniGame;
