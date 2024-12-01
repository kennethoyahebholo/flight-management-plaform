import { ICreateFlight } from '../../../redux/slices/flights/interface';

export interface IAddOrUpdateFlightModal {
  isShowAddOrUpdateFlightsModal: boolean;
  onClickAwayAddOrUpdateFlightsModal: () => void;
  onCloseAddOrUpdateFlightsModal: () => void;
  createOrUpdateFlightApiData: ICreateFlight;
}
export interface IFormData {
  code: string;
  capacity: string;
  departureDate: string;
  flightImage: null;
}
