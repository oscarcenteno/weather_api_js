const { expect } = require('chai');
const api = require('./api');

describe('Weather API', () => {
  describe('getWeatherData', () => {
    it('should return weather data for a valid location', async () => {
      // Arrange
      const city = 'London';
      const stateCode = '';
      const countryCode = 'GB';

      // Act
      const { lat, lon } = await api.getLatLon(city, stateCode, countryCode);
      const weatherData = await api.getWeatherData(lat, lon);
      
      // Assert
      expect(weatherData).to.be.an('object');
      expect(weatherData.name).to.equal(city);
      expect(weatherData.main).to.have.property('temp');
      expect(weatherData.weather[0]).to.have.property('description');
    });

    it('should throw an error for missing latitude and longitude', async () => {
      // Arrange
      const lat = undefined;
      const lon = undefined;

      // Act
      try {
        await api.getWeatherData(lat, lon);
      } catch (error) {

        // Assert: Additional checks for status codes may be added
        expect(error.message).to.equal('Latitude and longitude must be specified');
      }
    });
  });
});
