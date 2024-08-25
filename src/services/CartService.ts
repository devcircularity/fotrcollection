import { Cart, CartItem } from '@/types';
import apiClient from '@/utils/apiClient';
import { catchError } from '@/utils/catchError';

// Fetch the current cart
const getCart = async (): Promise<Cart> => {
  try {
    const { data } = await apiClient.get(`/cart`);
    return data.data;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

// Add an item to the cart
const addCartItem = async (productId: string, quantity: number): Promise<CartItem> => {
  try {
    const url = `/cart`;
    const payload = { quantity, productId };
    const { data } = await apiClient.post(url, payload);
    return data.data;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

// Remove an item from the cart
const removeCartItem = async (productId: string): Promise<void> => {
  try {
    return await apiClient.delete('/cart', { data: { productId } });
  } catch (error) {
    throw new Error(catchError(error));
  }
};

// Update the quantity of a cart item
const updateQuantityCarItem = async (productId: string, quantity: number): Promise<void> => {
  try {
    return await apiClient.put('/cart', { productId, quantity });
  } catch (error) {
    throw new Error(catchError(error));
  }
};

// Get the total number of items in the cart
const getCartItemCount = async (): Promise<number> => {
  try {
    const cart = await getCart();
    // Calculate the total number of items in the cart
    const totalCount = cart.items.reduce((total, item) => total + item.quantity, 0);
    return totalCount;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const CartService = {
  getCart,
  addCartItem,
  removeCartItem,
  updateQuantityCarItem,
  getCartItemCount,  // Export the new function
};
