import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../utils/axios/api';
import { handleAxiosError } from '../../../utils/helpers/general/errorHandler';
import { IGetAllFlights } from './interface';

// Get all flights
export const getFlights = createAsyncThunk(
  'flights',
  async ({ size = 5, page = 1, code }: IGetAllFlights) => {
    try {
      const response = await api.get('flights', {
        params: {
          size,
          page
          //   code
        }
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }
);
