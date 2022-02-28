const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  process.env.DB_NAME || "beholder",
  process.env.DB_USER || "postgres",
  process.env.DB_PWD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || "postgres",
    logging: process.env.DB_LOGS === "true",
  }
);

module.exports = sequelize;
