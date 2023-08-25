import { createAction } from '@reduxjs/toolkit';
import { CityName } from '../mocks/locations';


export const changeActiveCity = createAction<{city: CityName}>('changeActiveCity');

export const changeActiveOffers = createAction('changeActiveOffers');
