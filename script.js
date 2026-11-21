
const API_KEY = "0c85c1c47cc14466a5b62637261811";

const API_URL = "https://api.weatherapi.com/v1/current.json";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");
const weatherCard = document.getElementById("weatherCard");

async function getWeather(city) {

    if (!city.trim()) {
        message.textContent = "Please enter a city name!";
        weatherCard.classList.add("hidden");
        return;
    }

    searchBtn.disabled = true;
    searchBtn.textContent = "Loading...";
    message.textContent = "";
    weatherCard.classList.add("hidden");

    try {

        const url = `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error?.message || "Unable to get weather information."
            );
        }

        displayWeather(data);

    } catch (error) {

        message.textContent = error.message || "Something went wrong. Please try again.";

    } finally {

        searchBtn.disabled = false;
        searchBtn.textContent = "Search";

    }
}

function displayWeather(data) {

    const location = data.location;
    const current = data.current;

    document.getElementById("cityName").textContent =
        location.name + (location.region ? ", " + location.region : "");

    document.getElementById("countryName").textContent =
        location.country;

    document.getElementById("localTime").textContent =
        "Local Time: " + location.localtime;

    document.getElementById("temperature").textContent =
        Math.round(current.temp_c);

    document.getElementById("condition").textContent =
        current.condition.text;

    document.getElementById("weatherIcon").src =
        "https:" + current.condition.icon;

    document.getElementById("feelsLike").textContent =
        current.feelslike_c + "°C";

    document.getElementById("humidity").textContent =
        current.humidity + "%";

    document.getElementById("wind").textContent =
        current.wind_kph + " km/h";

    document.getElementById("uv").textContent =
        current.uv;

    document.getElementById("lastUpdated").textContent =
        current.last_updated;

    weatherCard.classList.remove("hidden");
    message.textContent = "";
}

// Search button
searchBtn.addEventListener("click", () => {
    getWeather(cityInput.value);
});

// Search using Enter key
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getWeather(cityInput.value);
    }
});

// Default city on website opening
getWeather("Jaipur");
