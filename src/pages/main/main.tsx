import { useState } from 'react';
import { useAppSelector } from '../../hooks';

import { Offer } from '../../types/offer';

import Map from '../../components/map/map';
import Logo from '../../components/logo/logo';
import CardList from '../../components/card-list/card-list';
import LocationList from '../../components/location-list/location-list';
import Sorting from '../../components/sorting/sorting';
import MainEmpty from '../../components/main-empty/main-empty';
import Auth from '../../components/auth/auth';

import { locations } from '../../mocks/locations';


function MainPage(): JSX.Element {
  const [selectedOfferId, setSelectedOfferId] = useState('');

  const handleOfferCardHover = (id: string): void => {
    setSelectedOfferId(id);
  };

  const handleOfferCardLeave = (): void => {
    setSelectedOfferId('');
  };

  const offers: Offer[] = useAppSelector((store) => store.offersByCity);
  const city = useAppSelector((store) => store.city);

  const mainSectionClassName = `page__main page__main--index ${offers.length === 0
    ? 'page__main--index-empty'
    : ''}`;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <Auth />
          </div>
        </div>
      </header>
      <main className={mainSectionClassName}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationList locations={locations}/>
        </div>
        {
          offers.length !== 0 &&
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offers.length} places to stay in {city}</b>
                  <Sorting />
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
        }
        {
          offers.length === 0 &&
            <MainEmpty city={city}/>
        }
      </main>
    </div>
  );
}

export default MainPage;
