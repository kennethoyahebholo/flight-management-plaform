/* eslint-disable @typescript-eslint/no-explicit-any */
import { waitFor } from '@testing-library/react';
import { PayloadAction } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from '..';
import { login } from '../../../redux/slices/auth/features';
import { ERROR_OCCURRED_MESSAGE } from '../../../utils/constant';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));
jest.mock('../../../redux/slices/auth/features', () => ({
  login: jest.fn()
}));
jest.mock('../../../utils/helpers/general/useToast', () => jest.fn());

const mockNavigate = jest.fn();
const mockUseToast = jest.requireMock('../../../utils/helpers/general/useToast');

describe('handleLogin', () => {
  const dispatch = jest.fn();
  const toast = {
    success: jest.fn(),
    error: jest.fn()
  };

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (mockUseToast as jest.Mock).mockReturnValue(toast);
    jest.clearAllMocks();
  });

  it('should dispatch login, show success toast, and navigate on successful login', async () => {
    // Mock successful dispatch response
    const mockActionResult = {
      type: 'auth/login/fulfilled',
      payload: { id: '123', email: 'test@example.com' },
      meta: {}
    };

    // Mock login.fulfilled.match
    login.fulfilled = {
      type: 'auth/login/fulfilled',
      match: jest.fn(
        (
          action: unknown
        ): action is PayloadAction<
          any,
          string,
          {
            arg: { email: string; password: string };
            requestId: string;
            requestStatus: 'fulfilled';
          },
          never
        > => {
          return (
            typeof action === 'object' &&
            action !== null &&
            (action as PayloadAction).type === 'auth/login/fulfilled'
          );
        }
      ) as any
    } as any;

    dispatch.mockResolvedValue(mockActionResult);

    await handleLogin('test@example.com', 'password123', dispatch, mockNavigate, toast);

    expect(dispatch).toHaveBeenCalledWith(
      login({ email: 'test@example.com', password: 'password123' })
    );

    // Ensure the dispatch resolved successfully
    expect(dispatch).toHaveReturnedWith(Promise.resolve(mockActionResult));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        'You have successfully signed in. Redirecting to your dashboard...'
      );
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should dispatch login and show error toast on login failure', async () => {
    // Mock rejected dispatch response
    const mockActionResult = {
      type: 'auth/login/rejected',
      error: { message: 'Invalid credentials' }
    };

    // Mock login.rejected.match
    login.rejected = {
      type: 'auth/login/rejected',
      match: jest.fn(
        (
          action: unknown
        ): action is PayloadAction<
          any,
          string,
          {
            arg: { email: string; password: string };
            requestId: string;
            requestStatus: 'rejected';
          },
          never
        > => {
          return (
            typeof action === 'object' &&
            action !== null &&
            (action as PayloadAction).type === 'auth/login/rejected'
          );
        }
      ) as any
    } as any;

    dispatch.mockResolvedValue(mockActionResult);

    await handleLogin('test@example.com', 'wrongpassword', dispatch, mockNavigate, toast);

    expect(dispatch).toHaveBeenCalledWith(
      login({ email: 'test@example.com', password: 'wrongpassword' })
    );

    // Ensure the dispatch resolved successfully
    expect(dispatch).toHaveReturnedWith(Promise.resolve(mockActionResult));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  it('should show default error message if no error message is provided on login failure', async () => {
    // Mock rejected dispatch response with no error message
    const mockActionResult = {
      type: 'auth/login/rejected',
      error: {}
    };

    // Mock login.rejected.match
    login.rejected = {
      type: 'auth/login/rejected',
      match: jest.fn(
        (
          action: unknown
        ): action is PayloadAction<
          any,
          string,
          {
            arg: { email: string; password: string };
            requestId: string;
            requestStatus: 'rejected';
          },
          never
        > => {
          return (
            typeof action === 'object' &&
            action !== null &&
            (action as PayloadAction).type === 'auth/login/rejected'
          );
        }
      ) as any
    } as any;

    dispatch.mockResolvedValue(mockActionResult);

    await handleLogin('test@example.com', 'wrongpassword', dispatch, mockNavigate, toast);

    expect(dispatch).toHaveBeenCalledWith(
      login({ email: 'test@example.com', password: 'wrongpassword' })
    );

    // Ensure the dispatch resolved successfully
    expect(dispatch).toHaveReturnedWith(Promise.resolve(mockActionResult));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(ERROR_OCCURRED_MESSAGE);
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
