import apiClient from '@/utils/apiClient';
import { catchError } from '@/utils/catchError';
import { Order } from '@/types/Order';

const getOrders = async (): Promise<Order[]> => {
  try {
    const { data } = await apiClient.get('/orders');
    return data.data;
  } catch (error: unknown) {
    throw new Error(catchError(error));
  }
};

export const OrderService = {
  getOrders,
};
