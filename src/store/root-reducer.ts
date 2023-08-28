import { combineReducers } from '@reduxjs/toolkit';
import { SliceNames } from '../config';
import { authProcess } from './auth-process/auth-process.slice';
import { offersData } from './offers-data/offers-data.slice';


export const rootReducer = combineReducers({
  [SliceNames.Auth]: authProcess.reducer,
  [SliceNames.Data]: offersData.reducer,
});
