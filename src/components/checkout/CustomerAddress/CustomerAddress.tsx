'use client';

import React, { useState } from 'react';

interface Address {
  name: string;
  details: string;
  phone: string;
}

interface CustomerAddressProps {
  addresses: Address[];
  onEdit: (address: Address) => void;
  onAdd: () => void;
}

const CustomerAddress: React.FC<CustomerAddressProps> = ({ addresses, onEdit, onAdd }) => {
  const [selectedAddress, setSelectedAddress] = useState<Address>(addresses[0]);

  return (
    <div>
      <h3>1. CUSTOMER ADDRESS</h3>
      <div className="address-selection">
        {addresses.map((address, index) => (
          <div key={index} className={`address-item ${selectedAddress === address ? 'selected' : ''}`}>
            <input
              type="radio"
              id={`address-${index}`}
              name="address"
              checked={selectedAddress === address}
              onChange={() => setSelectedAddress(address)}
            />
            <label htmlFor={`address-${index}`}>
              <strong>{address.name}</strong>
              <p>{address.details}</p>
              <p>{address.phone}</p>
            </label>
            <button onClick={() => onEdit(address)}>Edit</button>
          </div>
        ))}
        <button onClick={onAdd}>Add Address</button>
      </div>
    </div>
  );
};

export default CustomerAddress;
