import { disablesAdForm, disablesFiltersForm, activatesAdForm, activatesMapFiltersForm } from './form.js';
import { createCard } from './card.js';
import { getAds } from './data.js';

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 10;

const iconConfig = {
  url: './img/main-pin.svg',
  width: 52,
  height: 52,
  anchorX: 26,
  anchorY: 52,
};

const iconSimilarConfig = {
  url: './img/pin.svg',
  width: 40,
  height: 40,
  anchorX: 20,
  anchorY: 40,
};

const cityCenter = {
  lat: 35.68509,
  lng: 139.64948
};

const startCoordinate = {
  lat: 35.68509,
  lng: 139.64948,
};

const mapCanvas = document.querySelector('.map__canvas');
const address = document.querySelector('#address');

disablesAdForm();
disablesFiltersForm();

const map = L.map(mapCanvas)
  .on('load', () => {
    activatesAdForm();
    activatesMapFiltersForm();
  })
  .setView(cityCenter, ZOOM);

L.tileLayer(TILE_LAYER, {
  attribution: COPYRIGHT
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: iconConfig.url,
  iconSize: [iconConfig.width, iconConfig.height],
  iconAnchor: [iconConfig.anchorX, iconConfig.anchorY],
});

const mainPinMarker = L.marker(startCoordinate, {
  draggable: true,
  icon: mainPinIcon,
});

mainPinMarker.addTo(map);

address.value = `${cityCenter.lat}, ${cityCenter.lng}`;

mainPinMarker.on('moveend', (evt) => {
  const coordinate = evt.target.getLatLng();
  address.value = `${coordinate.lat.toFixed(5)}, ${coordinate.lng.toFixed(5)}`;
});

const createMarker = (point, data) => {
  const lat = point.split(',')[0].trim();
  const lng = point.split(',')[1].trim();
  const pinIcon = L.icon({
    iconUrl: iconSimilarConfig.url,
    iconSize: [iconSimilarConfig.width, iconSimilarConfig.height],
    iconAnchor: [iconSimilarConfig.anchorX, iconSimilarConfig.anchorY],
  });
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: pinIcon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(createCard(data));
};

const createMarkers = (ads) => {
  ads.forEach((ad) => {
    createMarker(ad.location, ad);
  });
};

createMarkers(getAds());

const resetMap = () => {
  mainPinMarker.setLatLng(startCoordinate);
  map.setView(startCoordinate, ZOOM);
};

export { createMarkers, resetMap };
