import { useEffect, useRef } from 'react';

import { useAppDispatch } from '../../../redux/hooks';
import { fetchUserDataUtility } from '../../hooks/auth/fetchUserDataUtility';
import { getUserTokenCookie } from './cookieUtility';
import { useNavigate } from 'react-router-dom';

interface FetchDataOptions {
  dispatch: ReturnType<typeof useAppDispatch>;
  pathname: string;
}

const useFetchDataUtility = ({ dispatch, pathname }: FetchDataOptions): void => {
  const hasRun = useRef(false);
  const token = getUserTokenCookie();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        await fetchUserDataUtility(dispatch);
      };

      if (!hasRun.current) {
        fetchData();
        hasRun.current = true;
      }
      return;
    }
    navigate('/');
  }, [dispatch, pathname, token]);
};

export default useFetchDataUtility;
