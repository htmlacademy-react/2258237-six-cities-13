import { createAction } from '@reduxjs/toolkit';
import { CityName } from '../mocks/locations';

import { SortingType } from '../types/sorting';
import { Offer } from '../types/offer';


export const changeActiveCity = createAction<{city: CityName}>('changeActiveCity');

export const changeActiveOffers = createAction('changeActiveOffers');

export const sortOffers = createAction<{type: SortingType}>('sortOffers');

export const loadOffers = createAction<Offer[]>('loadOffers');

export const setOffersDataLoading = createAction<boolean>('setOffersDataLoading');
