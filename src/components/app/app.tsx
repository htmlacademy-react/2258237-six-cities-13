import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../config';

import { Offer } from '../../types/offer';

import MainPage from '../../pages/main/main';
import FavoritePage from '../../pages/favorites/favorites';
import LoginPage from '../../pages/login/login';
import OfferPage from '../../pages/offer/offer';
import Page404 from '../../pages/404/404';

import PrivateRoute from '../private-route/private-route';

type AppScreenProps = {
  userLogin: string;
  favoriteHotelsCount: number;
  offers: Offer[];
}

function App({userLogin, favoriteHotelsCount, offers}: AppScreenProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>

          <Route
            path={AppRoute.Main}
            element={
              <MainPage
                userLogin={userLogin}
                favoriteHotelsCount={favoriteHotelsCount}
              />
            }
          />

          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <FavoritePage offers={offers} />
              </PrivateRoute>
            }
          />

          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />

          <Route path={AppRoute.Offer}>
            <Route index element={<Page404 />} />
            <Route path=':id' element={<OfferPage offers={offers}/>} />
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
