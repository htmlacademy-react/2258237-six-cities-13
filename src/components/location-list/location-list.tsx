import LocationItem from '../location-item/location-item';

import { changeActiveCity, changeActiveOffers } from '../../store/action';
import { useAppDispatch } from '../../hooks';


type LocationListProps = {
  locations: string[];
}

function LocationList({locations}: LocationListProps) {
  const dispatch = useAppDispatch();

  const handleLocationClick = (city: string) => {
    dispatch(changeActiveCity({city}));
    dispatch(changeActiveOffers());
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">

        {
          locations.map((location) => (
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
