const Sequelize = require('sequelize')
const TypesGames = require('./typeGame')
const db = require('../config');

const Events = db.define('events', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING
    },
    date_play: {
        type: Sequelize.STRING
    },
    enclosure: {
        type: Sequelize.INTEGER
    },
    types_game_id: {
        type: Sequelize.INTEGER,
    }
}, {
    underscored: true,
    timestamp: false,
});

Events.belongsTo(TypesGames);
TypesGames.hasMany(Events);

module.exports = Events;