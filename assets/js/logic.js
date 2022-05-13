var oneCallBaseEndPoint = 'https://api.openweathermap.org/data/2.5/onecall';
var weatherBaseEndPoint = 'https://api.openweathermap.org/data/2.5/weather';
var weatherIconLink = 'https://openweathermap.org/img/wn/'
var API_KEY = '180c9f853ac8fcc595fe4080e0abf997';
var units = 'imperial';
var forecastDates = moment().add(day, 'days').format("MMM D");
var day;


//adds date to corresponding cards
var weatherDate = document.querySelectorAll("h2");
for (var i = 0; i < weatherDate.length; i++) {
    weatherDate[i].textContent = forecastDates;
    forecastDates = moment().add(i + 1, 'days').format("MMM D");
}

function getWeather(city) {
    savedCities(city)
    fetch(weatherBaseEndPoint + `?q=${encodeURI(city)}&appid=${API_KEY}`)
        .then(weatherRes => weatherRes.json())
        .then(weatherData => {
            var lat = weatherData.coord.lat;
            var lon = weatherData.coord.lon;
            console.log('weather data', weatherData)
            console.log('lat and lon', { lat, lon })
            fetch(oneCallBaseEndPoint + `?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`)
                .then(oneCallRes => oneCallRes.json())
                .then(oneCallData => {

                    var currentWeatherEl = document.querySelector("#current-icon")
                    var currentWeatherIconVal = oneCallData.current.weather[0].icon
                    currentWeatherEl.setAttribute("src", weatherIconLink + currentWeatherIconVal + ".png")

                    for (var i = 0; i < 6; i++) {
                        var futureWeatherIconEl = document.querySelectorAll(".future-icon");
                        var futureIconVal = oneCallData.daily[i].weather[0].icon
                        futureWeatherIconEl[i].setAttribute("src", weatherIconLink + futureIconVal + ".png")
                    }

                    document.querySelector('#today-cloud-condition').textContent = "";
                    var currentCloud = oneCallData.current.weather[0].main
                    // console.log('currentCloud', currentCloud)
                    document.querySelector('#today-cloud-condition').textContent = "Cloud Condition: " + currentCloud
                    console.log(oneCallData)

                    document.querySelector('#today-temp').textContent = "";
                    var currentTemperature = oneCallData.current.temp
                    // console.log(currentTemperature)
                    document.querySelector('#today-temp').textContent = "Temperature: " + currentTemperature + "℉"

                    document.querySelector('#today-humidity').textContent += "";
                    var currentHumidity = oneCallData.current.humidity
                    // console.log(currentHumidity)
                    document.querySelector('#today-humidity').textContent = "Humidity: " + currentHumidity + "%"

                    document.querySelector('#today-wind').textContent = "";
                    var currentWindSpeed = oneCallData.current.wind_speed
                    // console.log(currentWindSpeed)
                    document.querySelector('#today-wind').textContent = "Wind Speed: " + currentWindSpeed + " MPH"

                    document.querySelector('#today-uv').textContent = "";
                    var currentUV = oneCallData.current.uvi
                    // console.log(currentUV)
                    document.querySelector('#today-uv').textContent = "UV Index: " + currentUV

                    var futureCloud = document.querySelectorAll(".future-cloud")
                    for (var i = 0; i < 6; i++) {
                        futureCloud[i].textContent = "";
                        var futureCloudArray = oneCallData.daily[i].weather[0].main
                        // console.log(futureCloudArray)
                        futureCloud[i].textContent = "Cloud Condition: " + futureCloudArray
                    }

                    var futureTemp = document.querySelectorAll(".future-temp")
                    for (var i = 0; i < 6; i++) {
                        futureTemp[i].textContent = "";
                        var futureTempArray = oneCallData.daily[i].temp.day
                        // console.log(futureTempArray)
                        futureTemp[i].textContent = "Temperature: " + futureTempArray + "℉"
                    }

                    var futureHumidity = document.querySelectorAll(".future-humidity")
                    for (var i = 0; i < 6; i++) {
                        futureHumidity[i].textContent = "";
                        var futureHumidityArray = oneCallData.daily[i].humidity
                        // console.log(futureHumidityArray)
                        futureHumidity[i].textContent = "Humidity: " + futureHumidityArray + "%"
                    }

                    var futureWindSpeed = document.querySelectorAll(".future-wind")
                    for (var i = 0; i < 6; i++) {
                        futureWindSpeed[i].textContent = "";
                        var futureWindSpeedArray = oneCallData.daily[i].wind_speed
                        // console.log(futureWindSpeedArray)
                        futureWindSpeed[i].textContent = "Wind Speed: " + futureWindSpeedArray + " MPH"
                    }

                    var futureUV = document.querySelectorAll(".future-uv")
                    for (var i = 0; i < 6; i++) {
                        futureUV[i].textContent = "";
                        var futureUVArray = oneCallData.daily[i].uvi
                        // console.log(futureUVArray)
                        futureUV[i].textContent = "UV Index: " + futureUVArray
                    }
                })
        })
}


document.querySelector('#search-button').addEventListener('click', function () {
    var inputedCity = document.querySelector('#search-value').value
    console.log('city', inputedCity)
    getWeather(inputedCity)
    // getWeather(savedCities)

        var weatherDate = document.querySelectorAll("h2");
        for (var i = 0; i < weatherDate.length; i++) {
        weatherDate[i].textContent = forecastDates + " in " + inputedCity;
        forecastDates = moment().add(i + 1, 'days').format("MMM D");
    }

    //create buttons for saved city
    // var savedCityButton = document.createElement("button");
    // savedCityButton.textContent = inputedCity;
    // savedCityButton.classList.add("saved-city-button");
    // document.querySelector('#saved-city-row').appendChild(savedCityButton);
    // savedCityButton.addEventListener('click', function () {
    //     getWeather(inputedCity)
    // }
    // )

    //add saved cities to local storage input to local storage
    var savedCities = JSON.parse(localStorage.getItem('savedCities'));
    if (savedCities === null) {
        savedCities = [];
    }
    console.log('savedCities', savedCities)
    document.querySelector('#search-value').value = "";
})

function savedCities(cityName) {
    var savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];
    if (!savedCities.includes(cityName)) {
        savedCities.push(cityName); 
        localStorage.setItem('savedCities', JSON.stringify(savedCities));
    }
    // if (savedCities !== null) {
    document.querySelector('#saved-city-row').innerHTML = "";
    for (var i = 0; i < savedCities.length; i++) {
        var savedCityButton = document.createElement("button");
        savedCityButton.textContent = savedCities[i];
        savedCityButton.classList.add("saved-city-button");
        console.log(savedCities[i])
        let currentCity = savedCities[i]
        document.querySelector('#saved-city-row').appendChild(savedCityButton);
        savedCityButton.addEventListener('click', function () {
            getWeather(currentCity)
        })
    }
    // } 
}

savedCities("Anaheim")

// var savedCities = JSON.parse(localStorage.getItem('savedCities'));
// if (savedCities !== null) {
//     for (var i = 0; i < savedCities.length; i++) {
//         var savedCityButton = document.createElement("button");
//         savedCityButton.textContent = savedCities[i];
//         savedCityButton.classList.add("saved-city-button");
//         document.querySelector('#saved-city-row').appendChild(savedCityButton);
//         savedCityButton.addEventListener('click', function () {
//             console.log(i)
//             getWeather(savedCities[i])
//         })}
// }




