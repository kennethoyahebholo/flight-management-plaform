import { ICreateFlight } from '../../../redux/slices/flights/interface';

export interface IDeleteFlightModal {
  showDeleteFlightModal: boolean;
  onClickAwayDeleteFlightModal: () => void;
  onCloseDeleteFlightModal: () => void;
  onCancelDeleteFlightModal: () => void;
  createOrUpdateFlightApiData: ICreateFlight;
}
