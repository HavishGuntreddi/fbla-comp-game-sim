import React, { useState } from 'react';
import './App.css';
import Stars from './components/Stars';
import TitleScreen from './components/TitleScreen';
import HUD from './components/HUD';
import HubWorld from './components/HubWorld';
import MiniGame from './components/MiniGame';
import CompletionScreen from './components/CompletionScreen';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [titleHidden, setTitleHidden] = useState(false);
  const [score, setScore] = useState(0);
  const [completedCareers, setCompletedCareers] = useState(new Set());
  const [currentCareer, setCurrentCareer] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);

  const startGame = () => {
    setTitleHidden(true);
    setTimeout(() => {
      setGameStarted(true);
    }, 500);
  };

  const enterCareer = (careerType) => {
    setCurrentCareer(careerType);
  };

  const closeMiniGame = () => {
    setCurrentCareer(null);
  };

  const completeCareer = (careerType) => {
    const newCompleted = new Set(completedCareers);
    newCompleted.add(careerType);
    setCompletedCareers(newCompleted);

    if (newCompleted.size === 4) {
      setTimeout(() => {
        setShowCompletion(true);
      }, 500);
    }
  };

  const updateScore = (points) => {
    setScore(prevScore => prevScore + points);
  };

  const restartGame = () => {
    setScore(0);
    setCompletedCareers(new Set());
    setCurrentCareer(null);
    setShowCompletion(false);
    setGameStarted(false);
    setTitleHidden(false);
  };

  return (
    <>
      <Stars />
      
      {!gameStarted && (
        <TitleScreen onStart={startGame} isHidden={titleHidden} />
      )}

      {gameStarted && !showCompletion && (
        <>
          <HUD 
            score={score} 
            completedCareers={completedCareers}
          />
          <HubWorld 
            onEnterCareer={enterCareer} 
            completedCareers={completedCareers}
            isMiniGameActive={currentCareer !== null}
          />
        </>
      )}

      {currentCareer && (
        <MiniGame
          careerType={currentCareer}
          onClose={closeMiniGame}
          onComplete={completeCareer}
          onScoreUpdate={updateScore}
        />
      )}

      {showCompletion && (
        <CompletionScreen score={score} onRestart={restartGame} />
      )}
    </>
  );
}

export default App;
