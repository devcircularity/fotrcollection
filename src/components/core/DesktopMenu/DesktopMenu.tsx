'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { IoMdCart } from 'react-icons/io';

import { SearchBar } from '@/components/core';
import { Button } from '@/components/ui';
import useLogout from '@/hooks/auth/use-logout';
import useCart from '@/hooks/cart/use-cart';
import useUser from '@/hooks/user/use-user';
import { capitalizeFirstLetter } from '@/utils/helpers';

import styles from './DesktopMenu.module.css';

const DesktopMenu = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: currentUser } = useUser();
  const logout = useLogout();

  const { data: cartData, isLoading } = useCart();  // Updated hook usage
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (theme !== 'light') {
      setTheme('light');
    }
  }, [theme, setTheme]);

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);

    // Cleanup function
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target;
    if (target instanceof Node && dropdownRef.current?.contains(target)) {
      return;
    }

    setIsOpenDropdown(false);
  };

  const handleLogOut = () => {
    logout();
    router.push('/login');
  };

  const handleSearchSubmit = (searchText: string) => {
    router.push(`/search?keyword=${searchText}`);
  };

  const handleCloseDropDown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  const handleToggleTheme = () => {
    const selectedTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(selectedTheme);
  };

  // Helper function to calculate the total number of items
  const getTotalItems = () => {
    return cartData?.items.reduce((total, item) => total + item.quantity, 0) || 0;
  };

  return (
    <div className={`${styles.desktopMenu} ${styles.headerItem}`}>
  <div className={styles.searchContainer}>
    <SearchBar onSubmit={handleSearchSubmit} />
  </div>
  <div className={styles.cartContainer}>
    <Link href="/cart" className={styles.link}>
      <div className={styles.cartIconWrapper}> {/* New wrapper around the icon and counter */}
        <IoMdCart size={30} />
        {currentUser && !isLoading && getTotalItems() > 0 && (
          <div className={styles.cartNum}>{getTotalItems()}</div>
        )}
      </div>
      <span className={styles.cartText}>Cart</span> {/* Updated with new class */}
    </Link>
  </div>


      {currentUser ? (
        <div ref={dropdownRef} className={styles.userContainer}>
          <div
            role="button"
            tabIndex={-1}
            className={styles.user}
            onClick={handleCloseDropDown}
            onKeyDown={handleCloseDropDown}
          >
            {currentUser.imageURL ? (
              <Image width={40} height={40} src={currentUser.imageURL} alt={currentUser.name} />
            ) : (
              <div className={styles.userTextContainer}>
                {capitalizeFirstLetter(currentUser.name)}
              </div>
            )}
          </div>

          {isOpenDropdown && (
            <div className={styles.dropdown}>
              <div
                role="link"
                className={styles.item}
                tabIndex={-1}
                onClick={handleCloseDropDown}
                onKeyDown={handleCloseDropDown}
              >
                <Link href="/profile">My Profile</Link>
              </div>
              <div
                role="link"
                tabIndex={-1}
                className={styles.item}
                onClick={handleCloseDropDown}
                onKeyDown={handleCloseDropDown}
              >
                <Link href="/orders">My Orders</Link>
              </div>
              <div
                role="link"
                tabIndex={-1}
                className={styles.item}
                onClick={handleCloseDropDown}
                onKeyDown={handleCloseDropDown}
              >
                <Link href="/wishlist">My Wishlist</Link>
              </div>
              <div
                className={styles.item}
                role="button"
                tabIndex={-1}
                onClick={handleToggleTheme}
                onKeyPress={handleToggleTheme}
              >
                <div className={styles.selectThemeContainer}>
                  <span>Theme</span>
                  <span>{theme === 'light' ? <FiSun /> : <FiMoon />}</span>
                </div>
              </div>
              <div className={styles.item}>
                <Button
                  type="button"
                  title="Log Out"
                  onClick={handleLogOut}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.authLinksContainer} ref={dropdownRef}>
          <Link href="/signup">Sign Up</Link>
          <span className={styles.line}> | </span>
          <Link href="/login">Log In</Link>
        </div>
      )}
    </div>
  );
};

export default DesktopMenu;
