import React from 'react';
import classes from './MyButton.module.css';

const MyButton = ({ children, active = false, variant = 'default', className = '', ...props }) => {
  const rootClasses = [
    classes.myBtn,
    classes[variant],
    active ? classes.active : '',
    className
  ].join(' ').trim();

  return (
    <button {...props} className={rootClasses}>
      {children}
    </button>
  );
};

export default MyButton;