import { MouseEventHandler, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { sortOffers } from '../../store/action';

import { State } from '../../types/state';
import { SortingType } from '../../types/sorting';

import { SORT_OPTIONS } from '../../config';


function Sorting() {
  const dispatch = useAppDispatch();
  const [isShow, setIsShow] = useState(false);

  const isSelectedSortingType = useAppSelector((store: State) => store.currentSortingType);
  const isSelectedSorting = SORT_OPTIONS.find((sortOption) => sortOption.type === isSelectedSortingType) || SORT_OPTIONS[0];

  const handleSortingListClick: MouseEventHandler<HTMLElement> = () => {
    setIsShow(!isShow);
  };

  const handleSortingItemClick: MouseEventHandler<HTMLElement> = (evt) => {
    const type = evt.currentTarget.dataset.type as SortingType;
    dispatch(sortOffers({type}));
    setIsShow(!isShow);
  };

  const sortingListClassName = `places__options places__options--custom ${isShow ? 'places__options--opened' : ''}`;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by{' '}</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleSortingListClick}
      >
        {
          isSelectedSorting.title
        }
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={sortingListClassName}>
        {
          SORT_OPTIONS.map((sortOption) => (
            <li
              key={sortOption.type}
              className={`places__option ${sortOption.type === isSelectedSortingType ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={handleSortingItemClick}
              data-type={sortOption.type}
            >
              {sortOption.title}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

export default Sorting;
