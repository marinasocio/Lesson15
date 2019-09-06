import aviaSalesService from '../services/aviasales.services';

class LocationsStore {
  constructor(api) {
    this.api = api;
    this.countries = {};
    this.cities = {};
    this.airlines = {};
    this.lastSearch = {};
  }
  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines(),
    ]);

    const [countries, cities, airlines] = response;
    this.countries = countries;
    this.cities = cities;
    this.airlines = airlines;
    return response;
  }
  async fetchTickets(params) {
    const response = await this.api.prices(params);
    this.lastSearch = response.data;
  }
  getCitiesByCountryCode(code) {
    return this.cities.filter(city => city.country_code === code);
  }
  getAirlinesByCountryCode(code) {
    return this.airlines.filter(airline => airline.code === code);
  }

}

const locationsStore = new LocationsStore(aviaSalesService);

export default locationsStore;