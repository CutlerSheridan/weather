const model = (() => {
    let weather;
    let units = "imperial";
    let currentCity;

    return {
        weather,
        units,
        currentCity,
    };
})();

const controller = (() => {
    const updateWeatherData = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${model.currentCity}&appid=b5e38071455860799f3304abfa6cb53f&units=${model.units}`
            );
            if (response.ok) {
                const weatherData = await response.json();
                model.weather = weatherData;
                model.currentCity = weatherData.name;
            } else {
                console.log(response);
                console.log("not a city");
            }
        } catch (err) {
            throw err;
        }
    };

    const changeUnits = (system) => {
        if (model.units !== system) {
            model.units = system;
        }
    };

    return { updateWeatherData, changeUnits };
})();

const view = (() => {
    const _cityElement = document.querySelector(".temp-city");
    const _tempElement = document.querySelector(".temp-temp");
    const _weatherElement = document.querySelector(".temp-weather");

    const updateDisplay = () => {
        _cityElement.textContent = model.weather.name;
        _tempElement.textContent =
            model.weather.main.temp.toFixed(1) + "°" + (model.units === "imperial" ? "F" : "C");
        _weatherElement.textContent = model.weather.weather[0].main;
    };

    const unitsButtons = document.querySelectorAll(".units-button");
    unitsButtons.forEach((btn) => {
        btn.addEventListener("mousedown", () => {
            controller.changeUnits(btn.id);
            controller
                .updateWeatherData() //
                .then(updateDisplay);
        });
    });

    return { updateDisplay };
})();

model.currentCity = "los angeles";
controller
    .updateWeatherData() //
    .then(() => console.log(model.weather))
    .then(() => view.updateDisplay())
    .catch((err) => console.log(err));
