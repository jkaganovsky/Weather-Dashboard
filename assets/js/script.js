// Get user input from search-input
$(document).ready(function(){
  // Get value on button click
  $("#city-search").click(function(){
      var str = $("#search-input").val();
      console.log(str);

  $("ul").append("<li class=list-group-item>" + str + "</li>")

  // Performing GET requests to the openweather API and logging the response to the console
  // Current weather API AJAX GET request

  var cityname = "Seattle";
  var statecode = "98125";
  console.log(`https://api.openweathermap.org/data/2.5/weather?q=${cityname},${statecode}&appid=fd427a830aad982e864b2dfe048a7248`);

  $.ajax({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${cityname},${statecode}&appid=fd427a830aad982e864b2dfe048a7248`,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });


  // 5 Day Daily Forecast API AJAX GET request
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=Seattle,98125&appid=fd427a830aad982e864b2dfe048a7248",
    method: "GET"
    }).then(function(response) {
    console.log(response);
  // console.log(response.city.name);
  });

  // UV Index API AJAX GET request
  $.ajax({
      url: "http://api.openweathermap.org/data/2.5/uvi?lat=47.6062&lon=-122.3321&appid=fd427a830aad982e864b2dfe048a7248",
      method: "GET"
      }).then(function(response) {
      console.log(response);
      });

  });

});




// Event listener for search button element
// $("#city-search").on("click", function() {
//     // Constructing a URL to search openweatherapp for the city and zip code
//     var queryCity = "api.openweathermap.org/data/2.5/forecast?q=cityname" + "&appid=";
//     var queryZip = "api.openweathermap.org/data/2.5/forecast?zip=" + "&appid=";

//     // Query parameters
//     var queryParam = { "api-key": "fd427a830aad982e864b2dfe048a7248"};

//     // Grab text input from the user's search input, add to the queryParam object
//     queryParam.q = $("#search-input");
//         .val()
//         .trim();

//     console.log(queryParam.q);
// })