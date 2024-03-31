const apiKey = "74c159cba0fe95be2a69d0b5aa378f72";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherBg = document.querySelector(".weather-bg");
const weatherCondition = document.querySelector(".weather-condition"); // Selecting the weather condition element

// Function to check weather
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none"; // Hide the weather info on error
        weatherBg.style.backgroundImage = "url('./images/bg.jpg')"; // Revert background to default
    }
    else {
        var data = await response.json();

        // Update weather information
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Set weather icon
        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "images/clouds.png";
                weatherBg.style.backgroundImage = "url('./images/clouds-bg.jpg')"; // Change background image
                weatherCondition.textContent = "Cloudy"; // Update weather condition text
                break;
            case "Clear":
                weatherIcon.src = "images/clear.png";
                weatherBg.style.backgroundImage = "url('./images/clear-bg.jpg')"; // Change background image
                weatherCondition.textContent = "Clear"; // Update weather condition text
                break;
            case "Rain":
                weatherIcon.src = "images/rain.png";
                weatherBg.style.backgroundImage = "url('./images/rain-bg.jpg')"; // Change background image
                weatherCondition.textContent = "Rainy"; // Update weather condition text
                break;
            case "Drizzle":
                weatherIcon.src = "images/drizzle.png";
                weatherBg.style.backgroundImage = "url('./images/drizzle-bg.jpg')"; // Change background image
                weatherCondition.textContent = "Drizzling"; // Update weather condition text
                break;
            case "Mist":
                weatherIcon.src = "images/mist.png";
                weatherBg.style.backgroundImage = "url('./images/mist-bg.jpg')"; // Change background image
                weatherCondition.textContent = "Misty"; // Update weather condition text
                break;
            default:
                // Handle other weather conditions or leave it blank
                break;
        }

        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block"; // Show the weather info when data is retrieved
    }
}

// Event listener for search button click
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Event listener for Enter key press
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

// Initially hide the weather info when the page loads
window.addEventListener("load", () => {
    document.querySelector(".weather").style.display = "none";
});
