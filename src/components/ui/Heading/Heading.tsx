import React from 'react';
import styles from './Heading.module.css';

interface Props {
  className?: string;
  children: React.ReactNode; // Add this line
}

const Heading: React.FC<Props> = ({ children, className }) => {
  const headingStyles = `${styles.heading} ${className ? className : ''}`;

  return <div className={headingStyles}>{children}</div>;
};

export default Heading;
