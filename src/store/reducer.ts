import { createReducer } from '@reduxjs/toolkit';

import { changeActiveCity, changeActiveOffers, loadOffers, sortOffers, setOffersDataLoading, requireAuthorization, setUserData, getOfferData, getOffersNear, getOfferReviews, postNewComment } from './action';

import { Offer, OfferData } from '../types/offer';
import { SortingType } from '../types/sorting';
import { UserData } from '../types/user-data';
import { Review } from '../types/review';

import { locations } from '../mocks/locations';
import { CityName } from '../mocks/locations';

import { SORT_OPTIONS, AuthorizationStatus } from '../config';
import { sortPriceUp, sortPriceDown, sortRate } from '../ustils';


type InitialState = {
  city: CityName;
  offers: Offer[];
  offersByCity: Offer[];
  currentSortingType: SortingType;
  isOffersDataLoading: boolean;
  authorizationStatus: string;
  userData: UserData;
  offerData: OfferData;
  offersNear: Offer[];
  offerReviews: Review[];
}

const initialState: InitialState = {
  city: Array.from(locations)[0],
  offers: [],
  offersByCity: [],
  currentSortingType: SORT_OPTIONS[0].type,
  isOffersDataLoading: true,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {} as UserData,
  offerData: {} as OfferData,
  offersNear: [],
  offerReviews: [],
};


export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveCity, (state, action) => {
      const {city} = action.payload;
      state.city = city;
    })
    .addCase(changeActiveOffers, (state) => {
      state.offersByCity = state.offers.filter((offer) => offer.city.name === state.city);
    })
    .addCase(sortOffers, (state, action) => {
      const {type} = action.payload;
      state.currentSortingType = type;
      switch (type) {
        case (SORT_OPTIONS[1].type):
          state.offersByCity = state.offersByCity.sort(sortPriceUp);
          break;
        case (SORT_OPTIONS[2].type):
          state.offersByCity = state.offersByCity.sort(sortPriceDown);
          break;
        case (SORT_OPTIONS[3].type):
          state.offersByCity = state.offersByCity.sort(sortRate);
          break;
        default:
          state.offersByCity = state.offers.filter((offer) => offer.city.name === state.city);
          break;
      }
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.offersByCity = state.offers.filter((offer) => offer.city.name === state.city);
    })
    .addCase(setOffersDataLoading, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(getOfferData, (state, action) => {
      state.offerData = action.payload;
    })
    .addCase(getOffersNear, (state, action) => {
      state.offersNear = action.payload;
    })
    .addCase(getOfferReviews, (state, action) => {
      state.offerReviews = action.payload;
    })
    .addCase(postNewComment, (state, action) => {
      state.offerReviews.push(action.payload);
    });
});
