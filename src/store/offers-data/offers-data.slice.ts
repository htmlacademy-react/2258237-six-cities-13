import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CityName, locations } from '../../mocks/locations';
import { OffersData } from '../../types/state';
import { SORT_OPTIONS, SliceNames } from '../../config';
import { OfferData } from '../../types/offer';
import { SortingType } from '../../types/sorting';
import { sortPriceUp, sortPriceDown, sortRate } from '../../ustils';
import { fetchOfferAction, fetchOfferDataAction, fetchOfferReviewsAction, fetchOffersNearbyAction, postNewCommentAction } from '../api-action';

const initialState: OffersData = {
  city: Array.from(locations)[0],
  offers: [],
  offersByCity: [],
  currentSortingType: SORT_OPTIONS[0].type,
  offerData: {} as OfferData,
  isOffersDataLoading: true,
  offersNear: [],
  offerReviews: [],
};


export const offersData = createSlice({
  name: SliceNames.Data,
  initialState,
  reducers: {
    changeActiveCity: (state, action: PayloadAction<{ city: CityName }>) => {
      const {city} = action.payload;
      state.city = city;
    },
    changeActiveOffers: (state) => {
      state.offersByCity = state.offers.filter((offer) => offer.city.name === state.city);
    },
    sortOffers: (state, action: PayloadAction<{ type: SortingType }>) => {
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
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.isOffersDataLoading = false;
        state.offers = action.payload;
        state.offersByCity = state.offers.filter((offer) => offer.city.name === state.city);
      })
      .addCase(fetchOfferDataAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOfferDataAction.fulfilled, (state, action) => {
        state.isOffersDataLoading = false;
        state.offerData = action.payload;
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state, action) => {
        state.offersNear = action.payload;
      })
      .addCase(fetchOfferReviewsAction.fulfilled, (state, action) => {
        state.offerReviews = action.payload;
      })
      .addCase(postNewCommentAction.fulfilled, (state, action) => {
        state.offerReviews.push(action.payload);
      });
  }
});

export const { changeActiveCity, changeActiveOffers, sortOffers } = offersData.actions;
