/* eslint-disable @typescript-eslint/no-explicit-any */
import { waitFor } from '@testing-library/react';
import { PayloadAction } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { handleDeleteFlight } from '..';
import { deleteFlightDetails } from '../../../../redux/slices/flights/features';
import { ERROR_OCCURRED_MESSAGE } from '../../../../utils/constant';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));
jest.mock('../../../../redux/slices/flights/features', () => ({
  deleteFlightDetails: jest.fn()
}));
jest.mock('../../../../utils/helpers/general/useToast', () => jest.fn());

const mockNavigate = jest.fn();
const mockUseToast = jest.requireMock('../../../../utils/helpers/general/useToast');

describe('handleDeleteFlight', () => {
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

  it('should dispatch deleteFlightDetails, show success toast, and navigate on successful deleteFlightDetails', async () => {
    // Mock successful dispatch response
    const mockActionResult = {
      type: 'flights/:flightDetailsId/fulfilled',
      payload: {},
      meta: {}
    };

    // Mock deleteFlightDetails.fulfilled.match
    deleteFlightDetails.fulfilled = {
      type: 'flights/:flightDetailsId/fulfilled',
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
            (action as PayloadAction).type === 'flights/:flightDetailsId/fulfilled'
          );
        }
      ) as any
    } as any;

    dispatch.mockResolvedValue(mockActionResult);

    await handleDeleteFlight('123', dispatch, mockNavigate, toast, () => {});

    expect(dispatch).toHaveBeenCalledWith(deleteFlightDetails({ flightId: '123' }));

    // Ensure the dispatch resolved successfully
    expect(dispatch).toHaveReturnedWith(Promise.resolve(mockActionResult));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Deleted Successfully');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard/flights/all?page=1');
    });
  });

  it('should dispatch deleteFlightDetails and show error toast on deleteFlightDetails failure', async () => {
    // Mock rejected dispatch response
    const mockActionResult = {
      type: 'flights/:flightDetailsId/rejected',
      error: { message: 'Error message' }
    };

    // Mock deleteFlightDetails.rejected.match
    deleteFlightDetails.rejected = {
      type: 'flights/:flightDetailsId/rejected',
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
            (action as PayloadAction).type === 'flights/:flightDetailsId/rejected'
          );
        }
      ) as any
    } as any;

    dispatch.mockResolvedValue(mockActionResult);

    await handleDeleteFlight('123', dispatch, mockNavigate, toast, () => {});

    expect(dispatch).toHaveBeenCalledWith(deleteFlightDetails({ flightId: '123' }));

    // Ensure the dispatch resolved successfully
    expect(dispatch).toHaveReturnedWith(Promise.resolve(mockActionResult));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error message');
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  it('should show default error message if no error message is provided on deleteFlightDetails failure', async () => {
    // Mock rejected dispatch response with no error message
    const mockActionResult = {
      type: 'flights/:flightDetailsId/rejected',
      error: {}
    };

    // Mock deleteFlightDetails.rejected.match
    deleteFlightDetails.rejected = {
      type: 'flights/:flightDetailsId/rejected',
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
            (action as PayloadAction).type === 'flights/:flightDetailsId/rejected'
          );
        }
      ) as any
    } as any;

    dispatch.mockResolvedValue(mockActionResult);

    await handleDeleteFlight('123', dispatch, mockNavigate, toast, () => {});

    expect(dispatch).toHaveBeenCalledWith(deleteFlightDetails({ flightId: '123' }));

    // Ensure the dispatch resolved successfully
    expect(dispatch).toHaveReturnedWith(Promise.resolve(mockActionResult));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(ERROR_OCCURRED_MESSAGE);
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
