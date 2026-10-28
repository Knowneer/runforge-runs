import React from 'react';
import MyButton from '../UI/button/MyButton';
import classes from './States.module.css';

export const EmptyState = ({ onReset }) => (
  <div className={classes.stateBox}>
    <h3 className={classes.stateTitle}>Запуски не найдены</h3>
    <p className={classes.stateText}>
      По вашему поисковому запросу или выбранному фильтру ничего не нашлось.
    </p>
    <MyButton variant="primary" onClick={onReset}>
      Сбросить поиск и фильтры
    </MyButton>
  </div>
);

export const ErrorState = ({ message, onRetry }) => (
  <div className={classes.stateBox}>
    <h3 className={classes.stateTitle}>Ошибка загрузки данных</h3>
    <p className={classes.stateText}>{message || 'Не удалось получить список запусков.'}</p>
    <MyButton variant="primary" onClick={onRetry}>
      Повторить попытку
    </MyButton>
  </div>
);