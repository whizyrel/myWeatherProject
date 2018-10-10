"use stict";

// DATA Handler
dataHandler = (() => {
	let items, http, apiKey, url, data, weather;

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
			let apiKey, url, err;
			apiKey = '88035216d0ff4f9d8fd0a548c4048a60';
			url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&itemsunits=metric&appid=${apiKey}`;

			fetch(url)
			.then((response) => {
				// convert response to JSON
				result = response.json();
				console.log(result);
				return result;
			})
			.catch((err) => {
				error = new Error('Something went wrong. Please check the City name and try again');
				console.log(`${err}: ${error}`);
			});
			// return data;
		},
		getWeatherData: (name, data) => {
			if (data !== null && data !== undefined) {
				weather = new Weather(data.name, data.weather[0].description);
				weather.temperature = data.main.temp;
				return weather;
				// items.weather.push(weather);
			}
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
	let DOM, input, cityName, getWeather, weatherData, waitTime;

	setupServiceWorker = () => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('./sw.js')
			.then((res) => {
				console.log('[Service Worker] registered');
			})
			.catch(err => {
				console.log(`${err}: [Service Worker] not registered`);
			});
		} else {
			console.log('[Service Worker] not found on this browser');
		}
	}

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
		cityName = uiHdlr.getInput().cityField;

		if (cityName !== '' && /^[a-z]+/i.test(cityName)) {
			console.log(cityName);
			// clear Field
			uiHdlr.clearField();
			new Promise((resolve) => {
				async function getData() {
				// try async await
					return await dtHdlr.makeHTTPRequest(cityName);
					// return result; 
				}
				return resolve(getData());
			})
			.then(data => {
				console.log(data);
				/*
				setTimeout for 3000
				if data is different from undefined, setTimeout to 0
				then execute callback

				setTimeout(function(){

					if (data !== undefined) {
						console.log(data);
						waitTime = 0;
					}
				}, waitTime);

				if all these doesnt work fallback to xhr
				*/
				return data = dtHdlr.getWeatherData(cityName, data);
				// update UI
				// uiHdlr.displayResult(data);
			})
			.catch(err => {
				console.log(`${err}`);
			});
			// setTimeout(() => {
			// }, 3000);
		}
	};

	return {
		init: () => {
			setupServiceWorker();
			setupEventListener();
			console.log(`App Initialization Successful!!!`);
		}
	};
})(dataHandler, uiHandler);

appHandler.init();

/*
// solve asynchronous problems with fetch
// convert promise to json
*/

/*
1. get today's date
2. get next day = today++;

construct full day from parameters above


// predefined time
on install, notify user of weather
then at predefined time;
else cannot get weather update, enable network connectivity

// user specified time
2. get today's time minus time from 23:59

*/