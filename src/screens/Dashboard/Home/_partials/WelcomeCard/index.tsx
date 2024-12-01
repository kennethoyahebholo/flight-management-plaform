import React from 'react';

import { useAppSelector } from '../../../../../redux/hooks';

import styles from './WelcomeCard.module.scss';

const WelcomeCard = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className={styles?.WelcomeCardWrapper}>
      <div className={styles?.WelcomeCardWrapper__left}>
        <h4 className={styles?.WelcomeCardWrapper__greetings}>Hello {user?.name}.</h4>
        <p className={styles?.WelcomeCardWrapper__message}>
          Welcome to the Flight Management System! Manage flights effortlessly, streamline
          operations, and explore the skies with confidence.
        </p>
      </div>
    </div>
  );
};

export default WelcomeCard;
