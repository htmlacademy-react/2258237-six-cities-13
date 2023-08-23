import { Link } from 'react-router-dom';

import { AppRoute } from '../../config';

import { Offer } from '../../types/offer';

type PlaceCardProps = {
  offer: Offer;
  layout: 'main' | 'offer';
  onCardOfferHover?: (id: string) => void;
  onCardOfferLeave?: () => void;
}

function PlaceCard(props: PlaceCardProps): JSX.Element {
  const {offer, layout, onCardOfferHover, onCardOfferLeave} = props;


  const handleCardOfferHover = (): void => {
    if (onCardOfferHover) {
      return onCardOfferHover(offer.id);
    }
  };

  const handleCardOfferLeave = (): void => {
    if (onCardOfferLeave) {
      return onCardOfferLeave();
    }
  };

  return (
    <article
      className={`${layout === 'main' ? 'cities__card' : 'near-places__card'} place-card`}
      onMouseEnter={handleCardOfferHover}
      onMouseLeave={handleCardOfferLeave}
    >

      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}

      <div className={`${layout === 'main' ? 'cities__image-wrapper' : 'near-places__image-wrapper'}
      place-card__image-wrapper`}
      >
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.images[0]}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}{' '}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button button"
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * 20}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>
            {offer.title}
          </Link>
        </h2>

        <p className="place-card__type">{offer.type}</p>
      </div>

    </article>
  );
}

export default PlaceCard;
