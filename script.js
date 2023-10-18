document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '1a1ea18c7a1e2cb7b835f4ea8f21eeaa';
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

    const searchBtn = document.getElementById('searchBtn');
    const locationInput = document.getElementById('location');
    const weatherDiv = document.querySelector('.weather');

    function displayWeather(city) {
        const apiUrl = `${baseUrl}?q=${city}&appid=${apiKey}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data); 
                if (data.main) {
                    const temperature = (data.main.temp - 273.15).toFixed(2);
                    const weatherDescription = data.weather[0].description;
                    const weatherIconClass = `wi wi-owm-${data.weather[0].id}`; 
            
                    weatherDiv.innerHTML = `
                        <i class="${weatherIconClass}"></i>
                        <p>Temperature: ${temperature}°C</p>
                        <p>Weather: ${weatherDescription}</p>
                    `;
                } else {
                    console.error('Error: Invalid data structure in the API response.');
                    weatherDiv.innerHTML = 'Please enter a valid location.';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                weatherDiv.innerHTML = 'An error occurred. Please try again.';
            });
    }

    searchBtn.addEventListener('click', () => {
        const location = locationInput.value.trim();
        if (location !== '') {
            displayWeather(location);
        }
    });

    locationInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            const location = locationInput.value.trim();
            if (location !== '') {
                displayWeather(location);
            }
        }
    });
});