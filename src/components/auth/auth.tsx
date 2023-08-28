import { useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';

import { logoutAction } from '../../store/api-action';
import { useAppDispatch } from '../../hooks';

import { AuthorizationStatus, AppRoute } from '../../config';
import { getAuthorizationStatus, getUserData } from '../../store/auth-process/auth-process.selectors';
import { getFavoriteOffers } from '../../store/offers-data/offers-data.selectors';


function Auth() {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userEmail = useAppSelector(getUserData).email;
  const test = useAppSelector(getFavoriteOffers);

  if (authorizationStatus === AuthorizationStatus.NoAuth) {
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
            <a
              className="header__nav-link header__nav-link--profile"
              href="#"
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__user-name user__name">
                {userEmail}
              </span>
              <span className="header__favorite-count">
                {test.length}
              </span>
            </a>
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
