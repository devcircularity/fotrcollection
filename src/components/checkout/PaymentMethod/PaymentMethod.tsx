'use client';

import React from 'react';
import { PesapalCheckout } from '@/components/checkout';  // Import your Pesapal component

interface PaymentMethodType {
  name: string;
  details: string;
}

interface PaymentMethodProps {
  paymentMethods: PaymentMethodType[];
  onSelect: (method: PaymentMethodType) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ paymentMethods, onSelect }) => {
  const handlePesapalClick = () => {
    // You can add any pre-payment validation or logging here
    console.log('Pesapal payment initiated');
    const pesapalButton = document.getElementById('pesapal-button') as HTMLButtonElement;
    if (pesapalButton) {
      pesapalButton.click();
    }
  };

  return (
    <div>
      <h3>3. PAYMENT METHOD</h3>
      <div className="payment-options">
        {paymentMethods.map((method, index) => (
          <div key={index} className="payment-item">
            <input
              type="radio"
              id={`payment-${index}`}
              name="payment"
              onChange={() => onSelect(method)}
            />
            <label htmlFor={`payment-${index}`}>
              <strong>{method.name}</strong>
              <p>{method.details}</p>
            </label>
          </div>
        ))}
        {/* Pesapal Payment Button */}
        <div className="payment-item">
          <PesapalCheckout onError={() => console.error('Pesapal error')} />
          <button
            id="pesapal-button"
            className="pesapal-button"
            onClick={handlePesapalClick}
            style={{ display: 'none' }} // Hide the actual Pesapal button
          >
            Pay with Pesapal
          </button>
          <button className="pesapal-initiator-button" onClick={handlePesapalClick}>
            Pay with Pesapal
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
