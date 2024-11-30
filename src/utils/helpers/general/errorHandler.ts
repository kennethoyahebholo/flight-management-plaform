import { AxiosError } from 'axios';
import { ERROR_OCCURED_MESSAGE } from '../../constant';

export const handleAxiosError = (error: any): never => {
  if (error instanceof AxiosError) {
    const errorMessage =
      error.response?.data.message || error.response?.data.error || ERROR_OCCURED_MESSAGE;
    throw new Error(errorMessage);
  }
  throw error;
};
