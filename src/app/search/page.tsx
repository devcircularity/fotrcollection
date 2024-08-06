'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchBar, Meta, MobileBottomMenu } from '@/components/core';
import { ProductList, ProductListSkeleton } from '@/components/product';
import { SearchFilter, SearchCategory } from '@/components/search';
import { Container, ErrorMessage } from '@/components/ui';
import useSearch from '@/hooks/search/use-search';
import styles from '@/styles/Search.module.css';

const SearchContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '';

  const { data, error, isLoading } = useSearch({
    category,
    gender: searchParams.get('gender') || undefined,
  });

  const products = data || [];

  const handleTabChange = (selected: string) => {
    let updatedQuery = { ...Object.fromEntries(searchParams.entries()) };

    if (selected === 'men') {
      updatedQuery = { ...updatedQuery, gender: 'men' };
    } else if (selected === 'women') {
      updatedQuery = { ...updatedQuery, gender: 'women' };
    } else {
      updatedQuery = { ...updatedQuery, category: selected };
    }

    router.push(`/search?${new URLSearchParams(updatedQuery).toString()}`);
  };

  const handleFilterChange = (selected: string) => {
    router.push(`/search?${new URLSearchParams({ ...Object.fromEntries(searchParams.entries()), sort: selected }).toString()}`);
  };

  const handleSearchSubmit = (searchText: string) => {
    router.push(`/search?keyword=${searchText}`);
  };

  if (isLoading) {
    return (
      <>
        <Meta title="Search" />
        <Container>
          <div className={styles.searchBarContainer}>
            <SearchBar onSubmit={handleSearchSubmit} style={{ width: '100%' }} isFocus />
          </div>
          <div className={styles.sortContainer}>
            <SearchCategory active={category} onChangeTab={handleTabChange} />
            <SearchFilter handleChange={handleFilterChange} active={sort} />
          </div>
          <ProductListSkeleton number={12} />
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Meta title="Search" />
        <Container>
          <ErrorMessage message="Cannot search product at this moment. Please try again" />
        </Container>
      </>
    );
  }

  return (
    <>
      <Meta title="Search" />
      <Container>
        {products.length ? (
          <>
            <div className={styles.searchBarContainer}>
              <SearchBar onSubmit={handleSearchSubmit} style={{ width: '100%' }} isFocus />
            </div>
            <div className={styles.sortContainer}>
              <SearchCategory active={category} onChangeTab={handleTabChange} />
              <SearchFilter handleChange={handleFilterChange} active={sort} />
            </div>
            <ProductList products={products} />
          </>
        ) : (
          <div className={styles.message}>No products found.</div>
        )}
        <MobileBottomMenu />
      </Container>
    </>
  );
};

const Search = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
};

export default Search;
