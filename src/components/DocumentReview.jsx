import React, { useState } from 'react';

const DocumentReview = ({ onComplete }) => {
  const clauses = [
    {
      id: 1,
      text: 'The Buyer agrees to purchase the property located at 123 Main Street for the sum of $500,000.',
      hasIssue: false,
      issue: null
    },
    {
      id: 2,
      text: 'Payment shall be made in full within 30 days of signing, or at any time the Seller decides to request it.',
      hasIssue: true,
      issue: 'Ambiguous payment terms - "or at any time" creates uncertainty and potential for disputes. Should specify clear, definite payment schedule.'
    },
    {
      id: 3,
      text: 'The Seller makes no warranties regarding the condition of the property, and the Buyer accepts all risks.',
      hasIssue: false,
      issue: null
    },
    {
      id: 4,
      text: 'Either party may cancel this agreement for any reason without penalty or notice to the other party.',
      hasIssue: true,
      issue: 'No notice requirement for cancellation creates instability. Standard practice requires reasonable notice period (e.g., 30 days).'
    },
    {
      id: 5,
      text: 'This agreement shall be governed by the laws of the State of California.',
      hasIssue: false,
      issue: null
    },
    {
      id: 6,
      text: 'The Buyer will pay whatever fees the Seller thinks are appropriate for maintenance of the property.',
      hasIssue: true,
      issue: 'Vague and unlimited financial obligation - "whatever fees" lacks specificity. Should define exact fees or establish clear calculation method.'
    },
    {
      id: 7,
      text: 'Any disputes shall be resolved through binding arbitration in accordance with the American Arbitration Association rules.',
      hasIssue: false,
      issue: null
    }
  ];

  const [selectedClauses, setSelectedClauses] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);

  const handleClauseClick = (clauseId) => {
    if (submitted) return;

    if (selectedClauses.includes(clauseId)) {
      setSelectedClauses(selectedClauses.filter(id => id !== clauseId));
    } else {
      setSelectedClauses([...selectedClauses, clauseId]);
    }
  };

  const handleSubmit = () => {
    let correctlyIdentified = 0;
    let falsePositives = 0;
    let missed = 0;

    const issuesFound = clauses.filter(c => c.hasIssue && selectedClauses.includes(c.id)).length;
    const issuesTotal = clauses.filter(c => c.hasIssue).length;
    
    clauses.forEach(clause => {
      if (clause.hasIssue && selectedClauses.includes(clause.id)) {
        correctlyIdentified++;
      } else if (clause.hasIssue && !selectedClauses.includes(clause.id)) {
        missed++;
      } else if (!clause.hasIssue && selectedClauses.includes(clause.id)) {
        falsePositives++;
      }
    });

    const accuracy = ((correctlyIdentified / issuesTotal) * 100);
    const precision = selectedClauses.length > 0 
      ? ((correctlyIdentified / selectedClauses.length) * 100) 
      : 0;
    
    const score = Math.round((accuracy * 0.7) + (precision * 0.3));

    setResults({
      correctlyIdentified,
      missed,
      falsePositives,
      total: issuesTotal,
      score
    });
    
    setSubmitted(true);
    
    setTimeout(() => {
      onComplete(score);
    }, 4000);
  };

  const issuesInDocument = clauses.filter(c => c.hasIssue).length;

  return (
    <div className="interactive-activity" style={{ borderColor: '#8338ec' }}>
      <div className="activity-title">
        <span>⚖️ Contract Review</span>
      </div>
      
      <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
        Review this real estate contract. <strong>Click on clauses that contain legal issues</strong> - 
        ambiguous terms, unfair provisions, or unclear obligations. There are <strong>{issuesInDocument} issues</strong> to find.
      </p>

      <div className="document-container">
        <h4>REAL ESTATE PURCHASE AGREEMENT</h4>
        
        {clauses.map(clause => {
          let className = 'document-clause';
          if (clause.hasIssue) className += ' issue';
          if (selectedClauses.includes(clause.id)) className += ' selected';
          if (submitted) {
            if (clause.hasIssue && selectedClauses.includes(clause.id)) {
              className += ' found';
            } else if (clause.hasIssue && !selectedClauses.includes(clause.id)) {
              className += ' missed';
            } else if (!clause.hasIssue && selectedClauses.includes(clause.id)) {
              className += ' incorrect';
            }
          }

          return (
            <div
              key={clause.id}
              className={className}
              onClick={() => handleClauseClick(clause.id)}
            >
              <strong>§{clause.id}.</strong> {clause.text}
              
              {submitted && clause.hasIssue && (
                <div style={{ 
                  marginTop: '0.8rem',
                  padding: '0.8rem',
                  background: selectedClauses.includes(clause.id) 
                    ? 'rgba(6, 255, 165, 0.2)' 
                    : 'rgba(255, 0, 110, 0.2)',
                  borderRadius: '5px',
                  fontSize: '0.9rem',
                  fontFamily: 'Nunito, sans-serif',
                  color: '#000000',
                  border: '1px solid',
                  borderColor: selectedClauses.includes(clause.id) 
                    ? '#06ffa5' 
                    : '#ff006e'
                }}>
                  <strong>Legal Issue:</strong> {clause.issue}
                </div>
              )}
              
              {submitted && !clause.hasIssue && selectedClauses.includes(clause.id) && (
                <div style={{ 
                  marginTop: '0.8rem',
                  padding: '0.8rem',
                  background: 'rgba(255, 0, 110, 0.2)',
                  borderRadius: '5px',
                  fontSize: '0.9rem',
                  fontFamily: 'Nunito, sans-serif',
                  color: '#000000',
                  border: '1px solid #ff006e'
                }}>
                  <strong>Note:</strong> This clause is standard and doesn't contain legal issues.
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="issue-count">
        You've identified {selectedClauses.length} potential {selectedClauses.length === 1 ? 'issue' : 'issues'}
      </div>

      {!submitted && (
        <button className="submit-button" onClick={handleSubmit}>
          Submit Contract Review
        </button>
      )}

      {results && (
        <div className="activity-complete">
          <div className="activity-complete-title">
            {results.score >= 80 ? '✓ Expert Analysis!' : results.score >= 60 ? '✓ Solid Review!' : '✓ Review Complete!'}
          </div>
          <div style={{ marginTop: '1rem', fontSize: '1rem', lineHeight: '1.6' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: '#06ffa5' }}>Found:</strong> {results.correctlyIdentified}/{results.total} issues
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: '#ff006e' }}>Missed:</strong> {results.missed} issues
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: '#ffbe0b' }}>False Positives:</strong> {results.falsePositives}
            </div>
            <div className="activity-score" style={{ marginTop: '1rem' }}>
              Score: {results.score} points
            </div>
          </div>
          <div style={{ 
            marginTop: '1.5rem', 
            fontSize: '0.95rem',
            opacity: 0.9,
            lineHeight: '1.5'
          }}>
            Great lawyers catch ambiguous terms, identify potential disputes, and protect 
            their clients with attention to detail!
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentReview;
