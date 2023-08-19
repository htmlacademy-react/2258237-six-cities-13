import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks';

import { AppRoute } from '../../config';

type LocationItemProps = {
  location: string;
  onLocationClick: (city: string) => void;
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
