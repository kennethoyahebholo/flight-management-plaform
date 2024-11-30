import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import dashboardReducer from './slices/dashboard/dashboardSlice';
// import questionsReducer from './slices/questions/questionsSlice';

import { AuthSlice } from './slices/auth';
import { DashboardSlice } from './slices/dashboard';
import { FlightsSlice } from './slices/flights';
// import { SecurityQuestionsSlice } from './slices/securityQuestions';

export const store = configureStore({
  reducer: {
    // user: userReducer,
    auth: AuthSlice.reducer,
    dashboard: DashboardSlice.reducer,
    flights: FlightsSlice.reducer
    // securityQuestionsSlice: SecurityQuestionsSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        // ignoredActions: ['bills/setBillSuccessData'],
        // Ignore these field paths in all actions
        // ignoredActionPaths: ['payload.subtitle.$$typeof'],
        // Ignore these paths in the state
        // ignoredPaths: ['bills.billSuccessData.subtitle']
      }
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
