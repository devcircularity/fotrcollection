import { useCallback, useState } from 'react';
import { mutate } from 'swr';

import { CartService } from '@/services';

interface InitialState {
  removingFromCart: boolean;
  error: null | string;
}

const useRemoveItem = () => {
  const initialState: InitialState = {
    removingFromCart: false,
    error: null,
  };

  const [status, setStatus] = useState(initialState);

  const { removingFromCart, error } = status;

  const removeFromCart = useCallback(
    async (productId: string) => {
      setStatus({ ...status, removingFromCart: true });
      try {
        await CartService.removeCartItem(productId);
        mutate('/api/cart');
        setStatus({ removingFromCart: false, error: null });
      } catch (err) {
        if (err instanceof Error) {
          setStatus({ removingFromCart: false, error: err.message });
        } else {
          setStatus({ removingFromCart: false, error: 'An unknown error occurred' });
        }
      }
    },
    [status]
  );

  return { removeFromCart, removingFromCart, error };
};

export default useRemoveItem;
