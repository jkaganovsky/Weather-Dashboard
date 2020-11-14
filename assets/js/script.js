// Set variable for current date using moment.js
var today = moment().format("(MM/DD/YYYY)");
var day2 = moment().add(1, 'd').format("(MM/DD/YYYY)");
var day3 = moment().add(2, 'd').format("(MM/DD/YYYY)");
var day4 = moment().add(3, 'd').format("(MM/DD/YYYY)");
var day5 = moment().add(4, 'd').format("(MM/DD/YYYY)");

console.log(day2);
console.log(day3);
console.log(day4);
console.log(day5);

// When page loads, the weather at my current city of Seattle will show
$(document).ready(function(){
  // Set variable to get the current Seattle weather from openweather API
  var seattleWeather = `https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=fd427a830aad982e864b2dfe048a7248`;

    // Set AJAX to get the response found for seattleWeather
    $.ajax({
      url: seattleWeather,
      method: "GET"
      }).then(function(response) {

        // Logs from where I grab my values
        console.log(response);
        console.log(response.weather[0].icon);

        var defaultCity = response
        // Set variable to pull the weather icon from the above url
        var iconId = response.weather[0].icon;
        // Set variable to assign the above iconId to the openweather icon link
        var img = document.createElement("img");
        console.log(img);
        // Logs to view the values from the created variables above
        console.log(iconId);
        // Pushes the values (Seattle, date, and weather icon) to the page on page load
        $("#list-tab").prepend("<li class=list-group-item>" + defaultCity.name + "</li>");
        $("#location").text(defaultCity.name + " " + today);
        $("#location").append(img);
        $("img").attr("src", `http://openweathermap.org/img/wn/${iconId}@2x.png`);


        // Set variable for the temperature response
        var temp = response.main.temp;
        // Set variable for the converted temp to fahrenheit (see function)
        var calcTemp = convertKtoF(temp);

        // Append to the page the location entry's current temperature, wind speed, and humidity
        $("#current-weather").append("<li class=list-group>" + 'Temperature: ' + calcTemp + ' ºF' + "</li>");
        $("#current-weather").append("<li class=list-group>" + 'Wind Speed: ' + response.wind.speed + ' MPH' + "</li>");
        $("#current-weather").append("<li class=list-group>" + 'Humidity: ' + response.main.humidity + ' %' + "</li>");

        // Set variable to pull the UV Index from openweather API
        var uviUrl = `http://api.openweathermap.org/data/2.5/uvi?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=fd427a830aad982e864b2dfe048a7248`;

        $.ajax({
          url: uviUrl,
          method: "GET"
          }).then(function(response) {
          // Logs to view the values from the uvi variable
          console.log(response);
          console.log(response.value);

          var uvIndex = response.value
          // Append to the page the UVI index
          $("#current-weather").append('<li class="list-group uv-index">' + 'UV Index: ' + uvIndex + "</li>");

          // Set if/else statements for
            if (uvIndex <= 2) {
              var uviLow = $(".uv-index").addClass("low");
              // return uviLow;
            } else if (uvIndex >= 3 && uvIndex <= 5) {
              var uviMod = $(".uv-index").addClass("moderate");
              // return uviMod;
            } else if (uvIndex >= 6 && uvIndex <= 7) {
              var uviHig = $(".uv-index").addClass("high");
              // return uviHig;
            } else if (uvIndex >= 8 && uvIndex <= 10) {
              var uviVhi = $(".uv-index").addClass("veryhigh");
              // return uviVhi;
            } else if (uvIndex > 11) {
              var uviExt = $(".uv-index").addClass("extreme");
              // return uviExt;
            }
          }); // End of ajax uviUrl

        var lat = response.coord.lat
        var lon = response.coord.lon
        var forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current&appid=fd427a830aad982e864b2dfe048a7248`;

        // One call API AJAX GET request
        $.ajax({
          url: forecastUrl,
          method: "GET"
          }).then(function(response) {
            console.log(response);
            console.log(response.daily[0].temp.max);
            console.log(response.daily[0].humidity);
            console.log(response.daily[0].weather[0].icon);

          var forecastId = response.daily[0].weather[0].icon;
          var forecastIcon = $("img").attr("src", `http://openweathermap.org/img/wn/${forecastId}@2x.png`);
          // Day 1
          $("#forecast1").append(today);
          $("#forecast1").append(forecastIcon);
          $("#forecast1").append('<div>' + 'Temp: ' + convertKtoF(response.daily[0].temp.max) + ' ºF' + "</div>");
          $("#forecast1").append('<div">' + 'Humidity: ' + response.daily[0].humidity + ' %' + "</div>");
          // Day 2
          $("#forecast2").append(day2);
          $("#forecast2").append(forecastIcon);
          $("#forecast2").append('<div>' + 'Temp: ' + convertKtoF(response.daily[1].temp.max) + ' ºF' + "</div>");
          $("#forecast2").append('<div>' + 'Humidity: ' + response.daily[1].humidity + ' %' + "</div>");
          // Day 3
          $("#forecast3").append(day3);
          $("#forecast3").append(forecastIcon);
          $("#forecast3").append('<div>' + 'Temp: ' + convertKtoF(response.daily[2].temp.max) + ' ºF' + "</div>");
          $("#forecast3").append('<div>' + 'Humidity: ' + response.daily[2].humidity + ' %' + "</div>");
          // Day 4
          $("#forecast4").append(day4);
          $("#forecast4").append(forecastIcon);
          $("#forecast4").append('<div>' + 'Temp: ' + convertKtoF(response.daily[3].temp.max) + ' ºF' + "</div>");
          $("#forecast4").append('<div>' + 'Humidity: ' + response.daily[3].humidity + ' %' + "</div>");
          // Day 5
          $("#forecast5").append(day5);
          $("#forecast5").append(forecastIcon);
          $("#forecast5").append('<div>' + 'Temp: ' + convertKtoF(response.daily[4].temp.max) + ' ºF' + "</div>");
          $("#forecast5").append('<div>' + 'Humidity: ' + response.daily[4].humidity + ' %' + "</div>");

          }); // End of ajax forecastUrl

      }); // End of ajax seattleWeather



  }); // End of .ready


// function populateForecast (city) {
//   var forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&exclude=current&appid=fd427a830aad982e864b2dfe048a7248`;

//   // One call API AJAX GET request
//     $.ajax({
//       url: forecastUrl,
//       method: "GET"
//       }).then(function(response) {
//         console.log(response);
//         console.log(response.daily[0].temp.max);
//         console.log(response.daily[0].humidity);
//         console.log(response.daily[0].weather[0].icon);

//       var forecastId = response.daily[0].weather[0].icon;

//       var forecastIcon = $("img").attr("src", `http://openweathermap.org/img/wn/${forecastId}@2x.png`);
//       // Day 1
//       $("#forecast").append(currentDate(today));
//       $("#forecast").append(icon);
//       $("#forecast").append('<div class="col-sm-6 justify-content-center bg-primary text-white rounded m-3">' +  + ' ºF' + "</div>");
//       $("#forecast").append('<div class="col-sm-6 justify-content-center bg-primary text-white rounded m-3">' + 'Temp: ' + convertKtoF(response.daily[0].temp.max) + ' ºF' + "</div>");
//       $("#forecast").append('<div class="col-sm-6 justify-content-center bg-primary text-white rounded m-3">' + 'Humidity: ' + response.daily[0].humidity + ' %' + "</div>");

//       }); // End of ajax forecastUrl
// }

// Current date using moment.js
// function currentDate (date) {
//   return today;
// }

// Kelvin to Fahrenheit conversion for each instance the variable temp or function convertKtoF is called.
function convertKtoF (temp) {
  var tempF = (temp - 273.15) * 1.80 + 32;
  return tempF.toFixed(1);
}



// ON BUTTON CLICK


// Get user input from search-input
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
      $("#location").html("<h4>" + currentLocation + today + "</h4>");

      var temp = response.main.temp;
      // Convert the temp to fahrenheit
      var calcTemp = convertKtoF(temp);
      // Append to page the location entry's current temperature
      $("li").remove(".list-group");
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

        var uvIndex = response.value

        // Set if/else statements for
        if (uvIndex < 3) {
          var uviLow = $(".uv-index").addClass("low");
          // return uviLow;
        } else if (uvIndex >= 3 && uvIndex < 6) {
          var uviMod = $(".uv-index").addClass("moderate");
          // return uviMod;
        } else if (uvIndex >= 6 && uvIndex < 8) {
          var uviHig = $(".uv-index").addClass("high");
          // return uviHig;
        } else if (uvIndex >= 8 && uvIndex < 11) {
          var uviVhi = $(".uv-index").addClass("veryhigh");
          // return uviVhi;
        } else if (uvIndex >= 11) {
          var uviExt = $(".uv-index").addClass("extreme");
          // return uviExt;
        }

        console.log(uviLow);
        var lat = response.lat
        var lon = response.lon
        var forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current&appid=fd427a830aad982e864b2dfe048a7248`;

        // One call API AJAX GET request
        $.ajax({
          url: forecastUrl,
          method: "GET"
          }).then(function(response) {
            console.log(response);
            console.log(response.daily[0].temp.max);
            console.log(response.daily[0].humidity);
            console.log(response.daily[0].weather[0].icon);

          var forecastId = response.daily[0].weather[0].icon;
          var forecastIcon = $("img").attr("src", `http://openweathermap.org/img/wn/${forecastId}@2x.png`);
          // Day 1
          $("#forecast1").html(today);
          $("#forecast1").append(forecastIcon);
          $("#forecast1").append('<div>' + 'Temp: ' + convertKtoF(response.daily[0].temp.max) + ' ºF' + "</div>");
          $("#forecast1").append('<div">' + 'Humidity: ' + response.daily[0].humidity + ' %' + "</div>");

          $("#forecast2").html(day2);
          $("#forecast2").append(forecastIcon);
          $("#forecast2").append('<div>' + 'Temp: ' + convertKtoF(response.daily[1].temp.max) + ' ºF' + "</div>");
          $("#forecast2").append('<div>' + 'Humidity: ' + response.daily[1].humidity + ' %' + "</div>");

          $("#forecast3").html(day3);
          $("#forecast3").append(forecastIcon);
          $("#forecast3").append('<div>' + 'Temp: ' + convertKtoF(response.daily[2].temp.max) + ' ºF' + "</div>");
          $("#forecast3").append('<div>' + 'Humidity: ' + response.daily[2].humidity + ' %' + "</div>");

          $("#forecast4").html(day4);
          $("#forecast4").append(forecastIcon);
          $("#forecast4").append('<div>' + 'Temp: ' + convertKtoF(response.daily[3].temp.max) + ' ºF' + "</div>");
          $("#forecast4").append('<div>' + 'Humidity: ' + response.daily[3].humidity + ' %' + "</div>");

          $("#forecast5").html(day5);
          $("#forecast5").append(forecastIcon);
          $("#forecast5").append('<div>' + 'Temp: ' + convertKtoF(response.daily[4].temp.max) + ' ºF' + "</div>");
          $("#forecast5").append('<div>' + 'Humidity: ' + response.daily[4].humidity + ' %' + "</div>");

          }); // End of ajax forecastUrl

      });
    });
  });