function updateTemperature(response) {
  let Temperature = document.querySelector("#tempEntered");
  let description = document.querySelector("#weather-description");
  let humidity = document.querySelector("#Humidity");
  let speed = document.querySelector("#speed");
  let discriptionIcon = document.querySelector("#weather-Emoji");
  discriptionIcon.innerHTML = `<img src= "${response.data.condition.icon_url}"class="weatherEmoji"
                >`;
  Temperature.innerHTML = Math.round(response.data.temperature.current);
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  speed.innerHTML = `${response.data.wind.speed}km/h`;
  let date = new Date(response.data.time * 1000);
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let realTime = document.querySelector("#dayTime");
  realTime.innerHTML = `${day} ${hour}:${minutes}`;
  getForcast(response.data.city);
}

function cityInputDetails(City) {
  let key = "0dbtbf7b304da7a1b3d46o1bb99604f1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${City}&key=${key}&unit=metric`;
  axios.get(apiUrl).then(updateTemperature);
}

function updateCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city");
  let updatedCity = document.querySelector("#weather-app-city");
  updatedCity.innerHTML = city.value;
  cityInputDetails(city.value);
}

let formInput = document.querySelector("#weather-form");
formInput.addEventListener("submit", updateCity);

cityInputDetails("gothenburg");

function realDay(timestamp) {
  let date = new Date(timestamp * 1000);
  days = ["sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[date.getDay()];
}

function forcastWeather(response) {
  console.log(response.data);
  let forcastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forcastHtml =
        forcastHtml +
        `<div class="dailyForcast">
            <div class="forcastDay">${realDay(day.time)}</div>

            <div ><img class="forcastEmoji" src="${
              day.condition.icon_url
            }"/></div>
            <div class="maxAndMinTemperature">
              <div class="weatherForcastMax"><strong>${Math.round(
                day.temperature.maximum
              )}º</strong></div>
              <div class="weatherForcastMin">${Math.round(
                day.temperature.minimum
              )}º</div>
            </div>
          </div>`;
    }
  });

  let ForcastDetails = document.querySelector("#forcast-weather");
  ForcastDetails.innerHTML = forcastHtml;
}
function getForcast(city) {
  let forcastKey = "da7a1b3d460dbtbf7b304o1bb99604f1";
  let forcastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${forcastKey}&units=metric`;
  axios(forcastApiUrl).then(forcastWeather);
}

forcastWeather(response);
