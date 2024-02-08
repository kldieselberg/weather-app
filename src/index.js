function updateWeather(response) {
  let temperature = document.querySelector("#current-temp");
  let realtimeTemp = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#current-time");
  let date = currentDate(new Date(response.data.time));
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src = "${response.data.condition.icon_url}">`;
  temperature.innerHTML = Math.round(realtimeTemp);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = date;

  grabForecast(response.data.city);
}

function currentDate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hour}:${minutes}`;
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function grabForecast(city) {
  let apiKey = "f6fb43beoc84b39t6ab37d400ab015a0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(forecastDisplay);
  console.log(apiUrl);
}

function forecastDisplay(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
     <div class="row">
       <div class="col-2">
         <div class="forecast-date">${formatDay(day.time)}</div>
         <div class="image-1">
           <img
             src="${day.condition.icon_url}"
             class= "weather-forecast-icon"
           />
           <div class="forecast-temp">
             <div class="minmax-1">
               <strong>${Math.round(day.temperature.maximum)}° </strong>
               <span id = "min">${Math.round(day.temperature.minimum)}°</span>
             </div>
           </div>
         </div>
       </div>
     </div>
     `;
    }
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", citySearchResult);

searchCity("Bangkok");

forecastDisplay();
