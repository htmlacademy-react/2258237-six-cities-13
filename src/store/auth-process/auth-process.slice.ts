import { createSlice } from '@reduxjs/toolkit';

import { AuthorizationStatus, SliceNames } from '../../config';

import { checkAuthAction, getAuthDataAction, loginAction, logoutAction } from '../api-action';

import { AuthProcess } from '../../types/state';
import { UserData } from '../../types/user-data';


const initialState: AuthProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {} as UserData,
};

export const authProcess = createSlice({
  name: SliceNames.Auth,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(getAuthDataAction.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(getAuthDataAction.rejected, (state) => {
        state.userData = {} as UserData;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
