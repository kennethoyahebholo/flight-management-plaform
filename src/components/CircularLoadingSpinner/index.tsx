import React from 'react';

import styles from './CircularLoadingSpinner.module.scss';

const CircularLoadingSpinner = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__top}>
        <div className={styles.wrapper__topContent} />
      </div>
      <svg className={styles.wrapper__svg} xmlns="http://www.w3.org/2000/svg" version="1.1">
        <circle
          className={styles.wrapper__svgCircle}
          fill="none"
          strokeWidth="8"
          strokeDasharray="400"
          strokeDashoffset="250"
          cx="50%"
          cy="50%"
          r="47%"
        />
      </svg>
    </div>
  );
};

export default CircularLoadingSpinner;
