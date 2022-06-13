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
        // let currentCity = cityName.toUpperCase().split(",");
        let currentCity = cityName.split(",");
        model.currentCity = currentCity[0];
    };
    const changeUnits = (system) => {
        model.units = system;
    };
    const stringifyTemp = (temp) => {
        let tempString = parseFloat(temp.toFixed(1));
        tempString += "°" + (model.units === "imperial" ? "F" : "C");
        return tempString;
    };

    return {
        updateWeatherData,
        changeCurrentCity,
        changeUnits,
        convertCityToCoords,
        stringifyTemp,
    };
})();

const view = (() => {
    const _cityElement = document.querySelector(".main-city");
    const _tempElement = document.querySelector(".main-temp");
    const _conditionIcon = document.querySelector(".main-conditionIcon");
    const _conditionElement = document.querySelector(".main-conditionDesc");
    const _highTemp = document.querySelector(".main-high");
    const _lowTemp = document.querySelector(".main-low");

    const updateDisplay = () => {
        _cityElement.textContent = `${model.currentCity}, ${model.weather.sys.country}`;
        _tempElement.textContent = controller.stringifyTemp(model.weather.main.temp);
        _conditionIcon.src = `http://openweathermap.org/img/wn/${model.weather.weather[0].icon}@2x.png`;
        _conditionElement.textContent = model.weather.weather[0].description;
        _highTemp.textContent = controller.stringifyTemp(model.weather.main.temp_max);
        _lowTemp.textContent = controller.stringifyTemp(model.weather.main.temp_min);
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
            .then(() => _searchBox.blur())
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
                for (let i = 0; i < 2; i++) {
                    unitsButtons[i].classList.toggle("units-button-active");
                }
            }
        });
    });

    return { updateDisplay };
})();
