import React from 'react';
import classes from './MyInput.module.css';

const MyInput = React.forwardRef(({ className = '', onClear, value, ...props }, ref) => {
  return (
    <div className={classes.inputWrapper}>
      <svg className={classes.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        ref={ref}
        value={value}
        className={`${classes.myInput} ${className}`}
        {...props}
      />
      {value && onClear && (
        <button
          type="button"
          className={classes.clearBtn}
          onClick={onClear}
          aria-label="Очистить поиск"
        >
          ✕
        </button>
      )}
    </div>
  );
});

export default MyInput;