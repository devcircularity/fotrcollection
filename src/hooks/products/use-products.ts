'use client';

import axios from 'axios';
import { useState } from 'react';
import { Product } from '@/types';
import { API_URL, PAGE_LIMIT as PAGE_SIZE } from '@/utils/constants'; // Make sure this path is correct

const useProducts = (initialData: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialData);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(initialData.length === PAGE_SIZE);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState<boolean>(false);
  const [page, setPage] = useState<number>(2); // Start from 2 as the first page is already loaded

  const fetchProducts = async (page: number) => {
    try {
      const response = await axios.get(`${API_URL}/products?page=${page}&limit=${PAGE_SIZE}`);

      console.log('Full response:', response); // Debugging log
      console.log('Response data:', response.data); // Log the actual response data

      const newProducts = response.data.data.products || [];

      if (!Array.isArray(newProducts)) {
        throw new Error('Fetched data is not an array');
      }

      console.log('Fetched products:', newProducts); // Debugging log

      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setHasNextPage(newProducts.length === PAGE_SIZE);
    } catch (error) {
      console.error('Error fetching products:', error); // Debugging log
      setError('Failed to fetch products');
    }
  };

  const fetchNextPage = async () => {
    if (!hasNextPage) return;
    setIsFetchingNextPage(true);
    await fetchProducts(page);
    setPage((prevPage) => prevPage + 1);
    setIsFetchingNextPage(false);
  };

  return {
    products,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
};

export default useProducts;
