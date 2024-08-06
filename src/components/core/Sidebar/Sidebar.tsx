'use client';

import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui';
import useLogout from '@/hooks/auth/use-logout';
import useUser from '@/hooks/user/use-user';
import { useCategory } from '@/contexts/CategoryContext'; // Import the useCategory hook
import styles from './Sidebar.module.css';

interface Props {
  isOpen: boolean;
  onClose(): void;
}

const Sidebar: React.FC<Props> = ({ isOpen, onClose }) => {
  const { data: currentUser } = useUser();
  const logout = useLogout();
  const { categories, loading, error } = useCategory();

  const handleClose = () => {
    onClose();
  };

  const handleLogOut = () => {
    logout();
    window.location.href = '/login';
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className={`${styles.sidebar} ${isOpen ? styles.isOpen : ''}`}>
        <div
          className={styles.list}
          role="link"
          tabIndex={-1}
          onClick={handleClose}
          onKeyDown={handleClose}
        >
          <Link href="/" className={styles.link}>
            Home
          </Link>
        </div>
        <div className={styles.title}>
          <span> Categories </span>
        </div>
        {categories.map((category) => (
          <div
            key={category._id}
            className={styles.list}
            role="link"
            tabIndex={-1}
            onClick={handleClose}
            onKeyDown={handleClose}
          >
            <Link href={`/search?category=${category._id}`} className={styles.link}>
              {category.name}
            </Link>
          </div>
        ))}
        {currentUser && (
          <>
            <div className={styles.title}>
              <span> Account </span>
            </div>
            <div
              className={styles.list}
              role="link"
              tabIndex={-1}
              onClick={handleClose}
              onKeyDown={handleClose}
            >
              <Link href="/orders" className={styles.link}>
                My Orders
              </Link>
            </div>
            <div
              className={styles.list}
              role="link"
              tabIndex={-1}
              onClick={handleClose}
              onKeyDown={handleClose}
            >
              <Link href="/wishlist" className={styles.link}>
                My Wishlist
              </Link>
            </div>
            <div className={styles.list}>
              <Button
                type="button"
                onClick={handleLogOut}
                title="Log Out"
                style={{ width: '100%' }}
              />
            </div>
          </>
        )}
      </div>

      {isOpen && (
        <div
          className={styles.overlay}
          role="button"
          tabIndex={-1}
          onClick={onClose}
          onKeyDown={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;
