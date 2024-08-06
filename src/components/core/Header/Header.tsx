'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import DesktopMenu from '../DesktopMenu';
import MobileMenu from '../MobileMenu';

import styles from './Header.module.css';

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <ul className={styles.headerWrapper}>
          <li className={styles.logo}>
            <Link href="https://carolekinoti.co.ke" passHref>
              <Image
                src="/images/log.png" // Update the path to point to the image in the public folder
                alt="Logo"
                width={100} // Add appropriate width
                height={50} // Add appropriate height
                className={styles.logoImage}
              />
            </Link>
          </li>
          <li className={styles.siteTitle}>
            <Link href="/" passHref>
              Brands
            </Link>
          </li>
          <li className={styles.headerRight}>
            <div className={styles.menuContainer}>
              <DesktopMenu />
              <MobileMenu />
            </div>
          </li>
        </ul>
      </header>
    </>
  );
};

export default Header;
