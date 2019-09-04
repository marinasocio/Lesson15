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
  // airlinesName,
} = elements;

document.addEventListener('DOMContentLoaded', () => {
  initApp();

  // Events
  countryOrigin.addEventListener('change', e => {
    onCountryChange('cityOrigin', countryOrigin.value);
  });

  countryDestination.addEventListener('change', e => {
    onCountryChange('cityDestination', countryDestination.value);
  });

  countryOrigin.addEventListener('change', e => {
    onCountryChange('airlinesName', countryOrigin.value);
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    searchTickets();
  });

  // Handlers
  async function initApp() {
    await locationsStore.init();
    formUi.renderCountries(locationsStore.countries);
  }

  function onCountryChange(type, value) {
    const cities = locationsStore.getCitiesByCountryCode(value);
    // console.log(cities);
    formUi.renderCities(type, cities);
    const airlinesName = locationsStore.getAirlinesByCountryCode(value);
    let result = airlinesName.map(a => a.name);
    let airlineCode= airlinesName.map(a => a.code)
    formUi.renderAirlines(`${airlineCode}`, `${result}`);
    console.log(`${result}`);
  }

  async function searchTickets() {
    console.log(startDate.value);
    const depart_date = formateDateFromString(startDate.value, 'yyyy-MM');
    console.log(endDate.value);
    const return_date = formateDateFromString(endDate.value, 'yyyy-MM');
    console.log(cityOrigin.value);
    const origin = cityOrigin.value;
    console.log(cityDestination.value);
    const destination = cityDestination.value;
    // console.log(airlinesName.value);
    // const airlines = airlinesName.value;

    await locationsStore.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      // airlines,
    });

  }
});
// locationsStore.init().then(res => {
//   const cities = locationsStore.getCitiesByCountryCode('code');
//   console.log(cities);
// });
