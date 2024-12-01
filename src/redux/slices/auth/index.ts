import { createSlice } from '@reduxjs/toolkit';
import { getUserDetails, login, refreshToken, register } from './features';
import { User } from './interface';
import { removeUserTokenCookie } from '../../../utils/helpers/auth/cookieUtility';

//define the interface for all the states that authslice is going to be using
export interface AuthSliceState {
  isAuthenticated: boolean;
  user: User;
  isLoading: boolean;
  isLoadingUser?: boolean;
  isRegisteringUser?: boolean;
  isRefreshingToken?: boolean;
}

const initialState: AuthSliceState = {
  isAuthenticated: false,
  user: {},
  isLoading: false,
  isLoadingUser: true,
  isRegisteringUser: false,
  isRefreshingToken: false
};

//create the slice
export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state: AuthSliceState) => {
      removeUserTokenCookie();
      state.isAuthenticated = false;
      state.user = {};
    },
    setUser: (state: AuthSliceState, action) => {
      state.user = {
        email: action?.payload?.email,
        name: action?.payload?.name
      };
    }
  },

  // redux http auto reducers
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state: AuthSliceState) => {
        state.isRegisteringUser = true;
      })
      .addCase(register.fulfilled, (state: AuthSliceState) => {
        state.isRegisteringUser = false;
      })
      .addCase(register.rejected, (state: AuthSliceState) => {
        state.isRegisteringUser = false;
      })
      // login
      .addCase(login.pending, (state: AuthSliceState) => {
        // remove previous token
        removeUserTokenCookie();
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state: AuthSliceState) => {
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state: AuthSliceState) => {
        state.isAuthenticated = false;
        state.isLoading = false;
      })

      // user data
      .addCase(getUserDetails.pending, (state: AuthSliceState) => {
        state.isLoadingUser = true;
      })
      .addCase(getUserDetails.rejected, (state: AuthSliceState) => {
        removeUserTokenCookie();
        state.isLoadingUser = false;
        state.isAuthenticated = false;
      })
      .addCase(getUserDetails.fulfilled, (state: AuthSliceState) => {
        state.isLoadingUser = false;
        state.isAuthenticated = true;
      })

      // refresh token
      .addCase(refreshToken.pending, (state: AuthSliceState) => {
        state.isRefreshingToken = true;
      })
      .addCase(refreshToken.rejected, (state: AuthSliceState) => {
        state.isRefreshingToken = false;
        removeUserTokenCookie();
        state.isAuthenticated = false;
      })
      .addCase(refreshToken.fulfilled, (state: AuthSliceState) => {
        state.isRefreshingToken = true;
        state.isAuthenticated = true;
      });
  }
});

export default AuthSlice.reducer;

export const { signOut, setUser } = AuthSlice.actions;
