'use client';

import React, { useState } from 'react';

interface DeliveryOption {
  name: string;
  details: string;
  dateRange: string;
}

interface DeliveryDetailsProps {
  deliveryOptions: DeliveryOption[];
  onSelect: (option: DeliveryOption) => void;
}

const DeliveryDetails: React.FC<DeliveryDetailsProps> = ({ deliveryOptions, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<DeliveryOption>(deliveryOptions[0]);

  return (
    <div>
      <h3>2. DELIVERY DETAILS</h3>
      <div className="delivery-options">
        {deliveryOptions.map((option, index) => (
          <div key={index} className={`delivery-item ${selectedOption === option ? 'selected' : ''}`}>
            <input
              type="radio"
              id={`delivery-${index}`}
              name="delivery"
              checked={selectedOption === option}
              onChange={() => {
                setSelectedOption(option);
                onSelect(option);
              }}
            />
            <label htmlFor={`delivery-${index}`}>
              <strong>{option.name}</strong>
              <p>{option.details}</p>
              <p>{option.dateRange}</p>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryDetails;
