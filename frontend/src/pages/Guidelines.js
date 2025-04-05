import React, { useState } from 'react';
import './Guidelines.css';

const Guidelines = () => {
  const [activeSection, setActiveSection] = useState('general');

  const sections = {
    general: {
      title: 'General Guidelines',
      content: [
        'Always wear appropriate PPE when handling medical images',
        'Ensure proper lighting conditions for image capture',
        'Maintain patient privacy and data security',
        'Follow standard imaging protocols'
      ]
    },
    upload: {
      title: 'Upload Guidelines',
      content: [
        'Use high-quality images with good resolution',
        'Ensure proper image orientation',
        'Include relevant patient history',
        'Remove any identifying information'
      ]
    },
    analysis: {
      title: 'Analysis Guidelines',
      content: [
        'Review AI analysis results carefully',
        'Consider multiple diagnostic possibilities',
        'Document any uncertainties',
        'Consult with specialists when needed'
      ]
    }
  };

  return (
    <div className="guidelines-container">
      <h1>Medical Image Analysis Guidelines</h1>
      <div className="guidelines-content">
        <div className="guidelines-nav">
          {Object.keys(sections).map(section => (
            <button
              key={section}
              className={`nav-button ${activeSection === section ? 'active' : ''}`}
              onClick={() => setActiveSection(section)}
            >
              {sections[section].title}
            </button>
          ))}
        </div>
        <div className="guidelines-section">
          <h2>{sections[activeSection].title}</h2>
          <ul>
            {sections[activeSection].content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Guidelines; 