'use client';

import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>© 2024 Carole Kinoti Brand. All rights reserved.</p>
        <ul className={styles.links}>
          <li>
            <a href="https://www.facebook.com/ckinoti/" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={22} />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/carole_kinoti/" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={22} />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/channel/UCrbRwEmt0xaBZCIbiNIh7Tg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={22} />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={22} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
