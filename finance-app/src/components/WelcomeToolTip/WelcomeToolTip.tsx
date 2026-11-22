import React from 'react';
import styles from './WelcomeTooltip.module.css';

export const WelcomeTooltip: React.FC = () => {
  return (
    <div className={styles.tooltipContainer}>
      <p className={styles.textMain}>
        Привіт! Для початку роботи внесіть свій поточний баланс рахунку!
      </p>
      <p className={styles.textSub}>
        Ви не можете витрачати гроші, поки їх у Вас немає :)
      </p>
    </div>
  );
};