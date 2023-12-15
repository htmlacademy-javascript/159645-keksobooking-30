const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormElement = mapFiltersForm.querySelectorAll('.map__filter');

const disablesAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFormElements.forEach((element) => element.setAttribute('disabled', ''));
};

const disablesFiltersForm = () => {
  mapFiltersForm.add('ad-form--disabled');
  mapFiltersFormElement.forEach((element) => element.setAttribute('disabled', ''));
};

const activatesAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormElements.forEach((element) => element.removeAttribute('disabled', ''));
};

const activatesMapFiltersForm = () => {
  mapFiltersForm.remove('ad-form--disabled');
  mapFiltersFormElement.forEach((element) => element.removeAttribute('disabled', ''));
};

export { disablesAdForm, disablesFiltersForm, activatesAdForm, activatesMapFiltersForm };
