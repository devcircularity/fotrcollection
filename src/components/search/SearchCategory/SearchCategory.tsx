// src/components/search/SearchCategory.tsx
'use client';

import React from 'react';
import { useCategory } from '@/contexts/CategoryContext';
import styles from './SearchCategory.module.css';

interface Props {
  active: string;
  onChangeTab(active: string): void;
}

const SearchCategory = ({ active, onChangeTab }: Props) => {
  const { categories, loading, error } = useCategory();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.tab}>
      {categories.map((category) => (
        <button
          key={category._id}
          type="button"
          className={`${styles.list} ${active === category._id ? styles.active : ''}`}
          onClick={() => onChangeTab(category._id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default SearchCategory;
