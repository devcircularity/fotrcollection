'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaShareAlt } from 'react-icons/fa';

import { WishlistButton } from '@/components/wishlist';
import { Product } from '@/types';
import formatPrice from '@/utils/formatPrice';
import ShareModal from './ShareModal';

import styles from './ProductCard.module.css';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShareModalOpen(true);
  };

  const handleCloseModal = () => {
    setShareModalOpen(false);
  };

  return (
    <>
      <Link href={`/products/${product._id}`} className={styles.productLink}>
        <div className={styles.productCard}>
          <div className={styles.productImgWrapper}>
            <Image src={product.imageURL} alt={product.name} layout="fill" objectFit="cover" />
            <div className={styles.wishlistButtonContainer}>
              <WishlistButton productId={product._id} />
            </div>
          </div>
          <div className={styles.productInfo}>
            <div>
              <div className={styles.productName}>{product.name}</div>
              <div className={styles.productPrice}>{formatPrice(product.price)}</div>
            </div>
            <button onClick={handleShareClick} className={styles.shareButton}>
              <FaShareAlt />
            </button>
          </div>
        </div>
      </Link>
      <ShareModal open={isShareModalOpen} onClose={handleCloseModal} productId={product._id} />
    </>
  );
};

export default ProductCard;
