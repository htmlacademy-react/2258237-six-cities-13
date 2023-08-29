import { useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';

import { logoutAction, checkAuthAction, getAuthDataAction } from '../../store/api-action';
import { useAppDispatch } from '../../hooks';
import { AuthorizationStatus, AppRoute } from '../../config';
import { getAuthorizationStatus, getUserData } from '../../store/auth-process/auth-process.selectors';
import { getFavoriteOffers } from '../../store/offers-data/offers-data.selectors';

function Auth() {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const favoritesOffers = useAppSelector(getFavoriteOffers);
  const userEmail = useAppSelector(getUserData).email;

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Unknown) {
      dispatch(checkAuthAction());
    } else if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(getAuthDataAction({}));
    }
  });


  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <Link className="header__nav-link" to={AppRoute.Login}>
              <span className="header__signout">Sign in</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to={AppRoute.Favorites}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__user-name user__name">
                {userEmail}
              </span>
              <span className="header__favorite-count">
                {favoritesOffers.length}
              </span>
            </Link>
          </li>
          <li className="header__nav-item">
            <Link
              className="header__nav-link"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
              }}
              to={AppRoute.Main}
            >
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Auth;
