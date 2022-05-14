var oneCallBaseEndPoint = 'https://api.openweathermap.org/data/2.5/onecall';
var weatherBaseEndPoint = 'https://api.openweathermap.org/data/2.5/weather';
var weatherIconLink = 'https://openweathermap.org/img/wn/'
var API_KEY = '180c9f853ac8fcc595fe4080e0abf997';
var units = 'imperial';
var forecastDates = moment().add(day, 'days').format("MMM D");
var day;
var futureDate = document.querySelectorAll(".future-date")
var currentDate = document.querySelector("#current-date")


function getWeather(city) {
    //check for input (brian helped me this)
    if (!city) {
        return;
    }
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

                    for (let i = 0; i < futureDate.length; i++) {
                        futureDate[i].textContent = new Date(oneCallData.daily[i + 1].dt * 1000).toDateString() + " in " + city
                    }

                    currentDate.textContent = new Date(oneCallData.current.dt * 1000).toDateString() + " in " + city

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


                    document.querySelector('#today-uv').textContent = "UV Index: " + currentUV
                    if (currentUV >= 8) {
                        document.querySelector('#today-uv').style.color = "red"
                    } else if (currentUV >= 3 && currentUV <= 7) {
                        document.querySelector('#today-uv').style.color = "orange"
                    } else {
                        document.querySelector('#today-uv').style.color = "lightgreen"
                    }


                    var futureCloud = document.querySelectorAll(".future-cloud")
                    for (var i = 0; i < 6; i++) {
                        futureCloud[i].textContent = "";
                        var futureCloudArray = oneCallData.daily[i].weather[0].main
                        futureCloud[i].textContent = "Cloud Condition: " + futureCloudArray
                    }


                    var futureTemp = document.querySelectorAll(".future-temp")
                    for (var i = 0; i < 6; i++) {
                        futureTemp[i].textContent = "";
                        var futureTempArray = oneCallData.daily[i].temp.day
                        futureTemp[i].textContent = "Temperature: " + futureTempArray + "℉"
                    }


                    var futureHumidity = document.querySelectorAll(".future-humidity")
                    for (var i = 0; i < 6; i++) {
                        futureHumidity[i].textContent = "";
                        var futureHumidityArray = oneCallData.daily[i].humidity
                        futureHumidity[i].textContent = "Humidity: " + futureHumidityArray + "%"
                    }


                    var futureWindSpeed = document.querySelectorAll(".future-wind")
                    for (var i = 0; i < 6; i++) {
                        futureWindSpeed[i].textContent = "";
                        var futureWindSpeedArray = oneCallData.daily[i].wind_speed
                        futureWindSpeed[i].textContent = "Wind Speed: " + futureWindSpeedArray + " MPH"
                    }


                    var futureUV = document.querySelectorAll(".future-uv")
                    for (var i = 0; i < 6; i++) {
                        futureUV[i].textContent = "";
                        var futureUVArray = oneCallData.daily[i].uvi
                        futureUV[i].textContent = "UV Index: " + futureUVArray
                        if (futureUVArray >= 8) {
                            futureUV[i].style.color = "red";
                        } else if (futureUVArray >= 3 && futureUVArray <= 7) {
                            futureUV[i].style.color = "orange";
                        } else {
                            futureUV[i].style.color = "lightgreen";
                        }

                    }
                })
        })
}


document.querySelector('#search-button').addEventListener('click', function () {
    var inputedCity = document.querySelector('#search-value').value
    getWeather(inputedCity)


    //add saved cities to local storage input to local storage
    var savedCities = JSON.parse(localStorage.getItem('savedCities'));
    if (savedCities === null) {
        savedCities = [];
    }
    console.log('savedCities', savedCities)
    document.querySelector('#search-value').value = "";
})

function savedCities(cityName) {
    if (cityName == "" || cityName === null || !cityName) {
        return false;
    } else {
        var savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];
        if (!savedCities.includes(cityName)) {
            savedCities.push(cityName);
            localStorage.setItem('savedCities', JSON.stringify(savedCities));
        }


        document.querySelector('#saved-city-row').innerHTML = "";
        for (var i = 0; i < savedCities.length; i++) {
            var savedCityButton = document.createElement("button");
            savedCityButton.textContent = savedCities[i];
            savedCityButton.classList.add("saved-city-button");
            let currentCity = savedCities[i]
            document.querySelector('#saved-city-row').appendChild(savedCityButton);
            savedCityButton.addEventListener('click', function () {
                getWeather(currentCity)
            })
        }
    }
}

savedCities("Anaheim")