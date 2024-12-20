import './styles.css'

// Public API key 
const API_KEY = 'FM3V9NXKJDYFZLJ7SGHWVPLKS';
const API_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

async function getWeather(location) {
    const url = `${API_URL}/${encodeURIComponent(location)}?key=${API_KEY}`;
    try {
        const response = await fetch(url, {mode: 'cors'});
        const weatherData = await response.json();
        console.log(weatherData);
        return weatherData;
    } catch (error) {
        console.error('Failed to get weather data', error);
        throw error; 
    }
}

async function handleSearch(event) {
    event.preventDefault(); 
    const locationInput = document.getElementById('location-input');
    const location = locationInput.value.trim();

    if (!location) {
        alert('Please enter a valid location.');
        return;
    }

    const weatherDiv = document.getElementById('weather-result');
    weatherDiv.innerHTML = '<p>Loading...</p>'; 

    try {
        const weatherData = await getWeather(location);
        displayWeather(weatherData); 
    } catch (error) {
        weatherDiv.innerHTML = '<p>Failed to fetch weather data. Please try again.</p>';
    }
}


function displayWeather(data) {
    const weatherDiv = document.getElementById('weather-result');
    weatherDiv.innerHTML = `
        <h2>Weather in ${data.address}</h2>
        <p>Temperature: ${data.currentConditions.temp}°C</p>
        <p>Conditions: ${data.currentConditions.conditions}</p>
    `;
}

// Initialize the app
function init() {
    const form = document.getElementById('location-form');
    form.addEventListener('submit', handleSearch);
}

init();


