import { useCallback, useState } from 'react';
import { mutate } from 'swr';

import { WishlistService } from '@/services';

interface InitialState {
  addingToWishlist: boolean;
  error: null | string;
}

const useAddItem = () => {
  const initialState: InitialState = {
    addingToWishlist: false,
    error: null,
  };

  const [status, setStatus] = useState(initialState);

  const { addingToWishlist, error } = status;

  const addToWishlist = useCallback(
    async (productId: string) => {
      setStatus({ ...status, addingToWishlist: true });
      try {
        await WishlistService.addWishlistItem(productId);
        mutate('/api/wishlist');
        setStatus({ addingToWishlist: false, error: null });
      } catch (err) {
        if (err instanceof Error) {
          setStatus({ addingToWishlist: false, error: err.message });
        } else {
          setStatus({ addingToWishlist: false, error: 'An unknown error occurred' });
        }
      }
    },
    [status]
  );

  return { addToWishlist, addingToWishlist, error };
};

export default useAddItem;
