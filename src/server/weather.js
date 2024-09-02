const axios = require('axios');

const getWeather = async (lng, lat, remainingDays, key) => {
  if (remainingDays < 0) {
    return { message: 'Date cannot be in the past', error: true };
  }

  if (remainingDays <= 7) {
    const { data } = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&units=M&key=${key}`);
    const { weather, temp } = data.data[0];
    return { description: weather.description, temp };
  } else {
    const { data } = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&units=M&days=${remainingDays}&key=${key}`);
    const { weather, temp, app_max_temp, app_min_temp } = data.data[remainingDays - 1];
    return { description: weather.description, temp, app_max_temp, app_min_temp };
  }
};

module.exports = { getWeather };
