const Sequelize = require('sequelize');
const db = new Sequelize('imdbapp', null, null, {
  dialect: 'postgres',
  host: 'localhost',
  logging: false,
});

module.exports = db;
