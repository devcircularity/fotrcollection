import React, { useState } from 'react';

import { CheckOutService } from '@/services';

import styles from './CheckoutPesapal.module.css';

interface PesapalCheckoutProps {
  onError: (errorMessage: string) => void;
}

const PesapalCheckout: React.FC<PesapalCheckoutProps> = ({ onError }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePesapalCheckout = async () => {
    try {
      setIsLoading(true);
      const { order_tracking_id } = await CheckOutService.createPesapalTransaction();
      const redirectUrl = `https://cybqa.pesapal.com/pesapaliframe/PesapalIframe3/Index?OrderTrackingId=${order_tracking_id}`;
      // Simulate delay for demonstration purposes (remove this in your actual code)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      window.location.href = redirectUrl;
    } catch (error) {
      const errorMessage =
        typeof error === 'string' ? error : 'Error initiating Pesapal payment. Please try again.';
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button className={styles.pesapalButton} onClick={handlePesapalCheckout} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Pay with Pesapal'}
      </button>
    </div>
  );
};

export default PesapalCheckout;
