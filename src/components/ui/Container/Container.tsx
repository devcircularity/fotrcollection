import React from 'react';
import styles from './Container.module.css';

interface Props {
  className?: string;
  children: React.ReactNode; // Add this line
}

const Container: React.FC<Props> = ({ children, className }) => {
  const classNames = `${styles.container} ${className ? className : ''}`;

  return <div className={classNames}>{children}</div>;
};

export default Container;
