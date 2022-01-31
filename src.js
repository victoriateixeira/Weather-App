function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <div class="weather-forecast-date">${formatDay(
                forecastDay.dt
              )}</div>
              <img
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="weather icon"
                class="weather-forecast-icon"
              />
              <span class="weather-forecast-temp-min">${Math.round(
                forecastDay.temp.min
              )}˚| </span>

              <span class="weather-forecast-temp-max">${Math.round(
                forecastDay.temp.max
              )}˚</span>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div >`;

  forecastElement.innerHTML = forecastHTML;
}

function displayCity(event) {
  event.preventDefault();
  let citySearched = document.querySelector("#city-searched");
  let cityDisplay = document.querySelector("h1");
  cityDisplay.innerHTML = `${citySearched.value}`;
}
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dayOfWeek = days[date.getDay()];
  let timeHour = date.getHours();
  let timeMinutes = date.getMinutes();

  if (timeHour < 10) {
    timeHour = `0${date.getHours()}`;
  }
  if (timeMinutes < 10) {
    timeMinutes = `0${date.getMinutes()}`;
  }

  return `Last updated on ${dayOfWeek}, ${timeHour}:${timeMinutes}`;
}
function getForecast(coordinates) {
  let apiKey = "5e59e76c3eb712e736de8c6fc4962890";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".currentTemp");
  let cityDisplay = document.querySelector("#city");
  let description = document.querySelector("#description");
  let icon = document.querySelector("#icon");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let celsius = document.querySelector("#celsius");

  celsiusTemperature = response.data.main.temp;
  currentTemp.innerHTML = temperature;
  celsius.innerHTML = "˚C";
  cityDisplay.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;

  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function getWeather() {
  let citySearched = document.querySelector("#city-searched");
  let apiKey = "5e59e76c3eb712e736de8c6fc4962890";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperatureLocation(response) {
  let temperatureLocation = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `Current Location`;
  let currentTempLocation = document.querySelector(".currentTemp");
  currentTempLocation.innerHTML = temperatureLocation;
}

let goButton = document.querySelector("#city-form");
goButton.addEventListener("submit", displayCity);
goButton.addEventListener("submit", getWeather);

let celsiusTemperature = null;
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeCelsius);
