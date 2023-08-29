import { Link } from 'react-router-dom';

import { AppRoute } from '../../config';

import { Offer, OfferData } from '../../types/offer';
import { useAppDispatch } from '../../hooks';
import { favoritesOfferAction } from '../../store/api-action';
import { MouseEventHandler } from 'react';

type FavoriteCityCardProps = {
  city: string;
  offers: (Offer | OfferData)[];
}

type FavoriteOfferProps = {
  offer: Offer | OfferData;
}

function FavoriteOffer({offer}: FavoriteOfferProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (evt) => {
    dispatch(favoritesOfferAction({
      offerId: evt.currentTarget.id,
      status: 0
    }));
  };

  return (
    <article className="favorites__card place-card">
      {
        offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={150}
            height={110}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">
              /&nbsp;night
            </span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
            id={offer.id}
            onClick={handleButtonClick}
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: '100%' }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          {offer.title}
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}


function FavoriteCityCard({city, offers}: FavoriteCityCardProps): JSX.Element {

  return (
    <>
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoute.Main}>
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {
          offers.map((offer: Offer | OfferData): JSX.Element => <FavoriteOffer key={offer.id} offer={offer} />)
        }
      </div>
    </>
  );
}

export default FavoriteCityCard;
