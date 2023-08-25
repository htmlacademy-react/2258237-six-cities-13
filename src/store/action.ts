import { createAction } from '@reduxjs/toolkit';
import { CityName } from '../mocks/locations';

import { SortingType } from '../types/sorting';


export const changeActiveCity = createAction<{city: CityName}>('changeActiveCity');

export const changeActiveOffers = createAction('changeActiveOffers');

export const sortOffers = createAction<{type: SortingType}>('sortOffers');
