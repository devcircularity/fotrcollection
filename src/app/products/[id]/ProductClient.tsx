'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { Meta, MobileBottomMenu } from '@/components/core';
import { ProductList, ProductInputQuantity } from '@/components/product';
import { PopUp, Container, Heading, ErrorMessage, Button } from '@/components/ui';
import WishlistButton from '@/components/wishlist/WishlistButton';
import { useToast } from '@/contexts';
import { usePopUp } from '@/hooks';
import useAddItem from '@/hooks/cart/use-add-item';
import useUser from '@/hooks/user/use-user';
import { Product as ProductTypes } from '@/types';
import formatPrice from '@/utils/formatPrice';
import styles from '@/styles/Product.module.css';

interface Props {
  product: ProductTypes | null;
  relatedProducts: ProductTypes[];
  error?: string;
}

const ProductClient = ({ product, relatedProducts, error }: Props) => {
  const [qty, setQty] = useState<string | number>(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State for current image index
  const { addToCart, addingToCart } = useAddItem();
  const { data: currentUser } = useUser();
  const { isOpen, showToast } = usePopUp();
  const { setToast } = useToast();
  const router = useRouter();

  const images = product?.images && product.images.length > 0 ? product.images : [product?.imageURL || '']; // Ensure fallback to an empty string

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds
      return () => clearInterval(interval);
    }
  }, [images.length]);

  if (error || !product) {
    return <ErrorMessage message={error || 'Product not found'} />;
  }

  const handleChangeInputQty = (value: string | number) => {
    if (Number(value) > 10) {
      setToast('error', 'Ops up to 10 max only');
      setQty(10);
      return;
    }
    setQty(value);
  };

  const handleButtonChangeQty = (action: string) => {
    if (action === 'add') {
      if (Number(qty) >= 10) {
        setToast('error', 'Ops you can add to cart up to 10 max only');
        return;
      }
      setQty((qty) => Number(qty) + 1);
    } else {
      if (Number(qty) > 1) setQty((qty) => Number(qty) - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      if (!currentUser) {
        setToast('error', 'Please log in first');
        return router.push(`/login?ref=${product._id}`);
      }
      await addToCart(product._id, Number(qty));
      showToast();
    } catch (error: any) {
      setToast('error', error.message);
    }
  };

  const handleChangeBlur = (val: string) => {
    if (!val) {
      setQty(1);
    }
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <Meta title={product.name} description={product.description} image={images[currentImageIndex] || ''} />
      <Container>
        <PopUp isOpen={isOpen} message={`Successfully added to cart`} />
        <div className={styles.productContainer}>
          <div className={styles.main}>
            <div className={styles.coverImg}>
              <Image
                className={styles.img}
                fill
                src={images[currentImageIndex] || ''} // Ensure fallback to an empty string
                alt={product.name || 'Product Image'}
              />
            </div>
          </div>
          <div className={styles.productInfo}>
            <div className={styles.productTopContainer}>
              <div className={styles.productName}>{product.name}</div>
              <div className={styles.wishlistButtonContainer}>
                <WishlistButton productId={product._id} />
              </div>
            </div>
            <div className={styles.productPrice}>{formatPrice(product.price)}</div>
            <div className={styles.productDesc}>{product.description}</div>
            <div className={styles.productAction}>
              <ProductInputQuantity
                value={qty}
                onButtonClick={handleButtonChangeQty}
                onChangeBlur={handleChangeBlur}
                onChangeInput={handleChangeInputQty}
              />
              <Button
                type="button"
                onClick={handleAddToCart}
                variant="primary"
                title="Add to Cart"
                className={styles.btnAddCart}
                disabled={addingToCart}
                loading={addingToCart}
              />
            </div>
            <div className={styles.imagePreviews}>
              {images.slice(0, 2).map((img, index) => (
                <div key={index} className={styles.preview} onClick={() => handleImageClick(index)}>
                  <Image src={img || ''} alt={`Preview ${index + 1}`} width={100} height={100} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Heading> Related Products </Heading>
        <ProductList products={relatedProducts} />
      </Container>
      <MobileBottomMenu />
    </>
  );
};

export default ProductClient;
