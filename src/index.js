function updateWeather(response) {
  let temperature = document.querySelector("#current-temp");
  let realtimeTemp = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-current-city");
  cityElement.innerHTML = response.data.city;
  temperature.innerHTML = Math.round(realtimeTemp);
}

function searchCity(city) {
  let apiKey = "f6fb43beoc84b39t6ab37d400ab015a0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function citySearchResult(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#citySearched");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", citySearchResult);

searchCity("Bangkok");
