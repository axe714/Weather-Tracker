function getWeather(city) {
    var oneCallBaseEndPoint = 'https://api.openweathermap.org/data/2.5/onecall'
    var API_KEY = '180c9f853ac8fcc595fe4080e0abf997';
    var weatherBaseEndPoint = 'https://api.openweathermap.org/data/2.5/weather';
    fetch(weatherBaseEndPoint + `?q=${encodeURI(city)}&appid=${API_KEY}`)
        .then(weatherRes => weatherRes.json())
        .then(weatherData => {
            console.log('weather data', weatherData)
            var lat = weatherData.coord.lat;
            var lon = weatherData.coord.lon;
            console.log('lat and lon', { lat, lon })
            fetch(oneCallBaseEndPoint + `?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
                .then(oneCallRes => oneCallRes.json())
                .then(oneCallData => {
                    var currentWeather = oneCallData.current.weather[0].main
                    console.log('currentWeather', currentWeather)
                    document.querySelector('#today-cloud').textContent = currentWeather
                    console.log(oneCallData)
                })
        })
}

document.querySelector('#search-button').addEventListener('click', function () {
    var inputedCity = document.querySelector('#today-city-name').value
    console.log('city', inputedCity)
    getWeather(inputedCity)
})