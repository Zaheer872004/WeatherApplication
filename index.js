const apikey = "eff8cae9b0695875319a027c7638b435";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  // console.log(cityValue);
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("network response was not okay");
    }

    const data = await response.json();

    console.log(data);
    const temperature = Math.round(data.main.temp);

    const description = data.weather[0].description;

    const icon = data.weather[0].icon;

    const details = [
      `feels like : ${Math.round(data.main.temp)}`,
      `Humidity : ${Math.round(data.main.humidity)}%`,
      `Wind speed : ${data.wind.speed} m/s`,
    ];
    weatherDataEl.querySelector(".icon").innerHTML = `<img
    src="http://openweathermap.org/img/wn/${icon}.png"
    alt="Weather icon"
  />`;

    weatherDataEl.querySelector(".temperature").textContent = `${temperature}℃`;
    weatherDataEl.querySelector(".description").textContent = description;

    weatherDataEl.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = "";

    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(".description").textContent =
      "Invalid city name, please Enter correct name";

    weatherDataEl.querySelector(".details").innerHTML = "";
    //
  }
}
