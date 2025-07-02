"use strict";

searchButton.addEventListener("click", searchWeather);

function searchWeather() {
    var cityName = searchCity.value;

    loadingText.style.display = 'block';
    weatherBox.style.display = 'none';

    if(cityName.trim().length === 0) {
        return alert("Please enter a city name");
    }

    var http = new XMLHttpRequest();
    var apiKey = '';
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey;
    var method = 'GET';

    http.open(method, url);
    http.onreadystatechange = function() {
        if(http.readyState == XMLHttpRequest.DONE && http.status == 200) {
             var data = JSON.parse(http.responseText);
             var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
             weatherData.temperature = data.main.temp;
             updateWeather(weatherData);
             console.log(weatherData);
        } else if (http.readyState == XMLHttpRequest.DONE) {
            alert("Something went wrong");
            console.log(http.responseText);
        }
    }
    http.send();


}

function updateWeather(weatherData) {
    weatherCity.textContent = weatherData.cityName;
    weatherDescription.textContent = weatherData.description;
    weatherTemperature.textContent = weatherData.temperature;

    weatherBox.style.display = 'block';
    loadingText.style.display = 'none';
}