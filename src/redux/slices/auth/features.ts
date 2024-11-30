import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUserTokenCookie } from '../../../utils/helpers/auth/cookieUtility';
import api from '../../../utils/axios/api';
import { handleAxiosError } from '../../../utils/helpers/general/errorHandler';

// Login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await api.post('auth/login', { email, password });
      setUserTokenCookie(response.data.token);
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

// Get users
export const getAllUsers = createAsyncThunk('users', async () => {
  try {
    const response = await api.get('users');
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
});

// Get user profile
export const getUserProfile = createAsyncThunk('users/me/profile', async () => {
  try {
    const response = await api.get('users/me/profile');
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
});

// Update user role
export const updateUserRole = createAsyncThunk(
  'user/role',
  async (payload: { newRole: string }) => {
    try {
      const response = await api.put(`user/role`, payload);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }
);
