import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../config';
import { useEffect } from 'react';

import MainPage from '../../pages/main/main';
import FavoritePage from '../../pages/favorites/favorites';
import LoginPage from '../../pages/login/login';
import OfferPage from '../../pages/offer/offer';
import Page404 from '../../pages/404/404';
import Loader from '../loader/loader';

import { PrivateRouteFavorites } from '../private-route/private-route';
import { PrivateRouteLogin } from '../private-route/private-route';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOffers, getStatusLoading } from '../../store/offers-data/offers-data.selectors';
import { getAuthorizationStatus } from '../../store/auth-process/auth-process.selectors';
import { fetchOfferAction, getFavoriteOffersAction, loginAction } from '../../store/api-action';
import { getToken } from '../../services/token';


function App(): JSX.Element {
  // const dispatch = useAppDispatch();
  const isOffersDataLoading = useAppSelector(getStatusLoading);
  const authorizationStatus = useAppSelector(getAuthorizationStatus) as AuthorizationStatus;
  // const offers = useAppSelector(getOffers);
  // const token = getToken();


  if (isOffersDataLoading) {
    return (
      <Loader />
    );
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>

          <Route
            path={AppRoute.Main}
            element={
              <MainPage />
            }
          />

          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRouteFavorites
                authorizationStatus={authorizationStatus}
              >
                <FavoritePage />
              </PrivateRouteFavorites>
            }
          />

          <Route
            path={AppRoute.Login}
            element={
              <PrivateRouteLogin
                authorizationStatus={authorizationStatus}
              >
                <LoginPage />
              </PrivateRouteLogin>
            }
          />

          <Route path={AppRoute.Offer}>
            <Route index element={<Page404 />} />
            <Route path=':id' element={<OfferPage />} />
          </Route>

          <Route
            path='*'
            element={<Page404 />}
          />

        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
