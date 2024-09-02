import axios from 'axios';

const form = document.querySelector('form');
const cityInput = document.querySelector('#city');
const dateInput = document.querySelector('#flightDate');

const cityError = document.querySelector('#city_error');
const dateError = document.querySelector('#date_error');

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Form submission initiated');

  if (!validateInputs()) {
    return;
  }

  const location = await getCityLocation();
  if (location && location.error) {
    cityError.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>${location.message}`;
    cityError.style.display = 'block';
    return;
  }

  if (location) {
    const { lng, lat, name } = location;
    const date = dateInput.value;

    if (!date) {
      dateError.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>Please enter the date`;
      dateError.style.display = 'block';
      return;
    }

    const remainingDays = calculateRemainingDays(date);
    const weather = await getWeather(lng, lat, remainingDays);
    if (weather && weather.error) {
      dateError.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>${weather.message}`;
      dateError.style.display = 'block';
      return;
    }

    const picture = await getCityPicture(name);
    updateUI(remainingDays, name, picture, weather);
  }
};

const validateInputs = () => {
  cityError.style.display = 'none';
  dateError.style.display = 'none';

  if (!cityInput.value) {
    cityError.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>You need to enter the city`;
    cityError.style.display = 'block';
    return false;
  }

  if (!dateInput.value) {
    dateError.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>Please enter the date`;
    dateError.style.display = 'block';
    return false;
  }

  if (calculateRemainingDays(dateInput.value) < 0) {
    dateError.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>Date cannot be in the past`;
    dateError.style.display = 'block';
    return false;
  }

  return true;
};

const getCityLocation = async () => {
  if (cityInput.value) {
    const { data } = await axios.post('http://localhost:8000/getCity', { city: cityInput.value }, {
      headers: { 'Content-Type': 'application/json' },
    });
    return data;
  } else {
    cityError.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>This field cannot be left empty`;
    cityError.style.display = 'block';
  }
};

const getWeather = async (lng, lat, remainingDays) => {
  const { data } = await axios.post('http://localhost:8000/getWeather', { lng, lat, remainingDays });
  return data;
};

const calculateRemainingDays = (date) => {
  const startDate = new Date();
  const endDate = new Date(date);
  const timeDiff = endDate.getTime() - startDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

const getCityPicture = async (cityName) => {
  const { data } = await axios.post('http://localhost:8000/getCityPic', { city_name: cityName });
  return data.image;
};

const updateUI = (remainingDays, city, picture, weather) => {
  document.querySelector('#Rdays').innerHTML = `Your trip starts in ${remainingDays} days from now`;
  document.querySelector('.cityName').innerHTML = `Location: ${city}`;
  document.querySelector('.weather').innerHTML =
    remainingDays > 7 ? `Weather is: ${weather.description}` : `Weather is expected to be: ${weather.description}`;
  document.querySelector('.temp').innerHTML =
    remainingDays > 7 ? `Forecast: ${weather.temp}&degC` : `Temperature: ${weather.temp} &degC`;
  document.querySelector('.max-temp').innerHTML =
    remainingDays > 7 ? `Max-Temp: ${weather.app_max_temp}&degC` : '';
  document.querySelector('.min-temp').innerHTML =
    remainingDays > 7 ? `Min-Temp: ${weather.app_min_temp}&degC` : '';
  document.querySelector('.cityPic').innerHTML = `
    <img 
      src="${picture}" 
      alt="an image that describes the city nature"
    >
  `;
  document.querySelector('.flight_data').style.display = 'block';
};

export { handleSubmit };
