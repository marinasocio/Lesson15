import elements from '../config/ui';

class FormUi {
	constructor(el) {
		this.form = el.form;
		this.countryOrigin = el.countryOrigin;
		this.countryDestination = el.countryDestination;
		this.cityOrigin = el.cityOrigin;
		this.cityDestination = el.cityDestination;
		this.airlinesName = el.airlinesName;
	}

	renderCountries(countries) {
		const fragment = FormUi.generateSelectFragment(countries);
		const clone = fragment.cloneNode(true);
		this.countryOrigin.appendChild(fragment);
		this.countryDestination.appendChild(clone);
	}

	renderCities(selectName, cities) {
		this[selectName].innerHTML = '';
		const fragment = FormUi.generateSelectFragment(cities);
		this[selectName].appendChild(fragment);
		this[selectName].disabled = false;
		this[selectName].focus();
	}

	renderAirlines(code, airline) {
		var src = document.getElementById('airlinesName');
		var img = document.createElement('img');
		img.style.width = "150px";
		console.log(code);
		img.src = "http://pics.avs.io/200/200/" + code +".png";
		src.appendChild(img);
		var ticketAirline = document.createTextNode(airline);
		src.appendChild(ticketAirline);

	}

	static generateSelectFragment(arr) {
		const fragment = document.createDocumentFragment();
		arr.forEach(({ name, code }) => {
			const option = FormUi.optionTemplate(name, code);
			fragment.appendChild(option);
		});

		return fragment;
	}

	static optionTemplate(label, value) {
		return new Option(label, value);
	}
}

const formUi = new FormUi(elements);

export default formUi;
