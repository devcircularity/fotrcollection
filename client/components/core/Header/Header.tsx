/* eslint-disable import/order */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
                className={styles.logoImage}
                width={100}
                height={50}
              />
            </a>
          </Link>
          <Link href="/">
            <a className={styles.siteTitle}>CKB Collection</a>
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
