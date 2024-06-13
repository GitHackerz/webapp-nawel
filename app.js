// Fetch weather data from OpenWeatherMap API
async function fetchWeather(city) {
    const apiKey = 'a7452ad514323c969885d66e7f1dcefd'; // Replace with your OpenWeatherMap API key
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
        throw new Error('City not found');
    }
    const data = await response.json();
    return data;
}

// Display weather data in the DOM
function displayWeather(data) {
    const weatherContainer = document.getElementById('weather');
    weatherContainer.innerHTML = `
        <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 class="text-2xl font-bold text-center">Weather in ${data.name}</h2>
            <div class="flex items-center space-x-4">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" viewBox="0 0 320 512">
                        <path d="M160 64c-26.5 0-48 21.5-48 48V276.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112V276.5c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6V112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V144c0-8.8 7.2-16 16-16s16 7.2 16 16V322.7c18.6 6.6 32 24.4 32 45.3z"/>
                    </svg>
                </div>
                <div>
                    <p class="text-gray-700">Temperature: ${data.main.temp}°C</p>
                </div>
            </div>
            <div class="flex items-center space-x-4">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" viewBox="0 0 384 512">
                        <path d="M0 208C0 104.4 75.7 18.5 174.9 2.6C184 1.2 192 8.6 192 17.9V81.2c0 8.4 6.5 15.3 14.7 16.5C307 112.5 384 199 384 303.4c0 103.6-75.7 189.5-174.9 205.4c-9.2 1.5-17.1-5.9-17.1-15.2V430.2c0-8.4-6.5-15.3-14.7-16.5C77 398.9 0 312.4 0 208zm288 48A96 96 0 1 0 96 256a96 96 0 1 0 192 0zm-96-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                    </svg>
                </div>
                <div>
                    <p class="text-gray-700">Humidity: ${data.main.humidity}%</p>
                </div>
            </div>
            <div class="flex items-center space-x-4">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" viewBox="0 0 512 512">
                        <path d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/>
                    </svg>

                </div>
                <div>
                    <p class="text-gray-700">Wind Speed: ${data.wind.speed} m/s</p>
                </div>
            </div>
            <div class="flex items-center space-x-4">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" viewBox="0 0 512 512">
                        <path d="M168.2 384.9c-15-5.4-31.7-3.1-44.6 6.4c-8.2 6-22.3 14.8-39.4 22.7c5.6-14.7 9.9-31.3 11.3-49.4c1-12.9-3.3-25.7-11.8-35.5C60.4 302.8 48 272 48 240c0-79.5 83.3-160 208-160s208 80.5 208 160s-83.3 160-208 160c-31.6 0-61.3-5.5-87.8-15.1zM26.3 423.8c-1.6 2.7-3.3 5.4-5.1 8.1l-.3 .5c-1.6 2.3-3.2 4.6-4.8 6.9c-3.5 4.7-7.3 9.3-11.3 13.5c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c5.1 0 10.2-.3 15.3-.8l.7-.1c4.4-.5 8.8-1.1 13.2-1.9c.8-.1 1.6-.3 2.4-.5c17.8-3.5 34.9-9.5 50.1-16.1c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9zM144 272a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm144-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm80 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/>
                    </svg>

                </div>
                <div>
                    <p class="text-gray-700">Description: ${data.weather[0].description}</p>
                </div>
            </div>
        </div>
    `;
}

// Fetch city suggestions from GeoNames API
async function fetchCitySuggestions() {
    const city = document.getElementById('city').value;
    if (city.length < 3) {
        document.getElementById('suggestions').innerHTML = '';
        return;
    }

    const username = 'habibbibani79'; // Replace with your GeoNames username
    const response = await fetch(`http://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=${username}`);
    const data = await response.json();
    displaySuggestions(data.geonames);
}

// Display city suggestions in the DOM
function displaySuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = '';
    suggestions.forEach(suggestion => {
        const suggestionDiv = document.createElement('div');
        suggestionDiv.className = 'p-2 hover:bg-gray-200 cursor-pointer';
        suggestionDiv.textContent = `${suggestion.name}, ${suggestion.countryName}`;
        suggestionDiv.addEventListener('click', () => {
            document.getElementById('city').value = suggestion.name;
            suggestionsContainer.innerHTML = '';
        });
        suggestionsContainer.appendChild(suggestionDiv);
    });
}

// Handle search button click
document.getElementById('search').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    try {
        const weatherData = await fetchWeather(city);
        displayWeather(weatherData);
    } catch (error) {
        alert(error.message);
    }
});
