import { Offer } from '../../types/offer';

import FavoriteCityCard from '../../components/favorite-city-card/favorite-city-card';
import Logo from '../../components/logo/logo';
import { useAppSelector } from '../../hooks';


type FavoriteCityOffers = {
  city: string;
  offers: Offer[];
}


function FavoritePage(): JSX.Element {
  const offers: Offer[] = useAppSelector((store) => store.offers);

  const favoriteCitiesOffers: FavoriteCityOffers[] = [];

  const favoriteCities: string[] = offers.reduce((acc: string[], item: Offer) => {
    if (acc.includes(item.city.name)) {
      return acc;
    }
    return [...acc, item.city.name];
  }, []);

  favoriteCities.map((city: string) => {
    favoriteCitiesOffers.push({
      city: city,
      offers: [],
    });
  });

  offers.map((offer: Offer) => {
    if (offer.isFavorite) {
      favoriteCitiesOffers.map((item: FavoriteCityOffers) => {
        if (item.city === offer.city.name) {
          item.offers.push(offer);
        }
      });
    }
  });

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                favoriteCitiesOffers.map((cityOffers: FavoriteCityOffers) => (
                  <li className="favorites__locations-items" key={cityOffers.city}>
                    <FavoriteCityCard
                      city={cityOffers.city}
                      offers={cityOffers.offers}
                    />
                  </li>
                ))
              }
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </a>
      </footer>
    </div>
  );
}

export default FavoritePage;
