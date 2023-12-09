const getRandomInteger = (a = 0, b = 100) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomFloat = (min, max) => Math.random() * (max - min + 1) + min;

const getRandomArrayElement = (items) =>
  items[getRandomInteger(0, items.length - 1)];

export { getRandomInteger, getRandomArrayElement, getRandomFloat };
