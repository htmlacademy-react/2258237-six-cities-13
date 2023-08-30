import { CityName } from '../../mocks/locations';
import { Offer, OfferData } from '../../types/offer';
import { Review } from '../../types/review';
import { SortingType } from '../../types/sorting';
import { State } from '../../types/state';

export const getOffers = (state: State): Offer[] => state.Data.offers;
export const getLocation = (state: State): CityName => state.Data.city;
export const getStatusLoading = (state: State): boolean => state.Data.isOffersDataLoading;
export const getOfferData = (state: State): OfferData => state.Data.offerData;
export const getOffersNear = (state: State): Offer[] => state.Data.offersNear;
export const getOfferReviews = (state: State): Review[] => state.Data.offerReviews;
export const getSortingType = (state: State): SortingType => state.Data.currentSortingType;
export const getOffersByCity = (state: State): Offer[] => state.Data.offersByCity;
export const getFavoriteOffers = (state: State): (Offer | OfferData)[] => state.Data.favoriteOffers;
export const getStatusComment = (state: State): string => state.Data.statusComment;
export const getFavoritesStatusLoading = (state: State): boolean => state.Data.isFavoritesLoading;
