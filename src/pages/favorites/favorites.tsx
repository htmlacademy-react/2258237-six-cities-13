import { Offer, OfferData } from '../../types/offer';

import FavoriteCityCard from '../../components/favorite-city-card/favorite-city-card';
import Logo from '../../components/logo/logo';
import Auth from '../../components/auth/auth';
import { useAppSelector } from '../../hooks';
import { getFavoriteOffers } from '../../store/offers-data/offers-data.selectors';
import FavoriteEmptyPage from '../favorite-empty/favorite-empty';


type FavoriteCityOffers = {
  city: string;
  offers: (Offer | OfferData)[];
}


function FavoritePage(): JSX.Element {
  const offers: (Offer | OfferData)[] = useAppSelector(getFavoriteOffers);

  const favoriteCitiesOffers: FavoriteCityOffers[] = [];

  const favoriteCities: string[] = offers.reduce((acc: string[], item: Offer | OfferData) => {
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


  offers.map((offer: Offer | OfferData) => {
    if (offer.isFavorite) {
      favoriteCitiesOffers.map((item: FavoriteCityOffers) => {
        if (item.city === offer.city.name) {
          item.offers.push(offer);
        }
      });
    }
  });


  if (favoriteCitiesOffers.length === 0) {
    return (
      <FavoriteEmptyPage />
    );
  }


  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <Auth />
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
