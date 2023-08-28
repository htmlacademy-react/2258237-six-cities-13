import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../config';

import MainPage from '../../pages/main/main';
import FavoritePage from '../../pages/favorites/favorites';
import LoginPage from '../../pages/login/login';
import OfferPage from '../../pages/offer/offer';
import Page404 from '../../pages/404/404';
import Loader from '../loader/loader';

import { PrivateRouteFavorites } from '../private-route/private-route';
import { PrivateRouteLogin } from '../private-route/private-route';
import { useAppSelector } from '../../hooks';


function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector((store) => store.isOffersDataLoading);
  const authorizationStatus = useAppSelector((store) => store.authorizationStatus) as AuthorizationStatus;

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
