import { createAction } from '@reduxjs/toolkit';


export const changeActiveCity = createAction<{city: string}>('changeActiveCity');

export const changeActiveOffers = createAction('changeActiveOffers');
