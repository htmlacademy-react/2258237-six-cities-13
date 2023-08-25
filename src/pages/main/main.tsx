import { useState } from 'react';
import { useAppSelector } from '../../hooks';

import { Offer } from '../../types/offer';

import Map from '../../components/map/map';
import Logo from '../../components/logo/logo';
import CardList from '../../components/card-list/card-list';
import LocationList from '../../components/location-list/location-list';

import { locations } from '../../mocks/locations';

type MainPageProps = {
  userLogin: string;
  favoriteHotelsCount: number;
}

function MainPage({userLogin, favoriteHotelsCount}: MainPageProps): JSX.Element {
  const [selectedOfferId, setSelectedOfferId] = useState('');

  const handleOfferCardHover = (id: string): void => {
    setSelectedOfferId(id);
  };

  const handleOfferCardLeave = (): void => {
    setSelectedOfferId('');
  };

  const offers: Offer[] = useAppSelector((store) => store.offersByCity);
  const city = useAppSelector((store) => store.city);

  return (
    <div className="page page--gray page--main">
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
                      {userLogin}
                    </span>
                    <span className="header__favorite-count">
                      {favoriteHotelsCount}
                    </span>
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
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationList locations={locations}/>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {city}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by{' '}</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              <CardList
                offers={offers}
                layout='main'
                onCardOfferHover={handleOfferCardHover}
                onCardOfferLeave={handleOfferCardLeave}
              />
            </section>
            <div className="cities__right-section">
              <Map
                city={offers[0].city}
                offers={offers}
                selectedOfferId={selectedOfferId}
                layout='main'
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
