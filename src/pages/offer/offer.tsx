import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Page404 from '../404/404';
import ReviewList from '../../components/review-list/review-list';
import ReviewForm from '../../components/review-form/review-form';
import Map from '../../components/map/map';
import CardList from '../../components/card-list/card-list';
import Logo from '../../components/logo/logo';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { favoritesOfferAction, fetchOfferDataAction, fetchOfferReviewsAction, fetchOffersNearbyAction } from '../../store/api-action';
import Auth from '../../components/auth/auth';
import { getOfferData, getOfferReviews, getOffersNear } from '../../store/offers-data/offers-data.selectors';
import { getAuthorizationStatus } from '../../store/auth-process/auth-process.selectors';
import { AuthorizationStatus } from '../../config';
import { AppRoute } from '../../config';


function OfferPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {id} = useParams();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const offer = useAppSelector(getOfferData);
  const reviews = useAppSelector(getOfferReviews);
  const nearOffers = useAppSelector(getOffersNear);

  const [isFavorite, setIsFavorite] = useState(offer.isFavorite);

  useEffect(() => {
    const needToGetData = offer.id !== id || Object.keys(offer).length === 0;

    if (needToGetData && id) {
      dispatch(fetchOfferDataAction(id));
      dispatch(fetchOffersNearbyAction(id));
      dispatch(fetchOfferReviewsAction(id));
    }

  }, [offer, id, dispatch, isFavorite]);


  const handleFavoriteClick = (): void => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(favoritesOfferAction({
        offerId: offer.id,
        status: Number(!isFavorite)
      }));
      setIsFavorite(!isFavorite);
    } else {
      navigate(AppRoute.Login);
    }
  };


  if (Object.keys(offer).length === 0 || !id) {
    return <Page404 />;
  }

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <Auth />
          </div>
        </div>
      </header>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {
                offer.images.map((img) => (
                  <div key={img} className="offer__image-wrapper">
                    <img
                      className="offer__image"
                      src={img}
                      alt="Photo studio"
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {
                offer.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              }
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button
                  className={`offer__bookmark-button button ${isFavorite ? 'offer__bookmark-button--active' : ''}`}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${offer.rating * 20}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What{'\''}s inside</h2>
                <ul className="offer__inside-list">
                  {
                    offer.goods.map((good) => <li key={good} className="offer__inside-item">{good}</li>)
                  }
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  {
                    offer.host.isPro &&
                    <span className="offer__user-status">Pro</span>
                  }
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">{reviews.length}</span>
                </h2>
                {
                  <ReviewList reviews={reviews}/>
                }
                {
                  <ReviewForm id={id}/>
                }
              </section>
            </div>
          </div>
          <Map
            city={offer.city}
            offers={[...nearOffers.slice(0,3), offer]}
            selectedOfferId={offer.id}
            layout='offer'
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            {
              <CardList
                offers={nearOffers.slice(0,3)}
                layout='offer'
              />
            }
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
