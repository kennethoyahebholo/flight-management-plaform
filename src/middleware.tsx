import React, { ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import { useAppDispatch, useAppSelector } from './redux/hooks';
import { useNavigate } from 'react-router-dom';
import { SuspenseLoader } from './components';
import { getUserTokenCookie } from './utils/helpers/auth/cookieUtility';
import { setUser } from './redux/slices/auth';

interface MiddlewareProps {
  children?: ReactNode;
}

const Middleware: React.FC<MiddlewareProps> = ({ children }) => {
  const { isAuthenticated, isLoadingUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const token = getUserTokenCookie();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoadingUser) return;

    if (!isAuthenticated) {
      navigate('/');
    }

    const user = jwtDecode(`${token}`);
    dispatch(setUser(user));
  }, [isAuthenticated, isLoadingUser, navigate]);

  if (isLoadingUser) {
    return <SuspenseLoader />;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return null;
};

export default Middleware;
