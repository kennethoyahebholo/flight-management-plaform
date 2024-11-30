import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFlights } from './features';

//define the interface for all the states that FlightsSlice is going to be using
export interface FlightsSliceState {
  isGettingFlights: boolean;
}

const initialState: FlightsSliceState = {
  isGettingFlights: false
};

//create the slice
export const FlightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {},

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
