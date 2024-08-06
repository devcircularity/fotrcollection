import React from 'react';
import { FaLink, FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import styles from './ShareModal.module.css';

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  productId: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ open, onClose, productId }) => {
  if (!open) return null;

  const shareUrl = `https://shop.fotrapp.com/products/${productId}`;

  const handleShare = (platform: string) => {
    switch (platform) {
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${shareUrl}`, '_blank');
        break;
      case 'instagram':
        alert('Instagram sharing is not supported directly.');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.shareModal}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>Close</button>
        <div className={styles.shareContainer}>
          <div
            className={styles.shareOption}
            onClick={() => handleShare('copy')}
            onKeyPress={(e) => { if (e.key === 'Enter') handleShare('copy'); }}
            role="button"
            tabIndex={0}
          >
            <FaLink size={36} />
            <span>Copy link</span>
          </div>
          <div
            className={styles.shareOption}
            onClick={() => handleShare('whatsapp')}
            onKeyPress={(e) => { if (e.key === 'Enter') handleShare('whatsapp'); }}
            role="button"
            tabIndex={0}
          >
            <FaWhatsapp size={36} />
            <span>WhatsApp</span>
          </div>
          <div
            className={styles.shareOption}
            onClick={() => handleShare('instagram')}
            onKeyPress={(e) => { if (e.key === 'Enter') handleShare('instagram'); }}
            role="button"
            tabIndex={0}
          >
            <FaInstagram size={36} />
            <span>Instagram</span>
          </div>
          <div
            className={styles.shareOption}
            onClick={() => handleShare('facebook')}
            onKeyPress={(e) => { if (e.key === 'Enter') handleShare('facebook'); }}
            role="button"
            tabIndex={0}
          >
            <FaFacebook size={36} />
            <span>Facebook</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
