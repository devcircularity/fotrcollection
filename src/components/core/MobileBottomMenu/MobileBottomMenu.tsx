'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FiHome, FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';

import useCart from '@/hooks/cart/use-cart';
import useUser from '@/hooks/user/use-user';

import styles from './MobileBottomMenu.module.css';

const MobileBottomMenu = () => {
  const pathname = usePathname();
  const { data: currentUser } = useUser();

  const { data } = useCart();

  return (
    <div className={styles.bottomMenu}>
      <div className={`${styles.list} ${pathname === '/' ? styles.active : ''}`}>
        <Link href="/" className={styles.link}>
          <div className={styles.icon}>
            <FiHome />
          </div>
          <span className={styles.title}> Home </span>
        </Link>
      </div>
      <div className={`${styles.list} ${pathname === '/search' ? styles.active : ''}`}>
        <Link href="/search" className={styles.link}>
          <div className={styles.icon}>
            <FiSearch />
          </div>
          <span className={styles.title}> Search </span>
        </Link>
      </div>
      <div className={`${styles.list} ${pathname === '/cart' ? styles.active : ''}`}>
        <Link href="/cart" className={styles.link}>
          <div className={styles.icon}>
            <FiShoppingCart />
            {data && data.items.length > 0 && (
              <span className={styles.cartNum}>{data.items.length}</span>
            )}
          </div>
          <span className={styles.title}> Cart </span>
        </Link>
      </div>
      <div className={`${styles.list} ${pathname === '/profile' ? styles.active : ''}`}>
        <Link href={`${currentUser ? '/profile' : '/login'}`} className={styles.link}>
          <div className={styles.icon}>
            <FiUser />
          </div>
          <span className={styles.title}> Profile </span>
        </Link>
      </div>
    </div>
  );
};

export default MobileBottomMenu;
