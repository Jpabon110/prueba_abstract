const Sequelize = require('sequelize')
const theEvent = require('./theEvent')
const db = require('../config');

const Players = db.define('players', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING
    },
    status_email: {
        type: Sequelize.STRING
    },
    event_id: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    },
}, {
    underscored: true,
    timestamp: false
});

theEvent.hasMany(Players);

module.exports = Players;