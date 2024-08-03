import { useRouter } from 'next/router';
import useSWR from 'swr';

import { ProductService } from '@/services';

interface Params {
  category?: string;
  sort?: string;
  keyword?: string;
  gender?: string; // Add gender parameter
}

const useSearch = ({ category, sort, keyword, gender }: Params) => {
  const { isReady, query } = useRouter();

  // Combine the query from the router with the provided parameters
  const combinedQuery = { ...query, category, sort, keyword, gender };


  const value = isReady ? ['/api/search', JSON.stringify(combinedQuery)] : null;

  const { data, error } = useSWR(value, (_, params) => {
    const parsedParams = JSON.parse(params);
    return ProductService.getProducts({ ...parsedParams, limit: 12 });
  });

  const isLoading = !data && !error;

  return {
    data,
    error,
    isLoading,
  };
};

export default useSearch;
