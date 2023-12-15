import { getAds } from './data.js';
import { renderCards } from './card.js';
// import './form.js';

const ad = getAds();
renderCards(ad);
