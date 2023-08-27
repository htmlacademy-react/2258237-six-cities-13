import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../types/state';
import { Offer, OfferData } from '../types/offer';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';

import { APIRoute, AuthorizationStatus } from '../config';
import { getOfferData, getOfferReviews, getOffersNear, loadOffers, postNewComment, requireAuthorization, setOffersDataLoading, setUserData } from './action';
import { dropToken, saveToken } from '../services/token';
import { Comment, Review } from '../types/review';


export const fetchOfferAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoading(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(setOffersDataLoading(false));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(setUserData(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);

export const fetchOfferDataAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOfferData',
  async (offerId, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoading(true));
    const {data: offer} = await api.get<OfferData>(`${APIRoute.Offers}/${offerId}`);
    const {data: reviews} = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
    const {data: offersNear} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}${APIRoute.NearBy}`);
    dispatch(getOfferData(offer));
    dispatch(getOfferReviews(reviews));
    dispatch(getOffersNear(offersNear));
    dispatch(setOffersDataLoading(false));
  }
);

export const postNewCommentAction = createAsyncThunk<void, Comment, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'postNewComment',
  async (param, {dispatch, extra: api}) => {
    const {offerId, rating, comment} = param;
    const {data} = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, {rating, comment});
    dispatch(postNewComment(data));
  },
);
