# Rapport de Projet d'Application Météo

## Introduction

### Contexte
Ce projet consiste à développer une simple application météo qui récupère des données météorologiques à partir d'une API externe et les affiche à l'utilisateur. Le projet vise à démontrer la maîtrise du développement web en utilisant des frameworks JavaScript, HTML et CSS tels que Tailwind CSS et Flowbite.

### Objectif
L'objectif principal de ce projet est de créer une application web fonctionnelle permettant aux utilisateurs de :
1. Entrer le nom d'une ville.
2. Récupérer et afficher les données météorologiques actuelles pour cette ville à partir de l'API OpenWeatherMap.
3. Utiliser une interface conviviale stylée avec Tailwind CSS et améliorée avec des composants Flowbite.

## Spécifications

### Fonctionnalités
1. **Recherche de ville** : Permettre aux utilisateurs de saisir le nom d'une ville et de récupérer les données météorologiques pour cette ville.
2. **Affichage des données météorologiques** : Présenter les données météorologiques récupérées, y compris la température, l'humidité, la vitesse du vent et la description du temps.
3. **Suggestions en temps réel** : Fournir des suggestions de noms de villes en temps réel au fur et à mesure que l'utilisateur tape.

### Exigences non fonctionnelles
1. **Utilisabilité** : L'interface doit être intuitive et facile à naviguer.
2. **Performance** : L'application doit récupérer et afficher les données rapidement.
3. **Maintenabilité** : Le code doit être bien documenté et suivre des conventions de nommage standard.

## API Utilisée

### API OpenWeatherMap
- **Endpoint** : `https://api.openweathermap.org/data/2.5/weather`
- **Paramètres** :
  - `q` : Nom de la ville
  - `appid` : Clé API
  - `units` : Unités de mesure (métriques pour Celsius)
- **Réponse** : Retourne des données JSON contenant des informations météorologiques telles que la température, l'humidité, la vitesse du vent et la description du temps.

### API GeoDB Cities
- **Endpoint** : `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`
- **Paramètres** :
  - `namePrefix` : Préfixe du nom de la ville pour les suggestions
  - `minPopulation` : Population minimale pour filtrer les villes
- **Réponse** : Retourne des données JSON contenant des suggestions de villes.

## Implémentation

### Récupération des données météorologiques
La fonction `fetchWeather` prend le nom d'une ville en entrée et récupère les données météorologiques à partir de l'API OpenWeatherMap. Elle gère les erreurs telles que la ville non trouvée.

```javascript
async function fetchWeather(city) {
    const apiKey = 'your_api_key'; // Remplacez par votre clé API OpenWeatherMap
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
        throw new Error('Ville non trouvée');
    }
    const data = await response.json();
    return data;
}
```

### Affichage des données météorologiques
La fonction `displayWeather` met à jour le DOM pour afficher les données météorologiques récupérées depuis l'API. Elle utilise Tailwind CSS pour le style et inclut des icônes SVG pour une meilleure représentation visuelle.

```javascript
function displayWeather(data) {
    const weatherContainer = document.getElementById('weather');
    weatherContainer.innerHTML = `
        <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 class="text-2xl font-bold text-center">Météo à ${data.name}</h2>
            <div class="flex items-center space-x-4">
                <div>
                    // Icône de température
                </div>
                <div>
                    <p class="text-gray-700">Température : ${data.main.temp}°C</p>
                </div>
            </div>
            <div class="flex items-center space-x-4">
                <div>
                    // Icône d'humidité
                </div>
                <div>
                    <p class="text-gray-700">Humidité : ${data.main.humidity}%</p>
                </div>
            </div>
            <div class="flex items-center space-x-4">
                <div>
                    // Icône de vitesse du vent
                </div>
                <div>
                    <p class="text-gray-700">Vitesse du vent : ${data.wind.speed} m/s</p>
                </div>
            </div>
            <div class="flex items-center space-x-4">
                <div>
                    // Icône de description du temps
                </div>
                <div>
                    <p class="text-gray-700">Description : ${data.weather[0].description}</p>
                </div>
            </div>
        </div>
    `;
}

document.getElementById('search-btn').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    try {
        const weatherData = await fetchWeather(city);
        displayWeather(weatherData);
    } catch (error) {
        alert(error.message);
    }
});

// Écouteur d'événements pour les suggestions de ville
document.getElementById('city').addEventListener('input', async (event) => {
    const query = event.target.value;
    const suggestionsContainer = document.getElementById('suggestions');

    if (query.length < 3) {
        suggestionsContainer.innerHTML = '';
        return;
    }

    const cities = await fetchCitySuggestions(query);
    suggestionsContainer.innerHTML = cities.map(city => `<div class="suggestion">${city.name}</div>`).join('');

    document.querySelectorAll('.suggestion').forEach(item => {
        item.addEventListener('click', () => {
            document.getElementById('city').value = item.textContent;
            suggestionsContainer.innerHTML = '';
        });
    });
});
```

### Structure HTML
Le fichier HTML comprend un champ de saisie pour le nom de la ville, un bouton pour lancer la recherche et un conteneur pour afficher les données météorologiques.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application Météo</title>
    <link href="https://unpkg.com/tailwindcss@^2.0/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://unpkg.com/@flowbite/plugin@1.3.0/dist/flowbite.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="container mx-auto p-6">
        <h1 class="text-3xl font-bold text-center mb-6">Application Météo</h1>
        <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div class="md:flex">
                <div class="w-full p-4">
                    <label for="city" class="block text-sm font-medium text-gray-700">Entrez le nom de la ville</label>
                    <div class="mt-1 flex rounded-md shadow-sm">
                        <input type="text" id="city" class="form-input flex-1 block w-full rounded-md sm:text-sm border-gray-300" placeholder="Nom de la ville">
                        <button id="search-btn" class="ml-3 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                            Rechercher
                        </button>
                    </div>
                    <div id="suggestions" class="mt-2"></div>
                    <div id="weather" class="mt-6"></div>
                </div>
            </div>
        </div>
    </div>
    <script src="app.js"></script>
</body>
</html>
```

### Style
Native CSS is used for styling the application, providing a clean and responsive design. Flowbite Tailwind components are integrated for enhancing the user interface of some elements.

### Tools and Libraries
- **Fetch API**: Used to make HTTP requests to the OpenWeatherMap API.
- **HTML/CSS**: For structuring and styling the web page.
- **JavaScript**: For handling user input, making API requests, and updating the DOM.

## Résultats
L'application finale répond avec succès aux objectifs définis. Les utilisateurs peuvent entrer le nom d'une ville, recevoir des suggestions en temps réel et visualiser les données météorologiques actuelles pour la ville sélectionnée. L'interface est conviviale et performante, avec une récupération et un affichage rapides des données.

## Conclusion
Ce projet démontre comment créer une application web qui interagit avec des APIs externes pour fournir des données en temps réel aux utilisateurs. L'utilisation des outils et frameworks modernes de développement web, tels que Tailwind CSS et Flowbite, permet de créer une interface réactive et visuellement attrayante.
