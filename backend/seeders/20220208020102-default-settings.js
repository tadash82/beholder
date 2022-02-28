"use strict";
require("dotenv").config();
const bcrypt = require("bcryptjs");
const crypto = require("../src/utils/crypto");

module.exports = {
  async up(queryInterface, Sequelize) {
    const settingsId = await queryInterface.rawSelect(
      "settings",
      { where: {}, limit: 1 },
      ["id"]
    );
    if (!settingsId) {
      return queryInterface.bulkInsert("settings", [
        {
          email: "tadash82@gmail.com",
          password: bcrypt.hashSync("e3y6r4t5"),
          apiUrl: "https://testnet.binance.vision/api/",
          streamUrl: "wss://testnet.binance.vision/ws/",
          accessKey:
            "JZj27trkUjBHuouwUFtoL94QxjRTeFsB8sbQeEw3EYWqixOmhcEUe4SBhJFBMqQI",
          secretKey: crypto.encrypt(
            "cNURL7Z8xL97y3d8uwtX3XrFH8Gi1GVGaa4DGpV8xc9HOHAKYxGUlyrjBxxB9aqg"
          ),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("settings", null, {});
  },
};
