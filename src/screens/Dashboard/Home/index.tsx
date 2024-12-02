import React from 'react';
import { Link } from 'react-router-dom';

import { WelcomeCard } from './_partials';
import { StyledButton } from '../../../components';

import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles?.homeWrapper}>
      <WelcomeCard />
      <Link to="/dashboard/flights/all?page=1" className={styles?.homeWrapper__ctaWrap}>
        <StyledButton title="Manage Flights" className={styles?.homeWrapper__cta} />
      </Link>
    </div>
  );
};

export default Home;
