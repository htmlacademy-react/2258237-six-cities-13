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
