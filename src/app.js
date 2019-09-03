 import './style.css';
import './plugins';
import locationsStore from './store/locations.store';
import formUi from './views/form';
import elements from './config/ui';
import { formateDateFromString } from './helpers/date';
const {
  form,
  countryDestination,
  countryOrigin,
  startDate,
  endDate,
  cityOrigin,
  cityDestination,
} = elements;

document.addEventListener('DOMContentLoaded', () => {
  initApp();

  // Events
  countryOrigin.addEventListener('change', e => {
    onCountryChange('cityOrigin', countryOrigin.value);
    console.log(countryOrigin.value);
  });

  countryDestination.addEventListener('change', e => {
    onCountryChange('cityDestination', countryDestination.value);
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    searchTickets();
  });

  // Handlers
  async function initApp() {
    await locationsStore.init();
    formUi.renderCountries(locationsStore.countries);
    console.log(locationsStore.countries);
  }

  function onCountryChange(type, value) {
    const cities = locationsStore.getCitiesByCountryCode(value);
    formUi.renderCities(type, cities);
  }

  async function searchTickets() {
    const depart_date = formateDateFromString(startDate.value, 'yyyy-MM');
    const return_date = formateDateFromString(endDate.value, 'yyyy-MM');
    const origin = cityOrigin.value;
    const destination = cityDestination.value;

    await locationsStore.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
    });

  }
});

console.log('Hello World!');
// locationsStore.init().then(res => {
//   const cities = locationsStore.getCitiesByCountryCode('GL');
//   console.log(cities);
// });
