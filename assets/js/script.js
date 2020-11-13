// Get user input from search-input
$(document).ready(function(){
  // Get value on button click
  $("#city-search").click(function(){
      var cityName = $("#search-input").val();
      console.log(cityName);

  // Append each search-input below the input box, where the most recent entry is shown above the previous entry
  $("#list-tab").prepend("<li class=list-group-item>" + cityName + "</li>")

  // Performing GET requests to the openweather API and logging the response to the console

  // Current weather API AJAX GET request
  console.log(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=fd427a830aad982e864b2dfe048a7248`);

  var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=fd427a830aad982e864b2dfe048a7248`;
  $.ajax({
    url: weatherUrl,
    method: "GET"
    }).then(function(response) {

      console.log(response);
      console.log(response.coord);
      console.log(response.weather[0].icon);

      var today = moment().format (" (MM/DD/YYYY) ");
      var iconId = response.weather[0].icon;
      var icon = $("img").attr("src", `http://openweathermap.org/img/wn/${iconId}@2x.png`);
      var currentLocation = response.name;
      console.log(today);
      console.log(iconId);
      console.log(icon);
      console.log(currentLocation);
      // Append to page the user's location entry
      $("#location").append("<h4>" + currentLocation + today + "</h4>");

      var temp = response.main.temp;
      // Convert the temp to fahrenheit
      var calcTemp = convertKtoF(temp);
      // Append to page the location entry's current temperature
      $("#current-weather").append("<li class=list-group>" + 'Temperature: ' + calcTemp + ' ºF' + "</li>");
      $("#current-weather").append("<li class=list-group>" + 'Wind Speed: ' + response.wind.speed + ' MPH' + "</li>");
      $("#current-weather").append("<li class=list-group>" + 'Humidity: ' + response.main.humidity + ' %' + "</li>");

      // UV Index API AJAX GET request
      var uviUrl = `http://api.openweathermap.org/data/2.5/uvi?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=fd427a830aad982e864b2dfe048a7248`;
      var forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&exclude=current&appid=fd427a830aad982e864b2dfe048a7248`;

      $.ajax({
        url: uviUrl,
        method: "GET"
        }).then(function(response) {
        console.log(response);
        console.log(response.value);

        $("#current-weather").append("<li class=list-group>" + 'UV Index: ' + response.value + "</li>");

      // One call API AJAX GET request
      $.ajax({
        url: forecastUrl,
        method: "GET"
        }).then(function(response) {
        console.log(response);
        console.log(response.daily[0].temp.max);
        console.log(response.daily[0].humidity);
        console.log(response.daily[0].weather[0].icon);

        var forecastDiv = $("<div>").addClass("col-sm-6 justify-content-center bg-primary text-white rounded m-3>");
        console.log(forecastDiv);
        // Day 1
        $("#forecast").append("<div>" + forecastDiv + 'Temp: ' + convertKtoF(response.daily[0].temp.max) + ' ºF' + "</div>");
        $("#forecast").append("<div>" + forecastDiv + 'Humidity: ' + response.daily[0].humidity + ' %' + "</div>");

        // Day 2
        $("#forecast").append("<div>" + forecastDiv + 'Temp: ' + convertKtoF(response.daily[1].temp.max) + ' ºF' + "</div>");
        $("#forecast").append("<div>" + forecastDiv + 'Humidity: ' + response.daily[1].humidity + ' %' + "</div>");

        // Day 3
        $("#forecast").append("<div>" + forecastDiv + 'Temp: ' + convertKtoF(response.daily[2].temp.max) + ' ºF' + "</div>");
        $("#forecast").append("<div>" + forecastDiv + 'Humidity: ' + response.daily[2].humidity + ' %' + "</div>");

        // Day 4
        $("#forecast").append("<div>" + forecastDiv + 'Temp: ' + convertKtoF(response.daily[3].temp.max) + ' ºF' + "</div>");
        $("#forecast").append("<div>" + forecastDiv + 'Humidity: ' + response.daily[3].humidity + ' %' + "</div>");

        // Day 5
        $("#forecast").append("<div>" + forecastDiv + 'Temp: ' + convertKtoF(response.daily[4].temp.max) + ' ºF' + "</div>");
        $("#forecast").append("<div>" + forecastDiv + 'Humidity: ' + response.daily[4].humidity + ' %' + "</div>");

        });

      });
    });
  });
});

// Function to convert the temp to fahrenheit with an output of upto 1 decimal point
function convertKtoF (temp) {
  var tempF = (temp - 273.15) * 1.80 + 32;
  return tempF.toFixed(1);
}