import LocationItem from '../location-item/location-item';

import { changeActiveCity, changeActiveOffers } from '../../store/offers-data/offers-data.slice';
import { useAppDispatch } from '../../hooks';

import { CityName } from '../../mocks/locations';
import { fetchOfferAction } from '../../store/api-action';


type LocationListProps = {
  locations: Set<CityName>;
}

function LocationList({locations}: LocationListProps) {
  const dispatch = useAppDispatch();

  const handleLocationClick = (city: CityName) => {
    dispatch(changeActiveCity({city}));
    dispatch(changeActiveOffers());
    dispatch(fetchOfferAction());
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">

        {
          Array.from(locations).map((location) => (
            <li className="locations__item" key={location}>
              <LocationItem location={location} onLocationClick={handleLocationClick} />
            </li>
          ))
        }

      </ul>
    </section>
  );
}

export default LocationList;
