import { Pagination } from '../../interface';

export interface IGetAllFlights extends Pagination {
  code?: string;
}

export interface ICreateFlight {
  code?: string;
  capacity?: number | string;
  departureDate?: string;
  photo?: string;
  flightId?: string;
  isEditDetails?: boolean;
}
