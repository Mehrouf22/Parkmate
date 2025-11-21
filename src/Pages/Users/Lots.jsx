import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Lots.css';

const Lots = () => {
  const navigate = useNavigate();
  const [lots, setLots] = useState([]);

  useEffect(() => {
    // Load lots from owner configuration
    const loadLots = () => {
      try {
        const stored = localStorage.getItem('parkmate_lots_config');
        if (stored) {
          setLots(JSON.parse(stored));
        } else {
          // Default lots if no config exists
          setLots([
            { id: 1, name: 'Lot 1', totalSlots: 10, location: 'Main Street' },
            { id: 2, name: 'Lot 2', totalSlots: 10, location: 'Downtown' },
            { id: 3, name: 'Lot 3', totalSlots: 10, location: 'Airport Road' },
          ]);
        }
      } catch (e) {
        console.error('Error loading lots:', e);
      }
    };

    loadLots();

    // Listen for configuration changes
    const handleConfigChange = () => loadLots();
    window.addEventListener('lotConfigChanged', handleConfigChange);

    return () => window.removeEventListener('lotConfigChanged', handleConfigChange);
  }, []);

  return (
    <div className='Lot'>
      <div className="lot-card-container">
        <div className="lot-image-wrapper">
          <img src="src/assets/imgd/Screenshot 2025-11-15 042022.png" alt="Parking Lot Map" />
          <div className="lot-overlay">
            <div className="lot-actions">
              {lots.map(lot => (
                <button
                  key={lot.id}
                  className="btn primary"
                  onClick={() => navigate(`/lots/${lot.id}`)}
                >
                  {lot.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lots;
