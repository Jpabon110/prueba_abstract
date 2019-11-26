const typeGame = require('../models/typeGame');


const getTypesGames = async (req, res) => {
    try {
        const games = await typeGame.findAll();
        res.status(200).json(games);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Error al obtener los typos de juegos', code: 'ErrorTypeGames' })
    }
}

module.exports = {
    getTypesGames,
}