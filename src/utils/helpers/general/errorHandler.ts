import { AxiosError } from 'axios';
import { ERROR_OCCURRED_MESSAGE } from '../../constant';

export const handleAxiosError = (error: unknown): never => {
  if (error instanceof AxiosError) {
    const errorMessage =
      error.response?.data.message || error.response?.data.error || ERROR_OCCURRED_MESSAGE;
    throw new Error(errorMessage);
  }
  throw error;
};
