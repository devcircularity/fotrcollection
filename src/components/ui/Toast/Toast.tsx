'use client';

import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import styles from './Toast.module.css';

interface Props {
  type: string;
  message: string;
  isActive: boolean;
  closeToast(): void;
}

const Toast = ({ type, message, isActive, closeToast }: Props) => {
  const [visible, setVisible] = useState(isActive);

  useEffect(() => {
    if (isActive) {
      setVisible(true);
    } else {
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 300); // Match the duration of the CSS transition

      return () => clearTimeout(timeout);
    }
  }, [isActive]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`${styles.toast} ${isActive ? styles.show : styles.hide}`}
      style={{
        position: 'fixed',
        top: '9rem',
        right: 0,
        left: 0,
        zIndex: 1000,
        width: '100%',
        padding: '1rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <div className={`${styles.alert} ${styles[type]}`} role={type}>
        <div>{message}</div>
        <button className={styles.close} onClick={closeToast}>
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

export default Toast;
