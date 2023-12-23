import { getAds } from './data.js';
import { renderCards } from './card.js';
import { disablesAdForm, disablesFiltersForm, activatesAdForm, activatesMapFiltersForm } from './form.js';
import './form.js';

disablesAdForm();
disablesFiltersForm();


const getCards = () => {
  const ad = getAds();
  renderCards(ad);
  activatesAdForm();
  activatesMapFiltersForm();
};

getCards();
