import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

import { store } from './store/index.ts';

import App from './components/app/app';

import { fetchOfferAction } from './store/api-action.ts';
import { checkAuthAction } from './store/api-action.ts';


// store.dispatch(checkAuthAction());
// store.dispatch(fetchOfferAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
