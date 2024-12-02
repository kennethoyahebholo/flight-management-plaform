/* eslint-disable @typescript-eslint/no-explicit-any */
import { waitFor } from '@testing-library/react';
import { PayloadAction } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { handleCreateFlightWithNoPhoto } from '..';
import { createFlight } from '../../../../redux/slices/flights/features';
import { ERROR_OCCURRED_MESSAGE } from '../../../../utils/constant';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));
jest.mock('../../../../redux/slices/flights/features', () => ({
  createFlight: jest.fn()
}));
jest.mock('../../../../redux/slices/flights', () => ({
  setActiveFlightsModal: jest.fn() // Mock the setActiveFlightsModal
}));
jest.mock('../../../../utils/helpers/general/useToast', () => jest.fn());

const mockNavigate = jest.fn();
const mockUseToast = jest.requireMock('../../../../utils/helpers/general/useToast');
const mockSetActiveFlightsModal = jest.requireMock(
  '../../../../redux/slices/flights'
).setActiveFlightsModal;

describe('handleCreateFlightWithNoPhoto', () => {
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

  it('should dispatch createFlight, show success toast', async () => {
    // Mock successful dispatch response
    const mockActionResult = {
      type: 'create/flights/fulfilled',
      payload: { id: '134' },
      meta: {}
    };

    // Mock createFlight.fulfilled.match
    createFlight.fulfilled = {
      type: 'create/flights/fulfilled',
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
            (action as PayloadAction).type === 'create/flights/fulfilled'
          );
        }
      ) as any
    } as any;

    dispatch.mockResolvedValue(mockActionResult);

    await handleCreateFlightWithNoPhoto(
      { code: 'cdfrgg', capacity: 20, departureDate: '2020-10-23' },
      dispatch,
      toast
    );

    expect(dispatch).toHaveBeenCalledWith(
      createFlight({ code: 'gthjik', capacity: 20, departureDate: '2020-10-23' })
    );

    // Ensure the dispatch resolved successfully
    expect(dispatch).toHaveReturnedWith(Promise.resolve(mockActionResult));

    await waitFor(() => {
      expect(mockSetActiveFlightsModal).toHaveBeenCalledWith('addOrUpdateFlightsSuccessModal');
    });
  });

  it('should dispatch deleteFlightDetails and show error toast on deleteFlightDetails failure', async () => {
    // Mock rejected dispatch response
    const mockActionResult = {
      type: 'create/flights/rejected',
      error: { message: 'Error message' }
    };

    // Mock createFlight.rejected.match
    createFlight.rejected = {
      type: 'create/flights/rejected',
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
            (action as PayloadAction).type === 'create/flights/rejected'
          );
        }
      ) as any
    } as any;

    dispatch.mockResolvedValue(mockActionResult);

    await handleCreateFlightWithNoPhoto(
      { code: 'cdfrgg', capacity: 20, departureDate: '2020-10-23' },
      dispatch,
      toast
    );

    expect(dispatch).toHaveBeenCalledWith(
      createFlight({ code: 'gthjik', capacity: 20, departureDate: '' })
    );

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
      type: 'create/flights/rejected',
      error: {}
    };

    // Mock createFlight.rejected.match
    createFlight.rejected = {
      type: 'create/flights/rejected',
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
            (action as PayloadAction).type === 'create/flights/rejected'
          );
        }
      ) as any
    } as any;

    dispatch.mockResolvedValue(mockActionResult);

    await handleCreateFlightWithNoPhoto(
      { code: 'cdfrgg', capacity: 20, departureDate: '2020-10-23' },
      dispatch,
      toast
    );

    expect(dispatch).toHaveBeenCalledWith(
      createFlight({ code: 'gthjik', capacity: 20, departureDate: '' })
    );

    // Ensure the dispatch resolved successfully
    expect(dispatch).toHaveReturnedWith(Promise.resolve(mockActionResult));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(ERROR_OCCURRED_MESSAGE);
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
