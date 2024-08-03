import React, { useEffect, useState } from 'react';
import { CategoryService } from '@/services/CategoryService';
import { Category } from '@/types';
import styles from './SearchCategory.module.css';

interface Props {
  active: string;
  onChangeTab(active: string): void;
}

const SearchCategory = ({ active, onChangeTab }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await CategoryService.getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchCategories();
  }, []);

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
