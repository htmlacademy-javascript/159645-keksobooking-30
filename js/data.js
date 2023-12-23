import { getRandomInteger, getRandomArrayElement, getRandomFloat } from './utils.js';

const COUNT_OFFERS = 10;

const OFFERS_TITLE = [
  'Квартира-студия в центре',
  'Уютная квартира в тихом районе',
  'Студия в престижном районе',
  'Комната в благоустроенной квартире',
  'Двушка рядом с метро',
  'Просторный дом'
];

const DESCRIPTIONS = [
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

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const PriceRange = {
  MIN: 0,
  MAX: 100000
};

const LatRange = {
  MIN: 35.65000,
  MAX: 35.70000
};

const LngRange = {
  MIN: 139.70000,
  MAX: 139.80000
};

let currentAvatarId = 1;

const createFeatures = (array) => {
  const count = getRandomInteger(1, array.length - 1);
  const newSet = new Set();
  while(newSet.size < count) {
    newSet.add(getRandomArrayElement(array));
  }

  return Array.from(newSet);
};

const createPhotos = () => Array.from(
  { length: getRandomInteger(1, PHOTOS.length - 1) },
  () => getRandomArrayElement(PHOTOS),
);

const createAuthor = () => ({
  avatar: `img/avatars/user${`${currentAvatarId++}`.padStart(2, '0')}.png`,
});

const createLocation = () => {
  const lat = getRandomFloat(LatRange.MIN, LatRange.MAX).toFixed(5);
  const lng = getRandomFloat(LngRange.MIN, LngRange.MAX).toFixed(5);

  return `${lat}, ${lng}`;
};

const createOffer = () => ({
  title: getRandomArrayElement(OFFERS_TITLE),
  address: createLocation(),
  price: getRandomInteger(PriceRange.MIN, PriceRange.MAX),
  type: getRandomArrayElement(TYPES),
  rooms: getRandomInteger(1, 5),
  guests: getRandomInteger(1, 10),
  checkin: getRandomArrayElement(CHECKIN_TIME),
  checkout: getRandomArrayElement(CHECKIN_TIME),
  features: createFeatures(FEATURES),
  description: getRandomArrayElement(DESCRIPTIONS),
  photos: createPhotos()
});

const createRandomAd = () => ({
  author: createAuthor(),
  offer: createOffer(),
  location: createLocation()
});

const getAds = () => Array.from(
  { length: COUNT_OFFERS },
  (_, offerIndex) => createRandomAd(offerIndex + 1),
);

export { getAds };
