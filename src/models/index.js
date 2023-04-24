const { Sequelize } = require("sequelize");
const { host, userName, pass, port, dialect, database } = require("../config/config");
require("dotenv").config();
const sequelize = new Sequelize(database, userName, pass, {
  host: host,
  port: port,
  dialect: dialect,
});

module.exports = sequelize;
