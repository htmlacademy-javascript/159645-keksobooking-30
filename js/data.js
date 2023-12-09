import { getRandomInteger, getRandomArrayElement, getRandomFloat } from './utils.js';

const COUNT_OFFER = 10;

const OFFER_TITLE = [
  'Квартира-студия в центре',
  'Уютная квартира в тихом районе',
  'Студия в престижном районе',
  'Комната в благоустроенной квартире',
  'Двушка рядом с метро',
  'Просторный дом'
];

const DESCRIPTION = [
  'Квартира для 2-х человек',
  '1 комната со всеми удобствами',
  'Сдаётся на долгий срок',
  'Комфортная чистая студия для семейной пары',
  '4 больших комнаты для 4-х человек',
  'Посуточная аренда студии в центре'
];

const CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const Type = {
  PALACE: 'palace',
  FLAT: 'flat',
  HOUSE: 'house',
  BUNGALOW: 'bungalow',
  HOTEL: 'hotel'
};

const PriceRange = {
  MIN: 0,
  MAX: 100000
};

const createFeatures = () => Array.from(
  { length: getRandomInteger(1, FEATURES.length - 1) },
  () => getRandomArrayElement(FEATURES),
).join(' ');

const createPhotos = () => Array.from(
  { length: getRandomInteger(1, PHOTOS.length - 1) },
  () => getRandomArrayElement(PHOTOS),
);

let currentAvatarId = 1;

const createAuthor = () => ({
  avatar: `img/avatars/user-${`${currentAvatarId++}`.padStart(2, '0')}.png`,
});

const createLocation = () => {
  const lat = getRandomFloat(35.65, 35.7).toFixed(5);
  const lng = getRandomFloat(139.7, 139.8).toFixed(5);
  const location = {
    lat,
    lng
  };
  return location;
};

const createOffer = () => ({
  title: getRandomArrayElement(OFFER_TITLE),
  address: createLocation(),
  price: getRandomInteger(PriceRange.MIN, PriceRange.MAX),
  type: getRandomArrayElement(Object.keys(Type)),
  rooms: getRandomInteger(),
  guests: getRandomInteger(),
  checkin: getRandomArrayElement(CHECKIN_TIME),
  checkout: getRandomArrayElement(CHECKIN_TIME),
  features: createFeatures(),
  description: getRandomArrayElement(DESCRIPTION),
  photos: createPhotos(),
});

const createRandomAd = () => ({
  author: createAuthor(),
  offer: createOffer(),
  location: createLocation()
});

const getAds = () => Array.from(
  { length: COUNT_OFFER },
  (_, offerIndex) => createRandomAd(offerIndex + 1),
);

export { getAds };
