import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './store/index.ts';

import App from './components/app/app';

import { BASEDATA } from './config.ts';
import { fetchOfferAction } from './store/api-action.ts';


store.dispatch(fetchOfferAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        userLogin={BASEDATA.userLogin}
        favoriteHotelsCount={BASEDATA.favoriteHotelsCount}
      />
    </Provider>
  </React.StrictMode>
);
