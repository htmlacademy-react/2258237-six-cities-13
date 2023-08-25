import { Offer } from '../types/offer';

export const offers: Offer[] = [
  {
    id: '6af6f741-c28d-4121-82cd-e0b462a27f01',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price:90,
    city: {
      name: 'Paris',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    isFavorite: true,
    isPremium: true,
    rating: 5,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 24,
    goods: [
      'Heating'
    ],
    host: {
      name: 'Oliver Conner',
      avatarUrl: 'https://i.pravatar.cc/123',
      isPro: false
    },
    images: [
      'https://loremflickr.com/248/152?random=111'
    ],
    maxAdults: 41
  }, {
    id: '6af6f710-c28d-4121-82cd-e0b462a27f02',
    title: 'Beautiful & luxurious apartament',
    type: 'apartment',
    price: 540,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    isFavorite: false,
    isPremium: false,
    rating: 3.4,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 1,
    goods: [
      'Heating'
    ],
    host: {
      name: 'Oliver Conner',
      avatarUrl: 'https://i.pravatar.cc/124',
      isPro: false
    },
    images: [
      'https://loremflickr.com/248/152?random=112'
    ],
    maxAdults: 2
  }, {
    id: '6af6f755-c28d-4121-82cd-e0b462a27f03',
    title: 'Beautiful location',
    type: 'apartment',
    price: 99,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8
    },
    isFavorite: true,
    isPremium: false,
    rating: 4,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 7,
    goods: [
      'Heating'
    ],
    host: {
      name: 'Oliver Conner',
      avatarUrl: 'https://i.pravatar.cc/125',
      isPro: false
    },
    images: [
      'https://loremflickr.com/248/152?random=113'
    ],
    maxAdults: 13
  }, {
    id: '6af6f711-c28d-4122-82cd-e0b462a27f04',
    title: 'House in city',
    type: 'house',
    price: 155,
    city: {
      name: 'Cologne',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8
    },
    isFavorite: true,
    isPremium: true,
    rating: 2.6,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 2,
    goods: [
      'Heating'
    ],
    host: {
      name: 'Oliver Conner',
      avatarUrl: 'https://i.pravatar.cc/126',
      isPro: false
    },
    images: [
      'https://loremflickr.com/248/152?random=115'
    ],
    maxAdults: 3
  }
];
