import { useSearchParams, usePathname } from 'next/navigation';
import useSWR from 'swr';
import { ProductService } from '@/services';
import { Product } from '@/types';

interface Params {
  category?: string;
  sort?: string;
  keyword?: string;
  gender?: string;
}

// Define the fetcher function
const fetchProducts = async (params: string): Promise<Product[]> => {
  const parsedParams = JSON.parse(params);
  return ProductService.getProducts({ ...parsedParams, limit: 12 });
};

const useSearch = ({ category, sort, keyword, gender }: Params) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Combine the search parameters with the provided parameters
  const combinedQuery = {
    ...Object.fromEntries(searchParams.entries()),
    category,
    sort,
    keyword,
    gender,
  };

  const value = pathname ? JSON.stringify(combinedQuery) : null;

  // Use the fetcher function in useSWR
  const { data, error } = useSWR(value, fetchProducts);

  const isLoading = !data && !error;

  return {
    data,
    error,
    isLoading,
  };
};

export default useSearch;
