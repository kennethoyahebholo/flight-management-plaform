import React from 'react';

import { WelcomeCard } from './_partials';

import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles?.homeWrapper}>
      <WelcomeCard />
    </div>
  );
};

export default Home;
