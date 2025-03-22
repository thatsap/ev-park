// src/components/DistancePopup.tsx
import React, { useState } from 'react';
import { useMainContext } from '../../hook/useMainContext'; // Changed to named import
import './DistancePopup.css';
import { observer } from 'mobx-react-lite';

interface DistancePopupProps {
  onSubmit: (distance: string) => void; // Callback to pass distance to parent
  onClose: () => void; // Callback to close the popup
}

const DistancePopup: React.FC<DistancePopupProps> = observer(() => {
  const { viewManager, rideManager } = useMainContext();
  const [distance, setDistance] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!distance) {
      alert('Please enter a valid distance greater than 0');
      return;
    }
    console.log(distance);
    rideManager.setRideDistanceByUser(distance);
    viewManager.setDistance(false);
    viewManager.setViewVehicles(true);

    // onSubmit(distance);
    // onClose(viewManager.setDistance(false));
  };

  return (
    <div className="distance-overlay">
      <div className="distance-popup">
        <button
          className="close-button"
          onClick={() => viewManager.setDistance(false)}>
          ×
        </button>
        <div className="distance-header">
          <h2>Enter Trip Distance</h2>
        </div>
        <form className="distance-form" onSubmit={handleSubmit}>
          <label htmlFor="distance-input">Distance (km):</label>
          <input
            id="distance-input"
            type="number"
            value={distance}
            onChange={(e) => setDistance(parseFloat(e.target.value))}
            placeholder="e.g., 12"
          />
          <button type="submit" className="submit-button">
            Start Ride
          </button>
        </form>
      </div>
    </div>
  );
});

export default DistancePopup;
