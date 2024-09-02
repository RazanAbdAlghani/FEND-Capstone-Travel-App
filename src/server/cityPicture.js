const axios = require('axios');

const getCityPicture = async (city, key) => {
  const { data } = await axios.get(`https://pixabay.com/api/?key=${key}&q=${city}&image_type=photo`);
  const image = data.hits[0] ? data.hits[0].webformatURL : 'https://source.unsplash.com/random/640x480?city,morning,night?sig=1';
  return { image };
};

module.exports = { getCityPicture };
