import React from 'react';
import classes from './MyLoader.module.css';

const CloudSvg = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.5 19H6.5C4.01 19 2 16.99 2 14.5C2 12.19 3.75 10.29 6.01 10.03C6.58 6.62 9.54 4 13.1 4C16.89 4 20.01 6.94 20.28 10.66C21.84 11.3 23 12.78 23 14.5C23 16.99 20.99 19 18.5 19H17.5Z" />
  </svg>
);

const MyLoader = () => {
  return (
    <div className={classes.loaderContainer} role="status" aria-live="polite">
      {/* Фирменная эмблема Runforge */}
      <div className={classes.brandRow}>
        <div className={classes.logoBox}>
          <CloudSvg className={classes.mainCloud} />
        </div>
        <span className={classes.brandTitle}>runforge</span>
      </div>

      {/* Нижняя строка: loading + 3 анимированных облачка вместо точек */}
      <div className={classes.loadingSub}>
        <span className={classes.loadingText}>loading</span>
        <div className={classes.cloudsDots}>
          <CloudSvg className={`${classes.miniCloud} ${classes.cloud1}`} />
          <CloudSvg className={`${classes.miniCloud} ${classes.cloud2}`} />
          <CloudSvg className={`${classes.miniCloud} ${classes.cloud3}`} />
        </div>
      </div>
    </div>
  );
};

export default MyLoader;