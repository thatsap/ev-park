import React, { useEffect } from 'react';
import { useMainContext } from '../hook/useMainContext'; // Changed to named import
import './BillingPopup.css';
import { observer } from 'mobx-react-lite';

interface BillingData {
  basicFare: string;
  surgeCharge: string;
  penaltyCharge: string;
  subTotal: string;
  gst: string;
  finalFare: string;
  currency: string;
}

interface BillingPopupProps {
  billing: BillingData | null;
}

const BillingPopup: React.FC<BillingPopupProps> = observer(({ billing }) => {
  const { viewManager } = useMainContext();

  if (!billing) return null;

  const handlePayNow = () => {
    alert('Payment processing... (Demo)');
    viewManager.setViewFareDetails(false);
  };

  return (
    <div className="billing-overlay">
      <div className="billing-popup">
        <button
          className="close-button"
          onClick={() => viewManager.setViewFareDetails(false)}>
          ×
        </button>
        <div className="billing-header">
          <h2>Billing Summary</h2>
        </div>
        <div className="billing-details">
          <div className="bill-row">
            <span className="bill-label">Basic Fare</span>
            <span className="bill-amount">
              {billing.currency} {billing.basicFare}
            </span>
          </div>
          <div className="bill-row">
            <span className="bill-label">Surge Charge</span>
            <span className="bill-amount">
              {billing.currency} {billing.surgeCharge}
            </span>
          </div>
          <div className="bill-row">
            <span className="bill-label">Penalty Charge</span>
            <span className="bill-amount">
              {billing.currency} {billing.penaltyCharge}
            </span>
          </div>
          <div className="bill-row subtotal">
            <span className="bill-label">Subtotal</span>
            <span className="bill-amount">
              {billing.currency} {billing.subTotal}
            </span>
          </div>
          <div className="bill-row">
            <span className="bill-label">GST (18%)</span>
            <span className="bill-amount">
              {billing.currency} {billing.gst}
            </span>
          </div>
          <div className="bill-row total">
            <span className="bill-label">Total</span>
            <span className="bill-amount">
              {billing.currency} {billing.finalFare}
            </span>
          </div>
          <button className="pay-now-button" onClick={handlePayNow}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
});

export default BillingPopup;
