import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks';

import { AppRoute } from '../../config';

import { CityName } from '../../mocks/locations';

type LocationItemProps = {
  location: CityName;
  onLocationClick: (city: CityName) => void;
}

function LocationItem({location, onLocationClick}: LocationItemProps) {
  const currentCity = useAppSelector((store) => store.city);

  const handleLocationClick = () => onLocationClick(location);

  const classNameItem = `locations__item-link tabs__item ${(currentCity === location ? 'tabs__item--active' : '')}`;

  return (
    <Link
      className={classNameItem}
      to={AppRoute.Main}
      onClick={handleLocationClick}
    >
      <span>{location}</span>
    </Link>
  );
}

export default LocationItem;
