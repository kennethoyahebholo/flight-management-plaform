import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFlights } from './features';

//define the interface for all the states that FlightsSlice is going to be using
export interface FlightsSliceState {
  isGettingFlights: boolean;
  activeFlightsModal: 'addOrUpdateFlightsModal' | '';
  isShowFlightsModal: boolean;
  createOrUpdateFlightApiData: any;
}

const initialState: FlightsSliceState = {
  isGettingFlights: false,
  activeFlightsModal: '',
  isShowFlightsModal: false,
  createOrUpdateFlightApiData: {}
};

//create the slice
export const FlightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setActiveFlightsModal: (
      state: FlightsSliceState,
      action: PayloadAction<'addOrUpdateFlightsModal' | ''>
    ) => {
      const { payload } = action;
      state.activeFlightsModal = payload;
    },

    setIsShowFlightsModal: (state: FlightsSliceState, action: PayloadAction<boolean>) => {
      const { payload } = action;
      state.isShowFlightsModal = payload;
    },

    setCreateOrUpdateFlightApiData: (state: FlightsSliceState, action: PayloadAction<any>) => {
      const { payload } = action;
      state.createOrUpdateFlightApiData = payload;
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
      .addCase(getFlights.fulfilled, (state: FlightsSliceState, action: PayloadAction<any>) => {
        state.isGettingFlights = false;
        // state.users = action.payload.data;
      });
  }
});

export default FlightsSlice.reducer;

export const { setIsShowFlightsModal, setCreateOrUpdateFlightApiData, setActiveFlightsModal } =
  FlightsSlice.actions;
