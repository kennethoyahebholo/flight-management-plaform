import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SuspenseLoader } from '../../../components';

const Home = React.lazy(() => import('../Home'));
const Flights = React.lazy(() => import('../Flights'));
const NotFound = React.lazy(() => import('../../../components/NotFound'));

const DashboardRoutes = () => {
  return (
    <React.Suspense fallback={<SuspenseLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flights/*" element={<Flights />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
};
export default DashboardRoutes;
