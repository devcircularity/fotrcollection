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
      const response = await CheckOutService.createPesapalTransaction();
      const { redirect_url } = response;
      // Simulate delay for demonstration purposes (remove this in your actual code)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (redirect_url) {
        window.location.href = redirect_url;
      } else {
        throw new Error('No redirect URL provided in Pesapal response');
      }
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
