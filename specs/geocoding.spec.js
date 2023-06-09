const { expect } = require('chai');
const api = require('./api');

describe('Geocoding API', () => {
  describe('getLatLon', () => {
    it('should return latitude and longitude for a valid location', async () => {
      // Arrange
      const city = 'London';
      const stateCode = '';
      const countryCode = 'GB';

      // Act
      const { lat, lon } = await api.getLatLon(city, stateCode, countryCode);

      // Assert
      expect(lat).to.be.a('number');
      expect(lon).to.be.a('number');
    });


    it('should throw an error for an invalid location', async () => {
      // Arrange
      const city = 'InvalidCity';
      const stateCode = '';
      const countryCode = 'US';

      // Act
      try {
        await api.getLatLon(city, stateCode, countryCode)
      } catch (error) {

        // Assert
        expect(error.message).to.equal(`Failed to retrieve latitude and longitude for ${city}`);
      }

    });
  });
});
