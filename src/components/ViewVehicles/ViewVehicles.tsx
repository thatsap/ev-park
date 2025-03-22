import React from 'react';
import { useMainContext } from '../../hook/useMainContext'; // Fixed to default import
import './ViewVehicles.css';
import { EvInfo } from '../../types';
import { observer } from 'mobx-react-lite';
import { Utils } from '../../utils/Utils';

const ViewVehicles = observer(() => {
  const { viewManager, apiManager, rideManager, mapManager } = useMainContext(); // Use default import

  const [vehicles, setVehicles] = React.useState<EvInfo[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchVehicles = async () => {
      try {
        let vehicles = (await apiManager.fetchEvs()) as EvInfo[];
        vehicles = vehicles.filter(
          (vehicle) => vehicle.range > rideManager.rideDistanceByUser * 1.2,
        );
        setVehicles(vehicles);
        setIsLoading(false);
      } catch (error) {
        setError('Failed to fetch vehicles');
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, [viewManager.viewVehicles]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (vehicles.length === 0) {
    return <div>No vehicles available</div>;
  }

  const currentVehicle = vehicles[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, vehicles.length - 1));
  };

  const handleSelectEV = () => {
    console.log(`Selected vehicle: ${currentIndex + 1}`);
    const uuid = Utils.getUuid();
    apiManager.addWorker(uuid, currentVehicle.id, Date.now());
    viewManager.setViewVehicles(false);
    mapManager.runAnimation();
  };

  return (
    <div className="vehicle-display">
      <div className="image-section">
        <button
          className="arrow left-arrow"
          onClick={handlePrev}
          disabled={currentIndex === 0}>
          ←
        </button>
        <img
          src={`/evImages/${currentVehicle.image}`}
          alt="Vehicle"
          className="vehicle-image"
        />
        <button
          className="arrow right-arrow"
          onClick={handleNext}
          disabled={currentIndex === vehicles.length - 1}>
          →
        </button>
      </div>
      <div className="features-section">
        <h2>Features</h2>
        <ul>
          <li>Range: {currentVehicle.range}</li>
          <li>Charging: {currentVehicle.chargingStatus ? 'Yes' : 'No'}</li>
          <li>Cost/km: {currentVehicle.costToKm}</li>
          <li>Max Range: {currentVehicle.maxRange}</li>
          {/* <li>Bluetooth Music: {currentVehicle.bluetooth ? 'Yes' : 'No'}</li>
          <li>Phone Charging: {currentVehicle.phoneCharging ? 'Yes' : 'No'}</li> */}
        </ul>
        <button className="select-ev-btn" onClick={handleSelectEV}>
          <span className="btn-text">Select EV</span>
        </button>

        <style jsx>{`
          .select-ev-btn {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .select-ev-btn:hover {
            background-color: #0056b3;
          }

          .select-ev-btn:focus {
            outline: 2px solid #007bff;
            outline-offset: 2px;
          }

          .btn-text {
            font-size: 1rem;
            font-weight: 600;
          }
        `}</style>
      </div>
    </div>
  );
});

export default ViewVehicles;
