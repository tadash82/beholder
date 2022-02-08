'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('settings', [{
      email: 'tadash82@gmail.com',
      password: bcrypt.hashSync('e3y6r4t5'),
      apiUrl: 'https://testnet.binance.vision/api/',
      accessKey: 'JZj27trkUjBHuouwUFtoL94QxjRTeFsB8sbQeEw3EYWqixOmhcEUe4SBhJFBMqQI',
      secretKey: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('settings', null, {});
  }
};
