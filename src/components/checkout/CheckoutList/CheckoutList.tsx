import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { CartItem } from '@/types';
import formatPrice from '@/utils/formatPrice';

import styles from './CheckoutList.module.css';

interface Props {
  items: CartItem[];
}

const CheckoutList = ({ items }: Props) => {
  return (
    <>
      {items.map((item) => {
        // Use the first image in the array or fallback to imageURL
        const imageUrl = item.product.images && item.product.images.length > 0
          ? item.product.images[0]
          : item.product.imageURL;

        return (
          <div key={item._id} className={styles.itemContainer}>
            <div className={styles.info}>
              <div className={styles.main}>
                <Link href={`/products/${item.product._id}`}>
                  <Image
                    className={styles.image}
                    src={imageUrl || ''}
                    alt={item.product.name}
                    width={120}
                    height={120}
                  />
                </Link>

                <div className={styles.right}>
                  <Link href={`/products/${item.product._id}`}>
                    <p className={styles.productName}>{item.product.name}</p>
                  </Link>
                  <p className={styles.qty}>x {item.quantity}</p>
                </div>
              </div>

              <div className={styles.content}>
                <div className={styles.price}>{formatPrice(item.product.price)}</div>
              </div>
              <div className={styles.content} style={{ textAlign: 'right' }}>
                <div className={styles.orderTotal}>
                  {formatPrice(item.product.price * item.quantity)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CheckoutList;
