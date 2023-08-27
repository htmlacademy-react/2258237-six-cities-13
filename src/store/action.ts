import { createAction } from '@reduxjs/toolkit';
import { CityName } from '../mocks/locations';

import { SortingType } from '../types/sorting';
import { Offer } from '../types/offer';
import { UserData } from '../types/user-data';

import { AuthorizationStatus } from '../config';


export const changeActiveCity = createAction<{city: CityName}>('changeActiveCity');

export const changeActiveOffers = createAction('changeActiveOffers');

export const sortOffers = createAction<{type: SortingType}>('sortOffers');

export const loadOffers = createAction<Offer[]>('loadOffers');

export const setOffersDataLoading = createAction<boolean>('setOffersDataLoading');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');

export const setUserData = createAction<UserData>('setUserData');
