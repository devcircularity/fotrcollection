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
          <Link href="https://carolekinoti.co.ke">
            <a className={styles.logo}>
              <Image
                src="/log.png"
                alt="Logo"
                width={100} // Add appropriate width
                height={50} // Add appropriate height
                className={styles.logoImage}
              />
            </a>
          </Link>
          <Link href="/">
            <a className={styles.siteTitle}>Brands</a>
          </Link>
          <div className={styles.headerRight}>
            <DesktopMenu />
            <MobileMenu />
          </div>
        </ul>
      </header>
    </>
  );
};

export default Header;
