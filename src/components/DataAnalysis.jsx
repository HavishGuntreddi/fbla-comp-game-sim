import React, { useState } from 'react';

const DataAnalysis = ({ onComplete }) => {
  const salesData = [
    { region: 'North', value: 75, trend: 'up' },
    { region: 'South', value: 45, trend: 'down' },
    { region: 'East', value: 92, trend: 'up' },
    { region: 'West', value: 38, trend: 'down' }
  ];

  const insights = [
    {
      id: 1,
      text: 'Focus marketing budget on South and West regions to reverse declining trends',
      correct: true,
      explanation: 'Correct! Investing in underperforming regions can help reverse negative trends.'
    },
    {
      id: 2,
      text: 'Shut down South and West operations immediately',
      correct: false,
      explanation: 'Too drastic! Analysis should look deeper into causes before major decisions.'
    },
    {
      id: 3,
      text: 'Study successful strategies from North and East, then adapt for South and West',
      correct: true,
      explanation: 'Excellent! Learning from successful regions is a smart analytical approach.'
    },
    {
      id: 4,
      text: 'Ignore the trends - they\'ll fix themselves',
      correct: false,
      explanation: 'Incorrect. Data-driven decision making requires action based on trends.'
    }
  ];

  const [selectedInsights, setSelectedInsights] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [hoveredBar, setHoveredBar] = useState(null);

  const handleInsightClick = (insightId) => {
    if (submitted) return;
    
    if (selectedInsights.includes(insightId)) {
      setSelectedInsights(selectedInsights.filter(id => id !== insightId));
    } else {
      setSelectedInsights([...selectedInsights, insightId]);
    }
  };

  const handleSubmit = () => {
    let correct = 0;
    let total = 0;

    insights.forEach(insight => {
      if (insight.correct) {
        total++;
        if (selectedInsights.includes(insight.id)) {
          correct++;
        }
      } else {
        if (selectedInsights.includes(insight.id)) {
          // Penalty for selecting wrong insights
          correct -= 0.5;
        }
      }
    });

    const score = Math.max(0, Math.round((correct / total) * 100));
    setSubmitted(true);
    
    setTimeout(() => {
      onComplete(score);
    }, 3000);
  };

  return (
    <div className="interactive-activity" style={{ borderColor: '#ffbe0b' }}>
      <div className="activity-title">
        <span>📊 Data-Driven Decision Making</span>
      </div>
      
      <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
        Analyze the regional sales data below. Hover over bars to see details, then select the 
        <strong> correct strategic recommendations</strong> based on the data trends.
      </p>

      <div className="data-container">
        <h4 style={{ 
          textAlign: 'center', 
          marginBottom: '2rem', 
          fontSize: '1.2rem',
          color: '#ffbe0b' 
        }}>
          Regional Sales Performance ($K)
        </h4>
        
        <div className="data-chart">
          {salesData.map((data, index) => (
            <div
              key={index}
              className="data-bar"
              style={{ height: `${data.value}%` }}
              onMouseEnter={() => setHoveredBar(index)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              <div className="bar-value">
                ${data.value}K
                {hoveredBar === index && (
                  <span style={{ 
                    fontSize: '0.8rem', 
                    marginLeft: '5px',
                    color: data.trend === 'up' ? '#06ffa5' : '#ff006e'
                  }}>
                    {data.trend === 'up' ? '↑' : '↓'}
                  </span>
                )}
              </div>
              <div className="bar-label">{data.region}</div>
            </div>
          ))}
        </div>

        <div style={{ 
          marginTop: '3rem', 
          padding: '1rem',
          background: 'rgba(0, 217, 255, 0.1)',
          borderRadius: '8px',
          fontSize: '0.95rem'
        }}>
          <strong>Key Observations:</strong>
          <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem', lineHeight: '1.6' }}>
            <li>North region: <span style={{ color: '#06ffa5' }}>+30% growth</span></li>
            <li>South region: <span style={{ color: '#ff006e' }}>-20% decline</span></li>
            <li>East region: <span style={{ color: '#06ffa5' }}>+25% growth</span></li>
            <li>West region: <span style={{ color: '#ff006e' }}>-15% decline</span></li>
          </ul>
        </div>
      </div>

      <h4 style={{ 
        marginTop: '2rem', 
        marginBottom: '1rem', 
        fontSize: '1.1rem',
        color: '#ffbe0b' 
      }}>
        Select Strategic Recommendations (choose all that apply):
      </h4>

      <div className="insight-boxes">
        {insights.map(insight => {
          const isSelected = selectedInsights.includes(insight.id);
          let className = 'insight-box';
          if (isSelected) className += ' selected';
          if (submitted) {
            if (insight.correct && isSelected) className += ' correct';
            else if (!insight.correct && isSelected) className += ' incorrect';
          }

          return (
            <div
              key={insight.id}
              className={className}
              onClick={() => handleInsightClick(insight.id)}
            >
              <div style={{ marginBottom: '0.5rem', fontWeight: '600' }}>
                {insight.text}
              </div>
              {submitted && (
                <div style={{ 
                  marginTop: '0.8rem', 
                  paddingTop: '0.8rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                  fontSize: '0.9rem',
                  color: insight.correct && isSelected ? '#06ffa5' : '#ff006e'
                }}>
                  {insight.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedInsights.length > 0 && !submitted && (
        <button className="submit-button" onClick={handleSubmit}>
          Submit Analysis
        </button>
      )}

      {submitted && (
        <div className="activity-complete" style={{ marginTop: '2rem' }}>
          <div className="activity-complete-title">✓ Analysis Complete!</div>
          <div style={{ marginTop: '1rem', fontSize: '1rem' }}>
            A strong analyst identifies both opportunities and risks, recommends 
            evidence-based strategies, and avoids reactive decisions.
          </div>
        </div>
      )}
    </div>
  );
};

export default DataAnalysis;
