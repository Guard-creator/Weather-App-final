const cityInput = document.querySelector('.city-input');
const weatherCont = document.querySelector('.weather-details');
const apiKey = '21dbcae76ac535083e1321b43461e1e9';

let city = '';

document.querySelector('.search-btn')
  .addEventListener('click', async () => {

      city = cityInput.value;

    try {
      if(city) {
        const weatherData = await getWeatherData(city);
        displayWeatherData(weatherData);
      } else {
        displayError('Please Enter a city Name');
      }
    } catch(error) {
      displayError(error)
    }

    cityInput.value = '';

  })

async function getWeatherData() {

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);

  if(!response.ok) {
    throw new Error('Could not fetch data');
  }

  return response.json();

}

function displayWeatherData(weatherData) {

  console.log(weatherData);

  const {name,
         main: {temp, humidity},
         weather: [{description, id}],
         wind: {speed},
         sys: {sunrise, sunset},
        dt} = weatherData;

  
  const tempDisplay = `${(temp).toFixed(0)}°C`
  const windSpeed = Math.round(speed);
  const isDayTime = dt >= sunrise && dt < sunset;

  let html = `
    <div class="weather-emoji">${getWeatherImg(id, isDayTime)}</div>
    <div class="temp-display">${tempDisplay}</div>
    <div class="desc-display">${description}</div>
    <div class="city-display">${name}</div>
    <div class="atmosphere-dev">
      <div class="humidity-display">humidity: ${humidity}%</div>
      <div class="windspeed-display">wind Speed: ${windSpeed} mph</div>
    </div>
  `;

  weatherCont.innerHTML = html;


}

function getWeatherImg(weatherId, isDayTime) {
  
  if(isDayTime) {
    switch(true) {

      case(weatherId >= 200 && weatherId < 300):
        return `<img class="image-dev" src="Weather Icons/for sunrise/11d@2x.png" alt="thunderstorm">`;
      case(weatherId >= 300 && weatherId < 400):
        return `<img class="image-dev" src="Weather Icons/for sunrise/09d@2x.png" alt="	shower rain">`;
      case(weatherId >= 500 && weatherId < 510):
        return `<img class="image-dev" src="Weather Icons/for sunrise/10d@2x.png" alt="rain`
      case(weatherId === 511):
        return `<img class="image-dev" src="Weather Icons/for sunrise/13d@2x.png" alt="snow">`;
      case(weatherId >= 521 && weatherId < 600):
        return `<img class="image-dev" src="Weather Icons/for sunrise/09d@2x.png" alt="	shower rain">`;
      case(weatherId >= 600 && weatherId < 700):
        return `<img class="image-dev" src="Weather Icons/for sunrise/13d@2x.png" alt="snow">`;
      case(weatherId >= 700 && weatherId < 800):
        return `<img class="image-dev" src="Weather Icons/for sunrise/50d@2x.png" alt="mist">`;
      case(weatherId === 800):
        return `<img class="image-dev" src="Weather Icons/for sunrise/01d@2x.png" alt="clear sky">`;
      case(weatherId === 801):
        return `<img class="image-dev" src="Weather Icons/for sunrise/02d@2x.png" alt="	few clouds">`;
      case(weatherId >= 802 && weatherId < 810):
        return `<img class="image-dev" src="Weather Icons/for sunrise/04d@2x.png" alt="	broken clouds">`;
  
    }
  } else {
    switch(true) {

      case(weatherId >= 200 && weatherId < 300):
        return `<img class="image-dev" src="Weather Icons/for Sunset/11n@2x.png" alt="thunderstorm">`;
      case(weatherId >= 300 && weatherId < 400):
        return `<img class="image-dev" src="Weather Icons/for Sunset/09n@2x.png" alt="	shower rain">`;
      case(weatherId >= 500 && weatherId < 510):
        return `<img class="image-dev" src="Weather Icons/for Sunset/10n@2x.png" alt="rain`
      case(weatherId === 511):
        return `<img class="image-dev" src="Weather Icons/for Sunset/13n@2x.png" alt="snow">`;
      case(weatherId >= 521 && weatherId < 600):
        return `<img class="image-dev" src="Weather Icons/for Sunset/09n@2x.png" alt="	shower rain">`;
      case(weatherId >= 600 && weatherId < 700):
        return `<img class="image-dev" src="Weather Icons/for Sunset/13n@2x.png" alt="snow">`;
      case(weatherId >= 700 && weatherId < 800):
        return `<img class="image-dev" src="Weather Icons/for Sunset/50n@2x.png" alt="mist">`;
      case(weatherId === 800):
        return `<img class="image-dev" src="Weather Icons/for Sunset/01n@2x.png" alt="clear sky">`;
      case(weatherId === 801):
        return `<img class="image-dev" src="Weather Icons/for Sunset/02n@2x.png" alt="	few clouds">`;
      case(weatherId >= 802 && weatherId < 810):
        return `<img class="image-dev" src="Weather Icons/for Sunset/04n@2x.png" alt="	broken clouds">`;
  
    }
  }

}

function displayError(error) {
  weatherCont.innerHTML = `<h2>${error}</h2>`;
}