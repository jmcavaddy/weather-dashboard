// Global variables
var APIKey = "0c881c9806cdfc57353ca876e2fb1fab";

let searchCity = function(event) {
  // Prevent the default behavior of the form submit (which is to refresh the page)
  event.preventDefault();

  // Get the value of the input field/list element and save it to a variable called searchTerm
  let searchTerm;
  if (event.srcElement.id === "search-button") {
    searchTerm = document.querySelector("#search-term").value;
  } else {
    searchTerm = event.srcElement.textContent;
  }

  // TODO: add an if statement to handle an empty search field
  // if (searchTerm === "") {
  //   return;
  // }

  // Build the URL for the API call
  const requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=${APIKey}`;

  // Make the API call using fetch()
  fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // Here I have access to the data from the first city that matches the search term
    // I will first save the city name and coordinates to localStorage
    saveCity(data);
   
    // Then I'll build the URL for the second API call
    let searchLat = data[0].lat;
    let searchLon = data[0].lon;

    const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${searchLat}&lon=${searchLon}&appid=${APIKey}&units=imperial`

    // Then I'll make the second API call using fetch()
    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Here I have access to the weather data for the first city that matches the search term
      // I will now populate the current weather and forecast containers with the data
      console.log(data);
      populateCurrentWeatherContainer(data);
      populateForecastContainer(data);

      
    })
  });

  // Clear the input field
  document.querySelector("#search-term").value = "";
}

let saveCity = function(city) {
  // TODO: add code to save the city's name and coords to localStorage
  // First I'll check to see if there's anything in localStorage
  // If there isn't, I'll initialize a new array
  console.log(city[0]);
  let savedCities = JSON.parse(localStorage.getItem("savedCities"));
  if (savedCities === null) {
    savedCities = [city[0]];
  } else {
    // Add the city to the array
    savedCities.push(city[0]);
  }
  
  // Then I'll save the array back to localStorage
  localStorage.setItem("savedCities", JSON.stringify(savedCities));

  // Finally, I'll call the function to render the saved cities to the page
  renderSavedCities();

}

let renderSavedCities = function() {
  // TODO: add code to render the saved cities to the page
  // First I'll clear the container of any existing content
  document.querySelector("#history").innerHTML = "";
  // Then I'll get the savedCities from localStorage
  let savedCities = JSON.parse(localStorage.getItem("savedCities"));
  // If there are no saved cities, I'll return out of this function
  if (savedCities === null) {
    return;
  }
  // Then I'll loop through the array of cities
  for (let i = 0; i < savedCities.length; i++) {
    // For each city, I'll create a new button
    let cityBtn = document.createElement("button");
    // I'll add a class to the button
    cityBtn.classList.add("history-btn");
    // I'll add an event listener to the button
    cityBtn.addEventListener("click", searchCity);
    // I'll add the city name to the button
    cityBtn.innerHTML = savedCities[i].name;
    // I'll append the button to the saved-cities div
    document.querySelector("#history").append(cityBtn);
  }
}

let populateCurrentWeatherContainer = function(data) {
  // TODO: add code to populate the weather container with the data from the API call
  // First I'll clear the container of any existing content


}

let populateForecastContainer = function(data) {
  // TODO: add code to populate the forecast container with the data from the API call
  // First I'll clear the container of any existing content

}


document.querySelector("#search-button").addEventListener("click", searchCity);

renderSavedCities();