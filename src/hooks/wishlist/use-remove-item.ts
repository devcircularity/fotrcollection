import { useCallback, useState } from 'react';
import { mutate } from 'swr';

import { WishlistService } from '@/services';

interface InitialState {
  removingToWishlist: boolean;
  error: null | string;
}

const useRemoveItem = () => {
  const initialState: InitialState = {
    removingToWishlist: false,
    error: null,
  };

  const [status, setStatus] = useState(initialState);

  const { removingToWishlist, error } = status;

  const removeToWishlist = useCallback(
    async (productId: string) => {
      setStatus({ ...status, removingToWishlist: true });
      try {
        await WishlistService.removeWishlistItem(productId);
        mutate('/api/wishlist');
        setStatus({ removingToWishlist: false, error: null });
      } catch (err) {
        if (err instanceof Error) {
          setStatus({ removingToWishlist: false, error: err.message });
        } else {
          setStatus({ removingToWishlist: false, error: 'An unknown error occurred' });
        }
      }
    },
    [status]
  );

  return { removeToWishlist, removingToWishlist, error };
};

export default useRemoveItem;
