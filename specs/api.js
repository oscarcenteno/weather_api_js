const axios = require('axios').default;
require('dotenv').config();

const apiKey = process.env.API_KEY;
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const geocodingApiUrl = 'http://api.openweathermap.org/geo/1.0/direct';

async function getLatLon(city, stateCode, countryCode) {
  if (!city || !countryCode) {
    throw new Error('City and Country code must be specified');
  }

  try {
    const response = await axios.get(`${geocodingApiUrl}?q=${city},${stateCode},${countryCode}&limit=1&appid=${apiKey}`);
    if (response.data.length === 0) {
      throw new Error(`Failed to retrieve latitude and longitude for ${city}`);
    }
    return {
      lat: response.data[0].lat,
      lon: response.data[0].lon,
    };
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

async function getWeatherData(lat, lon) {
  if (!lat || !lon) {
    throw new Error('Latitude and longitude must be specified');
  }

  try {
    const response = await axios.get(`${weatherApiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
}

module.exports = {
  getLatLon,
  getWeatherData,
};
