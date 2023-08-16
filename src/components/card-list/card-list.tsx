import PlaceCard from '../../components/place-card/place-card';

import { Offer } from '../../types/offer';

type PlaceCardProps = {
  offers: Offer[];
  onCardOfferHover: (id: string) => void;
  onCardOfferLeave: () => void;
}

function CardList({offers, onCardOfferHover, onCardOfferLeave}: PlaceCardProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            title={offer.title}
            type={offer.type}
            price={offer.price}
            image={offer.images[0]}
            id={offer.id}
            onCardOfferHover={onCardOfferHover}
            onCardOfferLeave={onCardOfferLeave}
          />
        ))
      }
    </div>
  );
}

export default CardList;
