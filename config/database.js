const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.database.name, config.database.username, config.database.password, {
  host: config.database.host,
  port: config.database.port,
  dialect: config.database.dialect,
  operatorAliases: 0,
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
