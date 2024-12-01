import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createFlight,
  createFlightWithPhoto,
  deleteFlightDetails,
  getFlightDetails,
  getFlights,
  updateFlightDetails
} from './features';
import { ICreateFlight } from './interface';

//define the interface for all the states that FlightsSlice is going to be using
export interface FlightsSliceState {
  isGettingFlights: boolean;
  activeFlightsModal:
    | 'addOrUpdateFlightsModal'
    | 'addOrUpdateFlightsSuccessModal'
    | 'deleteFlightModal'
    | '';
  isShowFlightsModal: boolean;
  createOrUpdateFlightApiData: ICreateFlight;
  isCreatingFlightWithPhoto: boolean;
  isCreatingFlight: boolean;
  refetchGetFlightsData: boolean;
  isGettingFlightDetails: boolean;
  isUpdatingFlightDetails: boolean;
  isDeletingFlightDetails: boolean;
}

const initialState: FlightsSliceState = {
  isGettingFlights: false,
  activeFlightsModal: '',
  isShowFlightsModal: false,
  createOrUpdateFlightApiData: {},
  isCreatingFlightWithPhoto: false,
  isCreatingFlight: false,
  refetchGetFlightsData: false,
  isGettingFlightDetails: false,
  isUpdatingFlightDetails: false,
  isDeletingFlightDetails: false
};

//create the slice
export const FlightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setActiveFlightsModal: (
      state: FlightsSliceState,
      action: PayloadAction<
        'addOrUpdateFlightsModal' | 'addOrUpdateFlightsSuccessModal' | 'deleteFlightModal' | ''
      >
    ) => {
      const { payload } = action;
      state.activeFlightsModal = payload;
    },

    setIsShowFlightsModal: (state: FlightsSliceState, action: PayloadAction<boolean>) => {
      const { payload } = action;
      state.isShowFlightsModal = payload;
    },

    setCreateOrUpdateFlightApiData: (
      state: FlightsSliceState,
      action: PayloadAction<ICreateFlight>
    ) => {
      const { payload } = action;
      state.createOrUpdateFlightApiData = payload;
    },

    setRefetchGetFlightsData: (state: FlightsSliceState, action: PayloadAction<boolean>) => {
      const { payload } = action;
      state.refetchGetFlightsData = payload;
    }
  },

  // redux http auto reducers
  extraReducers: (builder) => {
    builder
      // get all flights
      .addCase(getFlights.pending, (state: FlightsSliceState) => {
        state.isGettingFlights = true;
      })
      .addCase(getFlights.rejected, (state: FlightsSliceState) => {
        state.isGettingFlights = false;
      })
      .addCase(getFlights.fulfilled, (state: FlightsSliceState) => {
        state.isGettingFlights = false;
      })

      // create flights without photo
      .addCase(createFlight.pending, (state: FlightsSliceState) => {
        state.isCreatingFlight = true;
      })
      .addCase(createFlight.rejected, (state: FlightsSliceState) => {
        state.isCreatingFlight = false;
      })
      .addCase(createFlight.fulfilled, (state: FlightsSliceState) => {
        state.isCreatingFlight = false;
      })

      // create flights with photo
      .addCase(createFlightWithPhoto.pending, (state: FlightsSliceState) => {
        state.isCreatingFlightWithPhoto = true;
      })
      .addCase(createFlightWithPhoto.rejected, (state: FlightsSliceState) => {
        state.isCreatingFlightWithPhoto = false;
      })
      .addCase(createFlightWithPhoto.fulfilled, (state: FlightsSliceState) => {
        state.isCreatingFlightWithPhoto = false;
      })

      // get flight details
      .addCase(getFlightDetails.pending, (state: FlightsSliceState) => {
        state.isGettingFlightDetails = true;
      })
      .addCase(getFlightDetails.rejected, (state: FlightsSliceState) => {
        state.isGettingFlightDetails = false;
      })
      .addCase(getFlightDetails.fulfilled, (state: FlightsSliceState) => {
        state.isGettingFlightDetails = false;
      })

      // update flight details
      .addCase(updateFlightDetails.pending, (state: FlightsSliceState) => {
        state.isUpdatingFlightDetails = true;
      })
      .addCase(updateFlightDetails.rejected, (state: FlightsSliceState) => {
        state.isUpdatingFlightDetails = false;
      })
      .addCase(updateFlightDetails.fulfilled, (state: FlightsSliceState) => {
        state.isUpdatingFlightDetails = false;
      })

      // delete flight details
      .addCase(deleteFlightDetails.pending, (state: FlightsSliceState) => {
        state.isDeletingFlightDetails = true;
      })
      .addCase(deleteFlightDetails.rejected, (state: FlightsSliceState) => {
        state.isDeletingFlightDetails = false;
      })
      .addCase(deleteFlightDetails.fulfilled, (state: FlightsSliceState) => {
        state.isDeletingFlightDetails = false;
      });
  }
});

export default FlightsSlice.reducer;

export const {
  setIsShowFlightsModal,
  setCreateOrUpdateFlightApiData,
  setActiveFlightsModal,
  setRefetchGetFlightsData
} = FlightsSlice.actions;
