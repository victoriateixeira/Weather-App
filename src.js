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

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".currentTemp");
  let cityDisplay = document.querySelector("#city");
  let description = document.querySelector("#description");
  let icon = document.querySelector("#icon");

  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  celsiusTemperature = response.data.main.temp;
  currentTemp.innerHTML = temperature;
  cityDisplay.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;

  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function changeCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = Math.round(celsiusTemperature);
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
}
function changeFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".currentTemp");
  fahrenheitTemp = Math.round(1.8 * celsiusTemperature + 32);
  currentTemp.innerHTML = fahrenheitTemp;
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
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

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "5e59e76c3eb712e736de8c6fc4962890";
  let apiUrlLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlLocation).then(showTemperatureLocation);
}

navigator.geolocation.getCurrentPosition(handlePosition);

let goButton = document.querySelector("#city-form");
goButton.addEventListener("submit", displayCity);
goButton.addEventListener("submit", getWeather);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", handlePosition);

let celsiusTemperature = null;
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeFahrenheit);
