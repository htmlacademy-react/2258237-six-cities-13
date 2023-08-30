import { SortingOptions } from './types/sorting';

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
  { type: 'priceFall', title: 'Price: high to low'},
  { type: 'top', title: 'Top rated first'},
];

export enum APIRoute {
  Offers = '/offers',
  Favorite = '/favorite',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  NearBy = '/nearby',
}

export enum SliceNames {
  Map = 'Map',
  Data = 'Data',
  Auth = 'Auth',
}

export enum StatusComment {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}
