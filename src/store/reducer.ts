import { createReducer } from '@reduxjs/toolkit';

import { changeActiveCity, changeActiveOffers } from './action';

import { offers } from '../mocks/offers';
import { locations } from '../mocks/locations';

import { Offer } from '../types/offer';
import { CityName } from '../mocks/locations';

type InitialState = {
  city: CityName;
  offers: Offer[];
  offersByCity: Offer[];
}

const initialState: InitialState = {
  city: Array.from(locations)[0],
  offers: offers,
  offersByCity: offers.filter((offer) => offer.city.name === Array.from(locations)[0]),
};


export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveCity, (state, action) => {
      const {city} = action.payload;
      state.city = city;
    })
    .addCase(changeActiveOffers, (state) => {
      state.offersByCity = state.offers.filter((offer) => offer.city.name === state.city);
    });
});
