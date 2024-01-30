function citySearchResult(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#citySearched");
  let cityElement = document.querySelector("#weather-current-city");
  cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", citySearchResult);
