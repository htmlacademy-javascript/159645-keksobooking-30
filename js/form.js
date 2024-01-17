import { createSlider, updateSliderOptions, resetSlider } from './slider';

const TITLE_LENGTH = {
  min: 30,
  max: 100
};

const MAX_PRICE = 100000;

const MIN_PRICE = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000
};

const ROOMS_GUESTS_OPTIONS = {
  1: ['для 1 гостя'],
  2: ['для 2 гостей', 'для 1 гостя'],
  3: ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  100: ['не для гостей']
};

const ERROR_TITLE_MESSAGE = 'Заголовок должен содержать от 30 до 100 символов';
const ERROR_PRICE_MESSAGE = 'Максимальная цена не должна превышать 100000';
const ERROR_GUESTS_MESSAGE = 'Количество мест не соответствует количеству комнат';

const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormElement = mapFiltersForm.querySelectorAll('.map__filter');
const titleAdForm = adForm.querySelector('#title');
const priceAdForm = adForm.querySelector('#price');
const roomsCountForm = adForm.querySelector('#room_number');
const guestsCountForm = adForm.querySelector('#capacity');
const typeAdForm = adForm.querySelector('#type');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--error',
});

Pristine.setLocale('ru');
Pristine.addMessages('ru', {
  required: 'Это поле обязательно'
});

const disablesAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFormElements.forEach((element) => element.setAttribute('disabled', ''));
};

const disablesFiltersForm = () => {
  mapFiltersForm.classList.add('ad-form--disabled');
  mapFiltersFormElement.forEach((element) => element.setAttribute('disabled', ''));
};

const activatesAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormElements.forEach((element) => element.removeAttribute('disabled', ''));
  createSlider();
  updateSliderOptions();
  resetSlider ();
};

const activatesMapFiltersForm = () => {
  mapFiltersForm.remove('ad-form--disabled');
  mapFiltersFormElement.forEach((element) => element.removeAttribute('disabled', ''));
};

const onPriceChange = () => {
  priceAdForm.placeholder = MIN_PRICE[typeAdForm.value];
  pristine.validate(priceAdForm);
};

const onTimeChange = (evt) => {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
};

const onRoomsAndGuestsChange = () => {
  pristine.validate(roomsCountForm);
  pristine.validate(guestsCountForm);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

const validateAdTitle = (value) => value.length >= TITLE_LENGTH.min && value.length <= TITLE_LENGTH.max;

const validateAdPrice = (value) => value >= MIN_PRICE[typeAdForm.value] && value <= MAX_PRICE;

const validateRoomsAndGuests = () => ROOMS_GUESTS_OPTIONS[roomsCountForm.value].includes(guestsCountForm.value);

pristine.addValidator(titleAdForm, validateAdTitle, ERROR_TITLE_MESSAGE, 1, true);
pristine.addValidator(priceAdForm, validateAdPrice, ERROR_PRICE_MESSAGE, 1, true);
pristine.addValidator(guestsCountForm, validateRoomsAndGuests, ERROR_GUESTS_MESSAGE, 1, true);

typeAdForm.addEventListener('change', onPriceChange);
timeIn.addEventListener('change', onTimeChange);
timeOut.addEventListener('change', onTimeChange);
roomsCountForm.addEventListener('change', onRoomsAndGuestsChange);
guestsCountForm.addEventListener('change', onRoomsAndGuestsChange);
adForm.addEventListener('submit', onFormSubmit);

roomsCountForm.addEventListener('change', (evt) => {
  const newValue = evt.target.value;
  const guestsOptions = Array.from(guestsCountForm.querySelectorAll('option'));
  guestsOptions.forEach((element) => {
    if (newValue !== element.value) {
      element.disabled = true;
    } else {
      element.disabled = false;
    }
  });
  guestsCountForm.value = newValue;
});

export { disablesAdForm, disablesFiltersForm, activatesAdForm, activatesMapFiltersForm };
