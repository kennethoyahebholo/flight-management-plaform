import React from 'react';
import { Route, Routes } from 'react-router-dom';

import NotFound from '../../../components/NotFound';

import Styles from './Flights.module.scss';

const FlightsRecord = React.lazy(() => import('./_partials/FlightsRecord'));

const Flights = () => {
  return (
    <div className={Styles.flightsWrapper}>
      <Routes>
        <Route path="/all" element={<FlightsRecord />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Flights;
