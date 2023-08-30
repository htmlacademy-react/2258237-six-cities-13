import { Link } from 'react-router-dom';
import { AppRoute } from '../../config';
import { useAppDispatch } from '../../hooks';
import { setErrorOffer } from '../../store/offers-data/offers-data.slice';

function Logo(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <div className="header__left">
      <Link className="header__logo-link" to={AppRoute.Main} onClick={() => dispatch(setErrorOffer())}>
        <img
          className="header__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width={81}
          height={41}
        />
      </Link>
    </div>
  );
}

export default Logo;
