import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CityName, locations } from '../../mocks/locations';
import { OffersData } from '../../types/state';
import { SORT_OPTIONS, SliceNames, StatusComment } from '../../config';
import { OfferData } from '../../types/offer';
import { SortingType } from '../../types/sorting';
import { sortPriceUp, sortPriceDown, sortRate } from '../../ustils';
import { favoritesOfferAction, fetchOfferAction, fetchOfferDataAction, fetchOfferReviewsAction, fetchOffersNearbyAction, getFavoriteOffersAction, postNewCommentAction } from '../api-action';

const initialState: OffersData = {
  city: Array.from(locations)[0],
  offers: [],
  offersByCity: [],
  currentSortingType: SORT_OPTIONS[0].type,
  offerData: {} as OfferData,
  isOffersDataLoading: true,
  offersNear: [],
  offerReviews: [],
  favoriteOffers: [],
  isFavoritesLoading: false,
  statusComment: StatusComment.Idle,
  errorOfferData: false,
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
    },
    setFavoriteOffers: (state) => {
      state.offersByCity.map((offer) => offer.isFavorite === false);
    },
    clearFavortiteOffers: (state) => {
      state.favoriteOffers = [];
    },
    setErrorOffer: (state) => {
      state.errorOfferData = false;
    },
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
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOfferDataAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.errorOfferData = false;
      })
      .addCase(fetchOfferDataAction.fulfilled, (state, action) => {
        state.offerData = action.payload;
        state.isOffersDataLoading = false;
        state.errorOfferData = false;
      })
      .addCase(fetchOfferDataAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.errorOfferData = true;
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state, action) => {
        state.offersNear = action.payload;
        state.errorOfferData = false;
      })
      .addCase(fetchOfferReviewsAction.fulfilled, (state, action) => {
        state.offerReviews = action.payload;
        state.errorOfferData = false;
      })
      .addCase(postNewCommentAction.pending, (state) => {
        state.statusComment = StatusComment.Loading;
      })
      .addCase(postNewCommentAction.fulfilled, (state, action) => {
        state.statusComment = StatusComment.Success;
        state.offerReviews.push(action.payload);
      })
      .addCase(postNewCommentAction.rejected, (state) => {
        state.statusComment = StatusComment.Error;
      })
      .addCase(getFavoriteOffersAction.pending, (state) => {
        state.isFavoritesLoading = true;
      })
      .addCase(getFavoriteOffersAction.fulfilled, (state, action) => {
        state.isFavoritesLoading = false;
        state.favoriteOffers = action.payload;
      })
      .addCase(getFavoriteOffersAction.rejected, (state) => {
        state.isFavoritesLoading = false;
      })
      .addCase(favoritesOfferAction.fulfilled, (state, action) => {
        if (action.meta.arg.status === 1) {
          state.favoriteOffers.push(action.payload);
          state.offersByCity.map((offer) => {
            if (offer.id === action.payload.id) {
              offer.isFavorite = true;
            }
          });
        } else {
          state.offersByCity.map((offer) => {
            if (offer.id === action.payload.id) {
              offer.isFavorite = false;
            }
          });
          const index = state.favoriteOffers.findIndex((offer) => offer.id === action.payload.id);
          state.favoriteOffers.splice(index, 1);
        }
      });
  }
});

export const { changeActiveCity, changeActiveOffers, sortOffers, clearFavortiteOffers, setErrorOffer } = offersData.actions;
