import { observer } from 'mobx-react-lite';
import { NavBar } from './NavBar/NavBar';
import { SideBar } from '../UiState/SideBar/SideBar';
import ViewVehicles from '../../components/ViewVehicles/ViewVehicles';
import BillingPopup from '../../components/BillingPopup';
import DistancePopup from '../../components/DistancePopup/DistancePopup';
import { useMainContext } from '../../hook/useMainContext';
import { useState, useEffect } from 'react';
import './UiComp.css';

interface BillingData {
  basicFare: string;
  surgeCharge: string;
  penaltyCharge: string;
  subTotal: string;
  gst: string;
  finalFare: string;
  currency: string;
}

export const UiComp = observer(() => {
  const { viewManager, mapManager, apiManager, rideManager } = useMainContext();
  const [billing, setBilling] = useState<BillingData | null>(null);

  useEffect(() => {
    const fetchBillingDetails = async () => {
      try {
        if (rideManager.rideId) {
          const response = await apiManager.getBillingDetails(
            rideManager.rideId,
          );
          console.log(response);
          setBilling(response as BillingData);
          viewManager.setViewFareDetails(true);
        }
      } catch (error) {
        console.error('Error fetching billing details:', error);
      }
    };

    fetchBillingDetails();
  }, [mapManager.triggerBillingDetails]);

  return (
    <>
      {/* <SideBar /> */}
      <NavBar />
      {viewManager.viewVehicles && (
        <div className="popup-container">
          <div
            className="popup-backdrop"
            onClick={() => viewManager.setViewVehicles(false)}
          />
          <div className="popup-content">
            <ViewVehicles />
          </div>
        </div>
      )}
      {viewManager.viewFareDetails && (
        <div className="popup-container">
          <div
            className="popup-backdrop"
            onClick={() => viewManager.setViewFareDetails(false)}
          />
          <div className="popup-content">
            <BillingPopup billing={billing} />
          </div>
        </div>
      )}
      {viewManager.distance && (
        <div className="popup-container">
          <div
            className="popup-backdrop"
            onClick={() => viewManager.setDistance(false)}
          />
          <div className="popup-content">
            <DistancePopup />
          </div>
        </div>
      )}
    </>
  );
});
