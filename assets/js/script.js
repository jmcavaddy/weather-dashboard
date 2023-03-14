// Global variables
var APIKey = "0c881c9806cdfc57353ca876e2fb1fab";

let city;

city = "Philadephia";

const requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`

// TODO: Create an event listener to trigger the searchCity function when the search button is clicked

let searchCity = function(event) {
  // Prevent the default behavior of the form submit (which is to refresh the page)
  event.preventDefault();
  // Get the value of the input field and save it to a variable called searchTerm
  let searchTerm = document.querySelector("#search-term").value;

  // TODO: add an if statement to handle an empty search field

  console.log(searchTerm);
  // Clear the input field
  document.querySelector("#search-term").value = "";
  // Build the URL for the API call
  const requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=${APIKey}`;
  console.log(requestUrl);
  // Make the API call using fetch()
  fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data[0].lat);
    console.log(data[0].lon);

    let searchLat = data[0].lat;
    let searchLon = data[0].lon;

    const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${searchLat}&lon=${searchLon}&appid=${APIKey}`

    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
  });
}



// const requestUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=51.5098&lon=-0.1180&limit=5&appid=${APIKey}`;

// fetch(requestUrl)
// .then(function (response) {
//   return response.json();
// })
// .then(function (data) {
//     console.log(data);
// });

document.querySelector("#search-button").addEventListener("click", searchCity);
