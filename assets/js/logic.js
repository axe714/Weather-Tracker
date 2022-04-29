var oneCallBaseEndPoint = 'https://api.openweathermap.org/data/2.5/onecall';
var weatherBaseEndPoint = 'https://api.openweathermap.org/data/2.5/weather';
var API_KEY = '180c9f853ac8fcc595fe4080e0abf997';
var units = 'imperial'

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

                    var currentCloud = oneCallData.current.weather[0].main
                    console.log('currentCloud', currentCloud)
                    document.querySelector('#today-cloud-condition').textContent += ": " + currentCloud
                    console.log(oneCallData)

                    var currentTemperature = oneCallData.current.temp
                    console.log(currentTemperature)
                    document.querySelector('#today-temp').textContent += ": " + currentTemperature + "℉"

                    var currentHumidity = oneCallData.current.humidity
                    console.log(currentHumidity)
                    document.querySelector('#today-humidity').textContent += ": " + currentHumidity
                    
                    var currentWindSpeed = oneCallData.current.wind_speed
                    console.log(currentWindSpeed)
                    document.querySelector('#today-wind').textContent += ": " + currentWindSpeed + " MPH"

                    var currentUV = oneCallData.current.uvi
                    console.log(currentUV)
                    document.querySelector('#today-uv').textContent += ": " + currentUV

                    var futureCloud = document.querySelectorAll(".future-cloud")
                    for(var i=0; i<6; i++) {
                        var futureCloudArray = oneCallData.daily[i].weather[0].main
                        console.log(futureCloudArray)
                        futureCloud[i].textContent += ": " + futureCloudArray
                    } 

                    var futureTemp = document.querySelectorAll(".future-temp")
                    for(var i=0; i<6; i++) {
                        var futureTempArray = oneCallData.daily[i].temp.day
                        console.log(futureTempArray)
                        futureTemp[i].textContent += ": " + futureTempArray + "℉"
                    }

                    var futureHumidity = document.querySelectorAll(".future-humidity")
                    for(var i=0; i<6; i++) {
                        var futureHumidityArray = oneCallData.daily[i].humidity
                        console.log(futureHumidityArray)
                        futureHumidity[i].textContent += ": " + futureHumidityArray
                    }

                    var futureWindSpeed = document.querySelectorAll(".future-wind")
                    for(var i=0; i<6; i++) {
                        var futureWindSpeedArray = oneCallData.daily[i].wind_speed
                        console.log(futureWindSpeedArray)
                        futureWindSpeed[i].textContent += ": " + futureWindSpeedArray + " MPH"
                    }

                    var futureUV = document.querySelectorAll(".future-uv")
                    for(var i=0; i<6; i++) {
                        var futureUVArray = oneCallData.daily[i].uvi
                        console.log(futureUVArray)
                        futureUV[i].textContent += ": " + futureUVArray
                    }
                })
        })
}


document.querySelector('#search-button').addEventListener('click', function () {
    var inputedCity = document.querySelector('#search-value').value
    console.log('city', inputedCity)
    getWeather(inputedCity)
})