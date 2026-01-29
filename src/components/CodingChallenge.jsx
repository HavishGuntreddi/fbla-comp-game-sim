import React, { useState, useEffect, useRef } from 'react';

const CodingChallenge = ({ onComplete }) => {
  const codeToType = [
    'function calculateTotal(items) {',
    '  return items.reduce((sum, item) => {',
    '    return sum + item.price;',
    '  }, 0);',
    '}'
  ];

  const [currentLine, setCurrentLine] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [completedLines, setCompletedLines] = useState([]);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isComplete, setIsComplete] = useState(false);
  const [errors, setErrors] = useState(0);
  const [showError, setShowError] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft > 0 && !isComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isComplete) {
      handleTimeout();
    }
  }, [timeLeft, isComplete]);

  useEffect(() => {
    if (inputRefs.current[currentLine]) {
      inputRefs.current[currentLine].focus();
    }
    // Reset error state when moving to a new line
    setShowError(false);
  }, [currentLine]);

  const handleTimeout = () => {
    const score = Math.max(0, completedLines.length * 20 - errors * 5);
    onComplete(score);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const targetLine = codeToType[currentLine];
    
    // Only allow typing if we haven't exceeded the target length
    if (value.length > targetLine.length) {
      return;
    }
    
    setUserInput(value);
    
    // Check if what's typed so far matches the target
    const isCorrectSoFar = targetLine.startsWith(value);
    
    // Only show error if typing wrong characters, not on initial empty state
    if (!isCorrectSoFar && value.length > 0) {
      if (!showError) {
        setShowError(true);
        setTimeout(() => setShowError(false), 200);
      }
    } else {
      // Make sure error state is cleared when typing correctly
      if (showError) {
        setShowError(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const targetLine = codeToType[currentLine];
      
      // Check if the trimmed input matches the trimmed target
      if (userInput.trim() === targetLine.trim()) {
        // Correct line completed
        const newCompletedLines = [...completedLines, currentLine];
        setCompletedLines(newCompletedLines);
        setUserInput(''); // Clear input for next line
        setShowError(false); // Ensure error state is cleared
        
        if (currentLine === codeToType.length - 1) {
          // All lines complete
          setIsComplete(true);
          const bonus = Math.floor(timeLeft * 2);
          const score = 100 + bonus - errors * 5;
          setTimeout(() => onComplete(Math.max(50, score)), 500);
        } else {
          // Move to next line
          setCurrentLine(currentLine + 1);
        }
      } else {
        // Incorrect - increment errors and show feedback
        setErrors(errors + 1);
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
          setUserInput('');
        }, 500);
      }
    }
  };

  const progress = (completedLines.length / codeToType.length) * 100;

  return (
    <div className="interactive-activity" style={{ borderColor: '#00d9ff' }}>
      <div className="activity-title">
        <span>⚡ Speed Coding Challenge</span>
        <span className={`timer ${timeLeft <= 10 ? 'warning' : ''}`}>
          {timeLeft}s
        </span>
      </div>
      
      <p style={{ marginBottom: '1rem', fontSize: '1.05rem' }}>
        Type out this JavaScript function as fast and accurately as you can! 
        Press <strong>Enter</strong> after each line.
      </p>

      <div className="code-editor">
        {codeToType.map((line, index) => (
          <div key={index} className="code-line">
            <span className="line-number">{index + 1}</span>
            <div className="code-content">
              <div className="code-target">{line}</div>
              {index === currentLine && !isComplete && (
                <input
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  className={`code-input ${showError ? 'error' : ''}`}
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                />
              )}
              {completedLines.includes(index) && (
                <div className="code-input completed">
                  {line}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <div style={{ 
        marginTop: '1rem', 
        display: 'flex', 
        justifyContent: 'space-between',
        fontSize: '0.95rem',
        opacity: 0.8
      }}>
        <span>Lines: {completedLines.length}/{codeToType.length}</span>
        <span>Errors: {errors}</span>
      </div>

      {isComplete && (
        <div className="activity-complete">
          <div className="activity-complete-title">✓ Code Complete!</div>
          <div className="activity-score">
            Time Bonus: +{Math.floor(timeLeft * 2)} points
          </div>
        </div>
      )}
    </div>
  );
};

export default CodingChallenge;
