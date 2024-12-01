import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../utils/axios/api';
import { handleAxiosError } from '../../../utils/helpers/general/errorHandler';
import { ICreateFlight, IGetAllFlights } from './interface';

// Get all flights
export const getFlights = createAsyncThunk(
  'flights',
  async ({ size = 10, page = 1, code }: IGetAllFlights) => {
    try {
      const response = await api.get('flights', {
        params: {
          size,
          page,
          ...(code && { code })
        }
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }
);

// create flight with no picture
export const createFlight = createAsyncThunk(
  'create/flights',
  async ({ code, capacity, departureDate }: ICreateFlight) => {
    try {
      const response = await api.post('flights', {
        code,
        capacity,
        departureDate
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }
);

// create flight with  picture
export const createFlightWithPhoto = createAsyncThunk(
  'create/flights/withPhoto',
  async ({ code, capacity, departureDate, photo }: ICreateFlight) => {
    try {
      const response = await api.post('flights/withPhoto', {
        code,
        capacity,
        departureDate,
        photo
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }
);

// Get flight by id
export const getFlightDetails = createAsyncThunk(
  'flights/:id/details',
  async ({ flightId }: { flightId: string }) => {
    try {
      const response = await api.get(`flights/${flightId}/details`);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }
);

// Update flight detail
export const updateFlightDetails = createAsyncThunk(
  'flights/:flightId',
  async ({ code, capacity, departureDate, flightId }: ICreateFlight) => {
    try {
      const response = await api.put(`flights/${flightId}`, {
        code,
        capacity,
        departureDate
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }
);

// Delete flight detail
export const deleteFlightDetails = createAsyncThunk(
  'flights/:flightDetailsId',
  async ({ flightId }: ICreateFlight) => {
    try {
      const response = await api.delete(`flights/${flightId}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }
);
