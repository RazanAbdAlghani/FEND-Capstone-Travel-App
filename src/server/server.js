const express = require('express');
const cors = require('cors');
const { getCityLocation } = require('./cityLocation');
const { getWeather } = require('./weather');
const { getCityPicture } = require('./cityPicture');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('dist'));
app.use(cors());


const { USERNAME, USERNUMBER, WEATHER_KEY, PIXABAY_KEY } = process.env;
const username = `${USERNAME}${USERNUMBER}`;

app.post('/getCity', async (req, res) => {
  const city = req.body.city;
  const location = await getCityLocation(city, username);
  res.send(location);
});

app.post('/getWeather', async (req, res) => {
  const { lng, lat, remainingDays } = req.body;
  const weather = await getWeather(lng, lat, remainingDays, WEATHER_KEY);
  res.send(weather);
});

app.post('/getCityPic', async (req, res) => {
  const { city_name } = req.body;
  const picture = await getCityPicture(city_name, PIXABAY_KEY);
  res.send(picture);
});


// Setup Server
const port = 8080;
app.listen(port, () => {
    console.log(`running on localhost:${port}`);
});
