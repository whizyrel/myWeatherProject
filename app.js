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
				result = response.json;
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
	let DOM, input, cityName, getWeather, weatherData;

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

			new Promise((resolve, reject) => {
				resolve(dtHdlr.makeHTTPRequest(cityName));
				reject("Nothing Worked");
			})// (dtHdlr.makeHTTPRequest(cityName))
			.then(data => {
				console.log(weatherData);
				data = dtHdlr.getWeatherData(cityName, weatherData);
				console.log(data);
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

/*{
	new Promise((resolve, reject) => {
		resolve(function hi() {
			console.log("this is the resolve");
		});
		// reject(new Error(`There was an error`));
	})
	.then((val) => {
		console.log(`${val()}`);
	})
	.catch(err => {
		console.log(`${err}`);
	})
}*/