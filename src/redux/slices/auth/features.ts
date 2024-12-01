import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getRefreshTokenCookie,
  setRefreshTokenCookie,
  setUserTokenCookie
} from '../../../utils/helpers/auth/cookieUtility';
import api from '../../../utils/axios/api';
import { handleAxiosError } from '../../../utils/helpers/general/errorHandler';

// Login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await api.post('auth/login', { email, password });

      const { token, refreshToken } = response.data;
      setUserTokenCookie(token);
      setRefreshTokenCookie(refreshToken);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }
);

// Register
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }: { name: string; email: string; password: string }) => {
    try {
      const response = await api.post('auth/register', { name, email, password });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }
);

// Get user details
export const getUserDetails = createAsyncThunk('auth/me', async () => {
  try {
    const response = await api.get('auth/me');
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
});

// refresh token
export const refreshToken = createAsyncThunk('auth/refresh', async (_, { rejectWithValue }) => {
  const refreshToken = getRefreshTokenCookie();
  if (!refreshToken) {
    return rejectWithValue('No refresh token available');
  }

  try {
    const response = await api.post('/auth/refresh', { refreshToken });
    const { token, refreshToken: newRefreshToken } = response.data;

    if (token && newRefreshToken) {
      setUserTokenCookie(token);
      setRefreshTokenCookie(newRefreshToken); // Update refresh token
    }

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
});
