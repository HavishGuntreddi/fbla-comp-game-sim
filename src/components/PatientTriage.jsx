import React, { useState } from 'react';

const PatientTriage = ({ onComplete }) => {
  const patients = [
    {
      id: 1,
      name: 'Patient A',
      icon: '😰',
      symptoms: 'Severe chest pain, shortness of breath, sweating',
      correctZone: 'critical'
    },
    {
      id: 2,
      name: 'Patient B',
      icon: '😣',
      symptoms: 'Broken wrist, moderate pain, stable vitals',
      correctZone: 'stable'
    },
    {
      id: 3,
      name: 'Patient C',
      icon: '😵',
      symptoms: 'Severe difficulty breathing, turning blue, gasping',
      correctZone: 'critical'
    },
    {
      id: 4,
      name: 'Patient D',
      icon: '🤕',
      symptoms: 'Deep laceration, bleeding controlled, conscious',
      correctZone: 'urgent'
    },
    {
      id: 5,
      name: 'Patient E',
      icon: '🤒',
      symptoms: 'High fever, mild dehydration, alert and responsive',
      correctZone: 'urgent'
    }
  ];

  const [availablePatients, setAvailablePatients] = useState(patients);
  const [zones, setZones] = useState({
    critical: [],
    urgent: [],
    stable: []
  });
  const [draggedPatient, setDraggedPatient] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);

  const handleDragStart = (patient) => {
    setDraggedPatient(patient);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, zoneName) => {
    e.preventDefault();
    
    if (draggedPatient) {
      // Remove from available patients
      setAvailablePatients(availablePatients.filter(p => p.id !== draggedPatient.id));
      
      // Add to zone
      setZones({
        ...zones,
        [zoneName]: [...zones[zoneName], draggedPatient]
      });
      
      setDraggedPatient(null);
    }
  };

  const handleRemoveFromZone = (patient, zoneName) => {
    setZones({
      ...zones,
      [zoneName]: zones[zoneName].filter(p => p.id !== patient.id)
    });
    setAvailablePatients([...availablePatients, patient]);
  };

  const handleSubmit = () => {
    let correct = 0;
    let total = 0;
    
    Object.keys(zones).forEach(zoneName => {
      zones[zoneName].forEach(patient => {
        total++;
        if (patient.correctZone === zoneName) {
          correct++;
        }
      });
    });

    const score = Math.round((correct / total) * 100);
    setResults({ correct, total, score });
    setSubmitted(true);
    
    setTimeout(() => {
      onComplete(score);
    }, 2000);
  };

  const allPatientsPlaced = availablePatients.length === 0;

  return (
    <div className="interactive-activity" style={{ borderColor: '#ff006e' }}>
      <div className="activity-title">
        <span>🏥 Emergency Triage</span>
      </div>
      
      <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
        Drag each patient to the correct priority zone based on their symptoms. 
        Remember: <strong>Airway, Breathing, Circulation</strong> take priority!
      </p>

      {availablePatients.length > 0 && (
        <div>
          <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: '#00d9ff' }}>
            Incoming Patients:
          </h4>
          <div className="triage-container">
            {availablePatients.map(patient => (
              <div
                key={patient.id}
                className="patient-card"
                draggable
                onDragStart={() => handleDragStart(patient)}
              >
                <div className="patient-info">
                  <span className="patient-icon">{patient.icon}</span>
                  <span className="patient-name">{patient.name}</span>
                </div>
                <div className="patient-symptoms">{patient.symptoms}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <h4 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.1rem', color: '#00d9ff' }}>
        Priority Zones:
      </h4>
      
      <div className="priority-zones">
        <div
          className="priority-zone critical"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'critical')}
        >
          <h4 style={{ color: '#ff006e' }}>🚨 CRITICAL</h4>
          <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '1rem' }}>
            Life-threatening, immediate care
          </p>
          {zones.critical.map(patient => (
            <div
              key={patient.id}
              className={`patient-card ${submitted ? (patient.correctZone === 'critical' ? 'found' : 'missed') : ''}`}
              onClick={() => !submitted && handleRemoveFromZone(patient, 'critical')}
              style={{ marginBottom: '0.5rem', cursor: submitted ? 'default' : 'pointer' }}
            >
              <div className="patient-info">
                <span className="patient-icon">{patient.icon}</span>
                <span className="patient-name">{patient.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div
          className="priority-zone urgent"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'urgent')}
        >
          <h4 style={{ color: '#ffbe0b' }}>⚠️ URGENT</h4>
          <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '1rem' }}>
            Serious, needs prompt attention
          </p>
          {zones.urgent.map(patient => (
            <div
              key={patient.id}
              className={`patient-card ${submitted ? (patient.correctZone === 'urgent' ? 'found' : 'missed') : ''}`}
              onClick={() => !submitted && handleRemoveFromZone(patient, 'urgent')}
              style={{ marginBottom: '0.5rem', cursor: submitted ? 'default' : 'pointer' }}
            >
              <div className="patient-info">
                <span className="patient-icon">{patient.icon}</span>
                <span className="patient-name">{patient.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div
          className="priority-zone stable"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'stable')}
        >
          <h4 style={{ color: '#06ffa5' }}>✓ STABLE</h4>
          <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '1rem' }}>
            Non-emergency, can wait
          </p>
          {zones.stable.map(patient => (
            <div
              key={patient.id}
              className={`patient-card ${submitted ? (patient.correctZone === 'stable' ? 'found' : 'missed') : ''}`}
              onClick={() => !submitted && handleRemoveFromZone(patient, 'stable')}
              style={{ marginBottom: '0.5rem', cursor: submitted ? 'default' : 'pointer' }}
            >
              <div className="patient-info">
                <span className="patient-icon">{patient.icon}</span>
                <span className="patient-name">{patient.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {allPatientsPlaced && !submitted && (
        <button className="submit-button" onClick={handleSubmit}>
          Submit Triage Assessment
        </button>
      )}

      {results && (
        <div className="activity-complete">
          <div className="activity-complete-title">
            {results.score >= 80 ? '✓ Excellent Triage!' : results.score >= 60 ? '✓ Good Work!' : '✓ Complete!'}
          </div>
          <div className="activity-score">
            Correct: {results.correct}/{results.total} patients • Score: {results.score} points
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientTriage;
