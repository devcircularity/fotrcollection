// lib/pesapal.ts

import axios from 'axios';

const BASE_URL = process.env.PESAPAL_BASE_URL;

export const authenticatePesapal = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/Auth/RequestToken`,
        {
          consumer_key: process.env.PESAPAL_CONSUMER_KEY,
          consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
        },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
  
      return response.data.token;
    } catch (error) {
      throw new Error('Pesapal Authentication Error');
    }
  };

  export const submitPesapalOrder = async (token: string, userId: string, requestBody: any) => {
    try {
      const response = await axios.post(
        'https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest',
        requestBody,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      return response.data;
    } catch (error) {
      throw new Error('Pesapal Submit Order Error');
    }
  };
