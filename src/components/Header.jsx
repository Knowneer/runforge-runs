import React from 'react';
import MyButton from '../UI/button/MyButton.jsx';
import classes from './Header.module.css';

const Header = ({ onReload, onSimulateError }) => {
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <div className={classes.brand}>
          <div className={classes.logoIcon}>
            <svg viewBox="0 0 24 24" fill="currentColor" className={classes.cloudSvg}>
              <path d="M17.5 19H6.5C4.01 19 2 16.99 2 14.5C2 12.19 3.75 10.29 6.01 10.03C6.58 6.62 9.54 4 13.1 4C16.89 4 20.01 6.94 20.28 10.66C21.84 11.3 23 12.78 23 14.5C23 16.99 20.99 19 18.5 19H17.5Z" />
            </svg>
          </div>
          <span className={classes.brandName}>runforge</span>
          <span className={classes.divider}>/</span>
          <span className={classes.pageName}>Runs</span>
        </div>

        <div className={classes.actions}>
          {onSimulateError && (
            <MyButton onClick={onSimulateError}>Тест ошибки</MyButton>
          )}
          <MyButton onClick={onReload}>Обновить</MyButton>
        </div>
      </div>
    </header>
  );
};

export default Header;