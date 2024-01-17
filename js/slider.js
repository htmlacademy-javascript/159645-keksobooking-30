const MAX_PRICE = 100000;

const MIN_PRICE = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000
};

const STEP = 1000;

const sliderElement = document.querySelector('.ad-form__slider');
const priceAdForm = document.querySelector('#price');
const typeAdForm = document.querySelector('#type');

let valueCount = MIN_PRICE[typeAdForm.value];

const onSliderUpdate = () => {
  priceAdForm.value = sliderElement.noUiSlider.get();
};

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: valueCount,
      max: MAX_PRICE
    },
    step: STEP,
    start: valueCount,
    connect: 'lower',
    format: {
      to(value) {
        return value.toFixed(0);
      },
      from(value) {
        return parseFloat(value);
      }
    }
  });
  sliderElement.noUiSlider.on('update', onSliderUpdate);
};

const updateSlider = (number) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: number,
      max: MAX_PRICE
    },
    start: number,
    step: 1,
    connect: 'lower'
  });
};

function onInputPriceChange() {
  sliderElement.noUiSlider.set([priceAdForm.value, null]);
}

function onSelectTypeChange() {
  valueCount = MIN_PRICE[typeAdForm.value];
  updateSlider(valueCount);
}

const updateSliderOptions = () => {
  typeAdForm.addEventListener('change', onSelectTypeChange);
  priceAdForm.addEventListener('change', onInputPriceChange);
};

const resetSlider = () => {
  updateSlider(MIN_PRICE[typeAdForm.value]);
};

export { createSlider, updateSliderOptions, resetSlider };
