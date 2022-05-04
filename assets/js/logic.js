var oneCallBaseEndPoint = 'https://api.openweathermap.org/data/2.5/onecall';
var weatherBaseEndPoint = 'https://api.openweathermap.org/data/2.5/weather';
var API_KEY = '180c9f853ac8fcc595fe4080e0abf997';
var units = 'imperial';

function getWeather(city) {
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
                        // git
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



    //NEEDS ADDITIONAL LOGIC.. WORK IN PROGRESS//

    
    //save to inputed city to local storage
    localStorage.setItem('city history', inputedCity)
    
    var savedCity = localStorage.getItem('city history')
    console.log('saved city', savedCity)

    //display saved city
    document.querySelector('#saved-city').textContent = savedCity


})