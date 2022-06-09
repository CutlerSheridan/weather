const model = (() => {
    let weather;
    let units = "imperial";
    let currentCity;
    let currentCoords = {
        lat: "",
        lon: "",
    };

    return {
        weather,
        units,
        currentCity,
        currentCoords,
    };
})();

const controller = (() => {
    const apiKey = "b5e38071455860799f3304abfa6cb53f";

    const updateWeatherData = async () => {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${model.currentCoords.lat}&lon=${model.currentCoords.lon}&appid=${apiKey}&units=${model.units}`
        );
        const weatherData = await response.json();
        console.log(weatherData);
        model.weather = weatherData;
    };
    const convertCityToCoords = async (searchTerm) => {
        const errorElement = document.querySelector(".search-error");

        try {
            const response = await fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${apiKey}`
            );
            const cityData = await response.json();

            if (cityData.length > 0) {
                _changeCurrentCoords({ lat: cityData[0].lat, lon: cityData[0].lon });
                errorElement.classList.add("hidden");
                changeCurrentCity(searchTerm);
            } else {
                errorElement.classList.remove("hidden");
                return Promise.reject("Not a valid city or ZIP code");
            }
        } catch (err) {
            throw err;
        }
    };
    const _changeCurrentCoords = ({ lat, lon }) => {
        model.currentCoords.lat = lat;
        model.currentCoords.lon = lon;
    };
    const changeCurrentCity = (cityName) => {
        model.currentCity = cityName;
    };
    const changeUnits = (system) => {
        model.units = system;
    };

    return { updateWeatherData, changeCurrentCity, changeUnits, convertCityToCoords };
})();

const view = (() => {
    const _cityElement = document.querySelector(".temp-city");
    const _tempElement = document.querySelector(".temp-temp");
    const _weatherElement = document.querySelector(".temp-weather");

    const updateDisplay = () => {
        _cityElement.textContent = model.currentCity;
        _tempElement.textContent =
            model.weather.main.temp.toFixed(1) + "°" + (model.units === "imperial" ? "F" : "C");
        _weatherElement.textContent = model.weather.weather[0].description;
    };

    const _searchField = document.querySelector(".search-container");
    const _searchBox = document.querySelector(".search-box");
    const handleSearch = (e) => {
        e.preventDefault();
        controller
            .convertCityToCoords(_searchBox.value) //
            .then(controller.updateWeatherData)
            .then(updateDisplay)
            .then(_searchField.reset())
            .catch((err) => console.log(err));
    };
    _searchField.addEventListener("submit", handleSearch);

    const unitsButtons = document.querySelectorAll(".units-button");
    unitsButtons.forEach((btn) => {
        btn.addEventListener("mousedown", () => {
            if (btn.id !== model.units) {
                controller.changeUnits(btn.id);
                controller
                    .updateWeatherData() //
                    .then(updateDisplay);
            }
        });
    });

    return { updateDisplay };
})();
