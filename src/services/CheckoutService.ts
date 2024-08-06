import apiClient from '@/utils/apiClient';
import { catchError } from '@/utils/catchError';

interface PaypalTransaction {
  orderID: string;
}

export const stripeCharge = async (paymentMethodId: string) => {
  try {
    const url = `/checkout/create-stripe-charge`;
    const { data } = await apiClient.post(url, { paymentMethodId });
    return data.data;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const createPaypalTransaction = async (): Promise<PaypalTransaction> => {
  try {
    const url = `/checkout/create-paypal-transaction`;
    const { data } = await apiClient.post(url);

    const paypalTransaction: PaypalTransaction = {
      orderID: data.data.orderID,
    };

    return paypalTransaction;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const capturePaypalTransaction = async (orderID: string): Promise<void> => {
  try {
    const url = `/checkout/capture-paypal-transaction`;
    return await apiClient.post(url, { orderID });
  } catch (error) {
    throw new Error(catchError(error));
  }
};
export const createPesapalTransaction = async (): Promise<{
  order_tracking_id: string;
  redirect_url: string;
}> => {
  try {
    const url = `/checkout/create-pesapal-transaction`;
    const { data } = await apiClient.post(url);

    // Log the entire response to the console for debugging
    console.log('Pesapal Transaction:', data);

    const { order_tracking_id, redirect_url } = data.data; // Adjust to match the structure

    return {
      order_tracking_id,
      redirect_url,
    };
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const CheckOutService = {
  createPaypalTransaction,
  capturePaypalTransaction,
  stripeCharge,
  createPesapalTransaction, // Add this line
};
