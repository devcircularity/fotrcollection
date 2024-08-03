import React from 'react';
import Router, { useRouter } from 'next/router';
import { SearchBar, Meta, MobileBottomMenu } from '@/components/core';
import { ProductList, ProductListSkeleton } from '@/components/product';
import { SearchFilter, SearchCategory } from '@/components/search';
import { Container, ErrorMessage } from '@/components/ui';
import useSearch from '@/hooks/search/use-search';
import styles from '@/styles/Search.module.css';

const Search = () => {
  const { query, pathname } = useRouter();
  const category = query.category as string;
  const sort = query.sort as string;

  const { data, error, isLoading } = useSearch({
    category,
    gender: query.gender as string | undefined,
  });

  const products = data || [];

  const handleTabChange = (selected: string) => {
    let updatedQuery = { ...query };

    if (selected === 'men') {
      updatedQuery = { ...updatedQuery, gender: 'men' };
    } else if (selected === 'women') {
      updatedQuery = { ...updatedQuery, gender: 'women' };
    }

    Router.push({ pathname, query: updatedQuery });
  };

  const handleFilterChange = (selected: string) => {
    Router.push({ pathname, query: { ...query, sort: selected } });
  };

  const handleSearchSubmit = (searchText: string) => {
    Router.push(`/search?keyword=${searchText}`);
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

export default Search;
