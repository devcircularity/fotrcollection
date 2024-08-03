import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PESA_API_URL = process.env.PESAPAL_BASE_URL;

export const authenticatePesapal = async () => {
  try {
    const response = await axios.post(`${PESA_API_URL}/Auth/RequestToken`, {
      consumer_key: process.env.PESAPAL_CONSUMER_KEY,
      consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
    });
    return response.data.token;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Pesapal authentication failed:', error.response ? error.response.data : error.message);
    } else {
      console.error('Pesapal authentication failed:', error);
    }
    throw new Error('Pesapal authentication failed');
  }
};

export const submitPesapalOrder = async (token: string, userId: string, requestBody: any) => {
  try {
    const response = await axios.post(`${PESA_API_URL}/Transactions/SubmitOrderRequest`, requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Pesapal order submission failed:', error.response ? error.response.data : error.message);
    } else {
      console.error('Pesapal order submission failed:', error);
    }
    throw new Error('Pesapal order submission failed');
  }
};
