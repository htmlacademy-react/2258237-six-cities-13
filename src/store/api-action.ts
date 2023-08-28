import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../types/state';
import { Offer, OfferData } from '../types/offer';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { Comment, Review } from '../types/review';

import { APIRoute } from '../config';
import { dropToken, saveToken } from '../services/token';


export const fetchOfferAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, {extra: api}) => {
    await api.get(APIRoute.Login);
  }
);

export const loginAction = createAsyncThunk<UserData, Partial<AuthData>, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async({login: email, password}, {extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    saveToken(data.token);
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

export const fetchOfferDataAction = createAsyncThunk<OfferData, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'getOfferData',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<OfferData>(`${APIRoute.Offers}/${offerId}`);
    return data;
  },
);

export const fetchOffersNearbyAction = createAsyncThunk<Offer[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'getOffersNearby',
  async (offerId, { extra: api }) => {
    const response = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}${APIRoute.NearBy}`);
    const { data } = response;
    return data;
  },
);

export const fetchOfferReviewsAction = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'getOfferReviews',
  async (offerId, { extra: api }) => {
    const response = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
    const { data } = response;
    return data;
  },
);

export const postNewCommentAction = createAsyncThunk<Review, Comment, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'postNewComment',
  async (param, { extra: api }) => {
    const {offerId, rating, comment} = param;
    const {data} = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, {rating, comment});
    return data;
  },
);
