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
            let response;
            const zipRegex = new RegExp("^\\d{5}$");
            if (zipRegex.test(searchTerm)) {
                response = await fetch(
                    `http://api.openweathermap.org/geo/1.0/zip?zip=${searchTerm}&appid=${apiKey}`
                );
            } else {
                response = await fetch(
                    `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${apiKey}`
                );
            }
            const cityData = await response.json();

            if (cityData.length || cityData.lat) {
                if (cityData.length) {
                    _changeCurrentCoords({ lat: cityData[0].lat, lon: cityData[0].lon });
                    changeCurrentCity(searchTerm);
                } else {
                    _changeCurrentCoords({ lat: cityData.lat, lon: cityData.lon });
                    changeCurrentCity(cityData.name);
                }
                errorElement.classList.add("hidden");
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
        let currentCity = cityName.split(",");
        model.currentCity = currentCity[0];
    };
    const getDayPhase = () => {
        // these are calculated using Unix time stamps, e.g. 3600 === one hour
        const time = +model.weather.dt;
        const sunrise = +model.weather.sys.sunrise;
        const sunset = +model.weather.sys.sunset;
        console.log(`time = ${time}`);
        console.log(`sunrise = ${sunrise}`);
        console.log(sunrise - time);
        console.log(`sunset = ${sunset}`);
        console.log(sunset - time);
        if (time < sunrise || time > sunset) {
            return "night";
        } else if (time <= sunrise + 3600) {
            return "sunrise";
        } else if (time < sunset - 3600) {
            return "day";
        } else if (time >= sunset - 3600) {
            return "sunset";
        }
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
        getDayPhase,
    };
})();

const view = (() => {
    const _cityElement = document.querySelector(".main-city");
    const _tempElement = document.querySelector(".main-temp");
    const _conditionIcon = document.querySelector(".main-conditionIcon");
    const _conditionElement = document.querySelector(".main-conditionDesc");
    const _cloudiness = document.querySelector(".main-clouds");
    const _windSpeed = document.querySelector(".main-wind");

    const updateDisplay = () => {
        const dayPhase = controller.getDayPhase();
        changeBackgroundImg(dayPhase);
        changeImgCredit(dayPhase);

        _cityElement.textContent = `${model.currentCity}, ${model.weather.sys.country}`;
        _tempElement.textContent = controller.stringifyTemp(model.weather.main.temp);
        _conditionIcon.textContent = _getWeatherIcon(model.weather.weather[0].icon);
        _conditionElement.textContent = model.weather.weather[0].description;
        _cloudiness.textContent = model.weather.clouds.all;
        _windSpeed.textContent = model.weather.wind.speed;
        _windSpeed.classList.remove("main-wind-imperial", "main-wind-metric");
        _windSpeed.classList.add(`main-wind-${model.units}`);
    };
    const backgroundImg = document.querySelector(".background-img");
    const changeBackgroundImg = (dayPhase) => {
        let newImgUrl = `../images/${dayPhase}.jpg`;
        if (backgroundImg.style.backgroundImage !== `url("${newImgUrl}")`) {
            backgroundImg.style.backgroundImage = `url("${newImgUrl}")`;
        }
        const body = document.body;
        if (dayPhase === "day" || dayPhase === "sunset") {
            body.classList.remove("body-textLight");
            body.classList.add("body-textDark");
        } else {
            body.classList.remove("body-textDark");
            body.classList.add("body-textLight");
        }
    };
    const changeImgCredit = (dayPhase) => {
        let newUrl;
        let artist;
        let siteUrl = "https://unsplash.com";
        let siteName = "Unsplash";
        switch (dayPhase) {
            case "night":
                newUrl =
                    "https://unsplash.com/@phaelnogueira?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText";
                artist = "Raphael Nogueira";
                break;
            case "sunrise":
                newUrl =
                    "https://unsplash.com/@jdiegoph?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText";
                artist = "Diego PH";
                break;
            case "day":
                newUrl =
                    "https://unsplash.com/@mrsunburnt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText";
                artist = "Xu Haiwei";
                break;
            case "sunset":
                newUrl =
                    "https://unsplash.com/es/@dewang?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText";
                artist = "Dewang Gupta";
        }
        const nameElement = document.querySelector(".photoCredit-name");
        const siteElement = document.querySelector(".photoCredit-site");
        nameElement.href = newUrl;
        nameElement.textContent = artist;
        siteElement.href = siteUrl;
        siteElement.textContent = siteName;
    };
    const _getWeatherIcon = (iconCode) => {
        let ligature;
        switch (iconCode) {
            case "01d":
                ligature = "sunny";
                break;
            case "01n":
                ligature = "dark_mode";
                break;
            case "02d":
            case "03d":
                ligature = "partly_cloudy_day";
                break;
            case "02n":
            case "03n":
                ligature = "partly_cloudy_night";
                break;
            case "04d":
            case "04n":
                ligature = "cloudy";
                break;
            case "09d":
            case "09n":
            case "10d":
            case "10n":
                ligature = "rainy";
                break;
            case "11d":
            case "11n":
                ligature = "thunderstorm";
                break;
            case "13d":
            case "13n":
                ligature = "ac_unit";
                break;
            case "50d":
            case "50n":
                ligature = "waves";
                break;
        }

        return ligature;
    };

    const _searchField = document.querySelector(".search-container");
    const _searchBox = document.querySelector(".search-box");
    const handleSearch = (e) => {
        e.preventDefault();
        controller
            .convertCityToCoords(_searchBox.value) //
            .then(controller.updateWeatherData)
            .then(updateDisplay)
            .then(
                () => _searchField.reset(),
                (err) => {
                    _searchField.reset();
                    return Promise.reject(err);
                }
            )
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
