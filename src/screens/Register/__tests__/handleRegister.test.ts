/* eslint-disable @typescript-eslint/no-explicit-any */
import { waitFor } from '@testing-library/react';
import { PayloadAction } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { handleRegister } from '..';
import { register } from '../../../redux/slices/auth/features';
import { ERROR_OCCURRED_MESSAGE } from '../../../utils/constant';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));
jest.mock('../../../redux/slices/auth/features', () => ({
  register: jest.fn()
}));
jest.mock('../../../utils/helpers/general/useToast', () => jest.fn());

const mockNavigate = jest.fn();
const mockUseToast = jest.requireMock('../../../utils/helpers/general/useToast');

describe('handleRegister', () => {
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

  it('should dispatch register, show success toast, and navigate on successful register', async () => {
    // Mock successful dispatch response
    const mockActionResult = {
      type: 'auth/register/fulfilled',
      payload: { id: '123', email: 'test@example.com' },
      meta: {}
    };

    // Mock register.fulfilled.match
    register.fulfilled = {
      type: 'auth/register/fulfilled',
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
            (action as PayloadAction).type === 'auth/register/fulfilled'
          );
        }
      ) as any
    } as any;

    dispatch.mockResolvedValue(mockActionResult);

    await handleRegister('ken', 'test@example.com', 'password123', dispatch, mockNavigate, toast);

    expect(dispatch).toHaveBeenCalledWith(
      register({ name: 'ken', email: 'test@example.com', password: 'password123' })
    );

    // Ensure the dispatch resolved successfully
    expect(dispatch).toHaveReturnedWith(Promise.resolve(mockActionResult));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Account created successfully');
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('should dispatch register and show error toast on register failure', async () => {
    // Mock rejected dispatch response
    const mockActionResult = {
      type: 'auth/register/rejected',
      error: { message: 'Invalid credentials' }
    };

    // Mock register.rejected.match
    register.rejected = {
      type: 'auth/register/rejected',
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
            (action as PayloadAction).type === 'auth/register/rejected'
          );
        }
      ) as any
    } as any;

    dispatch.mockResolvedValue(mockActionResult);

    await handleRegister('ken', 'test@example.com', 'password123', dispatch, mockNavigate, toast);

    expect(dispatch).toHaveBeenCalledWith(
      register({ name: 'ken', email: 'test@example.com', password: 'password123' })
    );

    // Ensure the dispatch resolved successfully
    expect(dispatch).toHaveReturnedWith(Promise.resolve(mockActionResult));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  it('should show default error message if no error message is provided on register failure', async () => {
    // Mock rejected dispatch response with no error message
    const mockActionResult = {
      type: 'auth/register/rejected',
      error: {}
    };

    // Mock register.rejected.match
    register.rejected = {
      type: 'auth/register/rejected',
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
            (action as PayloadAction).type === 'auth/register/rejected'
          );
        }
      ) as any
    } as any;

    dispatch.mockResolvedValue(mockActionResult);

    await handleRegister('ken', 'test@example.com', 'password123', dispatch, mockNavigate, toast);

    expect(dispatch).toHaveBeenCalledWith(
      register({ name: 'ken', email: 'test@example.com', password: 'password123' })
    );

    // Ensure the dispatch resolved successfully
    expect(dispatch).toHaveReturnedWith(Promise.resolve(mockActionResult));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(ERROR_OCCURRED_MESSAGE);
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
