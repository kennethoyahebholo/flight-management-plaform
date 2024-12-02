import React from 'react';
import { useLocation } from 'react-router-dom';

import Middleware from '../../middleware';
import { useAppDispatch } from '../../redux/hooks';
import useFetchDataUtility from '../../utils/helpers/auth/userDetails';
import DashboardLayout from './_partials/DashboardLayout';
import DashboardRoutes from './_partials/DashboardRoutes';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  useFetchDataUtility({ dispatch, pathname: pathname || '' });
  return (
    <Middleware>
      <DashboardLayout>
        <DashboardRoutes />
      </DashboardLayout>
    </Middleware>
  );
};

export default Dashboard;
