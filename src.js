let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let dayOfWeek = days[now.getDay()];
let timeHour = now.getHours();
let timeMinutes = now.getMinutes();

if (timeHour < 10) {
  timeHour = `0${now.getHours()}`;
}
if (timeMinutes < 10) {
  timeMinutes = `0${now.getMinutes()}`;
}
let date = `${dayOfWeek}, ${timeHour}:${timeMinutes}`;
let displayDate = document.querySelector("h2");
displayDate.innerHTML = date;

function displayCity(event) {
  event.preventDefault();
  let citySearched = document.querySelector("#city-searched");
  let cityDisplay = document.querySelector("h1");
  cityDisplay.innerHTML = `${citySearched.value}`;
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = temperature;

  function changeCelsius(event) {
    event.preventDefault();
    let temp = document.querySelector(".currentTemp");
    temp.innerHTML = temperature;
    let tempUnit = document.querySelector(".tempUnit");
    tempUnit.innerHTML = "˚C";
  }
  function changeFahrenheit(event) {
    event.preventDefault();
    let temp = document.querySelector(".currentTemp");
    temp.innerHTML = 1.8 * temperature + 32;
    let tempUnit = document.querySelector(".tempUnit");
    tempUnit.innerHTML = "˚F";
  }

  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", changeCelsius);

  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.addEventListener = ("click", changeFahrenheit);
}

function getWeather() {
  let citySearched = document.querySelector("#city-searched");
  let apiKey = "5e59e76c3eb712e736de8c6fc4962890";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
let goButton = document.querySelector("#city-form");
goButton.addEventListener("submit", displayCity);
goButton.addEventListener("submit", getWeather);

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

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", handlePosition);
