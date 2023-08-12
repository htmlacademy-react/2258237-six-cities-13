import PlaceCard from '../../components/place-card/place-card';

import { Offer } from '../../types/offer';

type PlaceCardProps = {
  offers: Offer[];
  onListOfferHover: (id: string) => void;
  onListOfferLeave: () => void;
}

function CardList({offers, onListOfferHover, onListOfferLeave}: PlaceCardProps): JSX.Element {
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
            onListOfferHover={onListOfferHover}
            onListOfferLeave={onListOfferLeave}
          />
        ))
      }
    </div>
  );
}

export default CardList;
