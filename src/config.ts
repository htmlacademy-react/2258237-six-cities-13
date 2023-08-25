import { SortingOptions } from './types/sorting';

export const BASEDATA = {
  userLogin: 'Oliver.conner@gmail.com',
  favoriteHotelsCount: 3,
  currentOffersInCity: 3,
  currentCityName: 'Amsterdam',
} as const;

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const COUNT_OF_SYMBOLS_REVIEW = 50;

export const TILE_LAYER =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

export const COPYRIGHT =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export const URL_MARKER_DEFAULT = './img/pin.svg';

export const URL_MARKER_CURRENT = './img/pin-active.svg';

export const SORT_OPTIONS: SortingOptions[] = [
  { type: 'popular', title: 'Popular'},
  { type: 'priceRaise', title: 'Price: low to high'},
  { type: 'priceFall', title: 'Price: hign to low'},
  { type: 'top', title: 'Top rated first'},
];
