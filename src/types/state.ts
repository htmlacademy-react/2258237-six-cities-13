import { CityName } from '../mocks/locations';
import { store } from '../store';
import { UserData } from './user-data';
import { Offer } from './offer';
import { SortingType } from './sorting';
import { OfferData } from './offer';
import { Review } from './review';


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AuthProcess = {
  authorizationStatus: string;
  userData: UserData;
}

export type OffersData = {
  city: CityName;
  offers: Offer[];
  offersByCity: Offer[];
  currentSortingType: SortingType;
  offerData: OfferData;
  isOffersDataLoading: boolean;
  offersNear: Offer[];
  offerReviews: Review[];
  favoriteOffers: (Offer | OfferData)[];
}
