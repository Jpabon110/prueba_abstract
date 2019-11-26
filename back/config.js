
const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const db = new Sequelize(process.env.BD_NAME, process.env.BD_USER , process.env.BD_USER_PASSWORD , {
  host: 'localhost',
  dialect: 'postgres', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

module.exports = db;
