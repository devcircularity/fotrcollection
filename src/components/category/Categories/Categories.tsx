// src/components/category/Categories.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Category } from '@/types';
import styles from './Categories.module.css';

interface CategoriesProps {
  categories: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  const renderCategories = () => {
    return categories.map((category) => {
      const [firstWord, ...rest] = category.name.split(' ');
      const secondLine = rest.join(' ');

      return (
        <div key={category._id} className={styles.collageItem}>
          <Link href={`/search?category=${category._id}`} className={styles.categoryLink}>
            <div className={styles.categoryImgWrapper}>
              <Image
                alt={category.name}
                src={category.imageURL}
                layout="fill"
                objectFit="cover"
              />
              <div className={styles.descriptionOverlay}>
                <p className={styles.description}>{category.description}</p>
              </div>
            </div>
            <p className={styles.name}>
              {firstWord}
              <br />
              {secondLine}
            </p>
          </Link>
        </div>
      );
    });
  };

  return <div className={styles.collageContainer}>{renderCategories()}</div>;
};

export default Categories;
