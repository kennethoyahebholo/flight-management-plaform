import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { AuthSlice } from './slices/auth';
import { DashboardSlice } from './slices/dashboard';
import { FlightsSlice } from './slices/flights';

export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    dashboard: DashboardSlice.reducer,
    flights: FlightsSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {}
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
