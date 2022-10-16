const apiKey = "76df64de685f0742d07119432e1f5b0b";
const apiCountryURL = "https://countryflagsapi.com/png/";

// https://api.openweathermap.org/data/2.5/weather?

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temp-atual");
const feelsLikeElement = document.querySelector("#feels-like");
const minTempElement = document.querySelector("#min-temp");
const maxTempElement = document.querySelector("#max-temp");

const sunriseElement = document.querySelector("#sunrise");
const sunsetElement = document.querySelector("#sunset");

const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");

const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  console.log(data);
  return data;
};

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  cityElement.innerHTML = data.name;
  tempElement.innerHTML = `Temperatura: ` + parseInt(data.main.temp);
  feelsLikeElement.innerHTML = `Térmica: ` + parseInt(data.main.feels_like);
  minTempElement.innerHTML = `Mínima: ` + parseInt(data.main.temp_min);
  maxTempElement.innerHTML = `Máxima: ` + parseInt(data.main.temp_max);

  descElement.innerHTML = data.weather[0].description;

  /* Setar as horas certas do Nascer e do Pôr do Sol */
  sunriseElement.innerHTML = data.sys.sunrise;
  sunsetElement.innerHTML = data.sys.sunset;

  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  countryElement.setAttribute("src", apiCountryURL + data.sys.country);
  humidityElement.innerHTML = `${data.main.humidity}%`;
  windElement.innerHTML = `${data.wind.speed}km/h`;

  weatherContainer.classList.remove("hide");
};

// ev
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value;

  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;
    showWeatherData(city);
  }
});
