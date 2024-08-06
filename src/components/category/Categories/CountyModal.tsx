import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';
import styles from './Categories.module.css'; // Import the same CSS module for consistency

interface CountyModalProps {
  isOpen: boolean;
  onClose: () => void;
  counties: Category[];
}

const CountyModal: React.FC<CountyModalProps> = ({ isOpen, onClose, counties }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>County Categories</h2>
        <ul className={styles.categoryContainer}>
          {counties.map((county) => (
            <li className={styles.list} key={county._id}>
              <Link href={`/search?category=${encodeURIComponent(county.name.toLowerCase())}`} className={styles.categoryLink}>
                <div className={styles.categoryImgWrapper}>
                  <Image alt={county.name} src={county.imageURL} layout="fill" objectFit="cover" />
                  <div className={styles.descriptionOverlay}>
                    <p className={styles.description}>{county.description}</p>
                  </div>
                </div>
                <p className={styles.name}>
                  {county.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CountyModal;
