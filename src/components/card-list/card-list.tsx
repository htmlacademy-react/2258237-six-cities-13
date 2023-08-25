import PlaceCard from '../../components/place-card/place-card';

import { Offer } from '../../types/offer';

type PlaceCardProps = {
  offers: Offer[];
  layout: 'main' | 'offer';
  onCardOfferHover?: (id: string) => void;
  onCardOfferLeave?: () => void;
}

function CardList({offers, layout, onCardOfferHover, onCardOfferLeave}: PlaceCardProps): JSX.Element {
  const containerClass = layout === 'main'
    ? 'cities__places-list tabs__content'
    : 'near-places__list';

  return (
    <div className={`${containerClass} places__list`}>
      {
        offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            layout={layout}
            onCardOfferHover={onCardOfferHover}
            onCardOfferLeave={onCardOfferLeave}
          />
        ))
      }
    </div>
  );
}

export default CardList;
