const apiKey = 'aab4826e70c3c7fb18b39654bd78bd4c'; // OpenWeatherMap API key
const weatherData = document.getElementById('weatherData');
const searchButton = document.getElementById('searchButton');
const locationInput = document.getElementById('locationInput');

// Function to fetch weather data
async function fetchWeather(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
        if (!response.ok) throw new Error('Location not found');
        const data = await response.json();

        // Display weather data
        displayWeather(data);
    } catch (error) {
        weatherData.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

// Function to display weather data
function displayWeather(data) {
    weatherData.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
}

// Event listener for search button
searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeather(location);
    } else {
        weatherData.innerHTML = `<p style="color: red;">Please enter a location!</p>`;
    }
});
