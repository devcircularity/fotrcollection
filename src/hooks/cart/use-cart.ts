import useSWR from 'swr';
import useUser from '@/hooks/user/use-user';
import { CartService } from '@/services';

const useCart = () => {
  const { data: user } = useUser();
  const fetchKey = user ? '/api/cart' : null;

  const { data, error, mutate } = useSWR(fetchKey, CartService.getCart);

  const isLoading = !data && !error;

  return {
    data,
    isLoading,
    error,
    mutate,  // Add mutate function for manual cache updates
  };
};

export default useCart;
