"use stict";

// DATA Handler
dataHandler = (() => {
	let items, http, apiKey, url, data, weather;

	items = {
		weather: []
	};

	Weather = function (cityName, Description) {
		this.cityName = cityName;
		this.description = Description;
		this.temperature = '';
	};

	Object.defineProperty(Weather, 'temperature', {
		get: function() {
			return this._temperature; 
		},
		set: function(value) {
			this._temperature = (value * 1.8 + 32).toFixed(2);
		}
	});

	return {
		makeHTTPRequest: (cityName) => {
			http = new XMLHttpRequest();
			apiKey = '88035216d0ff4f9d8fd0a548c4048a60';
			url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&itemsunits=metric&appid=${apiKey}`;
			method = 'GET';

			http.open(method, url, false);
			http.onreadystatechange = () => {
				if (http.readyState == http.DONE && http.status === 200) {
					data = JSON.parse(http.responseText);
				}
			};
			http.send();
			return data;
		},

		storeWeatherData: (name, data) => {
			if (data !== null && data !== undefined) {
				weather = new Weather(data.name, data.weather[0].description);
				weather.temperature = data.main.temp;
				items.weather.push(weather);
			}
		},
		getItem: () => {
			return items.weather[0];
		},
		testing: () => {
			console.log(items);
		}
	};
})();

// UI Handler
uiHandler = (() => {
	let DOMStrings;
	DOMStrings = {
		btn: '.btn',
		inputField: '.city',
		load: '.load',
		weatherBox: '.weather',
		city: '.weatherCity',
		description: '.weatherDescription',
		temperature: '.weatherTemperature'
	};

	return {
		getInput: () => {
			return {
				cityField: document.querySelector(DOMStrings.inputField).value.toLowerCase()
			};
		},
		clearField: () => {
			let field;
			field = document.querySelector(DOMStrings.inputField);
			field.value = '';
			field.focus();
		},
		displayResult: (data) => {
			if (data !== undefined && data !== null) {			
				document.querySelector(DOMStrings.load).style.display = 'none';
				document.querySelector(DOMStrings.weatherBox).style.display = 'block';
				document.querySelector(DOMStrings.city).textContent = data.cityName;
				document.querySelector(DOMStrings.description).textContent = data.description;
				document.querySelector(DOMStrings.temperature).textContent = `${data.temperature} F`;
			}
		},
		getDOMStrings: () => {
			return DOMStrings;
		}
	};
})();

// APP Handler
appHandler = ((dtHdlr, uiHdlr) => {
	let DOM, input, cityName, getWeather, weatherData;

	// setupEventListener
	setupEventListener = function() {
		DOM = uiHdlr.getDOMStrings();

		document.querySelector(DOM.btn).addEventListener('click', getWeather);
		document.addEventListener('keypress', (event) => {
			if (event.keycode === 13 || event.which === 13) {
				getWeather();
			}
		});
	};

	getWeather = () => {
		input = uiHdlr.getInput();
		cityName = input.cityField;

		if (cityName !== '' && /^[a-z]+/i.test(cityName)) {
			console.log(cityName);
			// clear Field
			uiHdlr.clearField();

			weatherData = dtHdlr.makeHTTPRequest(cityName);
			// setTimeout(() => {
				console.log(weatherData);

				dtHdlr.storeWeatherData(cityName, weatherData);
		
				// update UI
				uiHdlr.displayResult(dtHdlr.getItem());
			// }, 3000);

		}
	};

	return {
		init: () => {
			setupEventListener();
			console.log(`App Initialization Successful!!!`);
		}
	};
})(dataHandler, uiHandler);

appHandler.init();