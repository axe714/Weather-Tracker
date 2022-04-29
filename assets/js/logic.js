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
                    document.querySelector('#today-wind').textContent += ": " + currentWindSpeed

                })
        })
}

document.querySelector('#search-button').addEventListener('click', function () {
    var inputedCity = document.querySelector('#search-value').value
    console.log('city', inputedCity)
    getWeather(inputedCity)
})