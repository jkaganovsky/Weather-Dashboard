// Set variable for current date using moment.js
var today = moment().format("(MM/DD/YYYY)");

// Populate a single day forecast card/
function fillForecastCard(date, dayForecast) {
  var newForecastCardDiv = $("<div>").addClass("col bg-primary text-white rounded ml-3");
  var dateEl = $("<p>").text(date);
  var iconEl = getWeatherIcon(dayForecast.weather[0].icon);
  var TempEl = $("<div>").text('Temp: ' + convertKtoF(dayForecast.temp.max) + 'ºF');
  var HumidityEl = $("<div>").text('Humidity: ' + dayForecast.humidity + '%');

  newForecastCardDiv.append(dateEl, iconEl, TempEl, HumidityEl);
  $(".card-deck").append(newForecastCardDiv);
}

// Creates a new img element associated with a given forecastId.
function getWeatherIcon(forecastId) {
  // var forecastId = response.daily[0].weather[0].icon;
  var newImgEl = $("<img>").attr("src", `http://openweathermap.org/img/wn/${forecastId}@2x.png`);
  return newImgEl;
}

// Updates cityName and weather for the next 6-days forecast data
function populateCityData(cityForecast) {
  var iconId = cityForecast.weather[0].icon;
  console.log(iconId);

  // Pushes the values (cityName, date, and weather icon) to the page on page load
  $("#location").text(cityForecast.name + " " + today);
  $("#location").append(getWeatherIcon(iconId));

  // Set variable for the temperature response
  var temp = cityForecast.main.temp;

  // Set variable for the converted temp to fahrenheit
  var calcTemp = convertKtoF(temp);

  // Append to the page the location entry's current temperature, wind speed, and humidity
  $("li").remove(".list-group");
  $("#current-weather").append("<li class=list-group>" + 'Temperature: ' + calcTemp + ' ºF' + "</li>");
  $("#current-weather").append("<li class=list-group>" + 'Wind Speed: ' + cityForecast.wind.speed + ' MPH' + "</li>");
  $("#current-weather").append("<li class=list-group>" + 'Humidity: ' + cityForecast.main.humidity + ' %' + "</li>");

  // Set variables for latitude and longitude
  var lat = cityForecast.coord.lat
  var lon = cityForecast.coord.lon

  populateUvi(lat, lon);

  populateForecast(lat, lon);
}

// Populates the UV Index and sets a if/else style
function populateUvi (lat, lon) {
  // Set variable to pull the UV Index from openweather API
  var uviUrl = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=fd427a830aad982e864b2dfe048a7248`;

  $.ajax({
    url: uviUrl,
    method: "GET"
  }) .then(function(response) {

  // Logs to view the values from the uvi variable
  console.log(response);
  console.log(response.value);

  var uvIndex = response.value
  // Append to the page the UVI index
  $("#current-weather").append('<li class="list-group uv-index">' + 'UV Index: ' + uvIndex + "</li>");

  // Set if/else statements for
    if (uvIndex <= 3) {
      var uviLow = $(".uv-index").addClass("low");
      // return uviLow;
    } else if (uvIndex >= 3 && uvIndex <= 6) {
      var uviMod = $(".uv-index").addClass("moderate");
      // return uviMod;
    } else if (uvIndex >= 6 && uvIndex <= 8) {
      var uviHig = $(".uv-index").addClass("high");
      // return uviHig;
    } else if (uvIndex >= 8 && uvIndex <= 11) {
      var uviVhi = $(".uv-index").addClass("veryhigh");
      // return uviVhi;
    } else if (uvIndex > 11) {
      var uviExt = $(".uv-index").addClass("extreme");
      // return uviExt;
    }
  }); // End of ajax uviUrl
}

function populateForecast (lat, lon) {
  var forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current&appid=fd427a830aad982e864b2dfe048a7248`;

  // One call API AJAX GET request
  $.ajax({
    url: forecastUrl,
    method: "GET"
  }) .then(function(response) {
    console.log(response);
    console.log(response.daily[0].temp.max);
    console.log(response.daily[0].humidity);
    console.log(response.daily[0].weather[0].icon);

    $(".card-deck").children().remove();

    for (var i = 1; i < 6; i++) {
      var forecastDay = moment().add(i, 'd').format("MM/DD/YYYY");
      fillForecastCard(forecastDay, response.daily[i]);
    }
  }); // End of ajax forecastUrl
}

// Kelvin to Fahrenheit conversion for each instance the variable temp or function convertKtoF is called.
function convertKtoF (temp) {
  var tempF = (temp - 273.15) * 1.80 + 32;
  return tempF.toFixed(1);
}

// Get user input from search-input
// Get value on button click
$("#city-search").click(function(){

  var cityName = $("#search-input").val().toUpperCase();
  console.log(cityName);

  $("#list-tab").prepend('<li class="list-group-item">' + cityName + "</li>");

  getCityWeather(cityName);

  // Stores each cityName entered by user
  localStorage.setItem("btn", cityName);
});

// Update weather display based on the clicked cityName
$(".list-group").click(function(event){
  var cityName = event.target.innerHTML;

  getCityWeather(cityName);
});

// Get current weather for cityName from openweather API and updates the page
function getCityWeather(cityName) {
  var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=fd427a830aad982e864b2dfe048a7248`;

  $.ajax({
  url: weatherUrl,
  method: "GET"
  }).then(function(response) {
    populateCityData(response);
    });
}

// City forecast on page load
$("#city-search").ready(function() {
  var defaultCity = "SEATTLE";

  // Gets last city entered by user.
  var lastCity = localStorage.getItem("btn");
  console.log(lastCity);

  if (lastCity !== null) {
    defaultCity = lastCity;
  }

  $("#list-tab").prepend('<li class="list-group-item">' + defaultCity + "</li>");

  getCityWeather(defaultCity);
});