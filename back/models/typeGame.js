const Sequelize = require('sequelize')
const db = require('../config');

const TypeGames = db.define('types_games', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.INTEGER
    },
}, {
    underscored: true,
    timestamp: false
});

module.exports = TypeGames;