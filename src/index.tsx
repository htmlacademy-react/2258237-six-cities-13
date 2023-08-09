import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/app/app';

import { offers } from './mocks/offers.ts';

import { BASEDATA } from './config.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      userLogin={BASEDATA.userLogin}
      favoriteHotelsCount={BASEDATA.favoriteHotelsCount}
      currentOffersInCity={BASEDATA.currentOffersInCity}
      currentCityName={BASEDATA.currentCityName}
      offers={offers}
    />
  </React.StrictMode>
);
