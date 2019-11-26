// const TheEvent = require('../models/theEvent');
const Player = require('../models/player');
const emailService = require('../services/emailService')


const getPlayersByIdEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const Players = await Player.findAll({ where:{ event_id: id } });
        if (!Players) return res.status(404).send({message: 'No hay jugadores para este evento.'});
        res.status(201).json(Players);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Error al obtener los jugadores', code: 'ErrorPlayers' })
    }
}

const getPlayerById = async (req, res) => {
    let { id } = req.params;
    try {
        const player = await Player.findOne({ where:{ id } });
        if (!player) return res.status(404).send({message: 'El jugador no existe.'});   
        res.status(201).json(player);
    } catch (e) {
        console.log(e);
        res.status(500).send({message: 'Error al realizar la petición.', code: 'ErrorJustOnePlayer'});
        next(e);
    }
}

const addPlayer = async (req, res, next) => {
    try {
        const { body } = req;        
        const thePlayer = await Player.create(body);
        emailService.sendInvitation({ to: body.email, name: body.name, id: body.event_id, playerId: thePlayer.id });
        res.status(201).json(thePlayer);
    } catch (e) {
        console.log(e);
        res.status(500).send({message: 'Error al realizar la petición.', code: 'errorAddPlayer'});
        next(e);
    }
}

const updatePlayer = async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    try {
        const player = await Player.update( body, { where: { id } }, { new: true });
        if (!player) return res.status(404).send({message: 'El jugador no existe.'});   
        res.status(204).send();
    } catch (e) {
        console.log(e);
        res.status(500).send({message: 'Error al realizar la petición.', code: 'errorUpdatePlayer'});
        next(e);
    }
}

const deletePlayer = async (req, res) => {
    const { id } = req.params;
    try {
        const thePlayer = await Player.findOne({where:{ id }});
        if (!thePlayer) return res.status(404).send({message: 'El jugador no existe.'}); 
        await Player.destroy({where:{ id }});
        res.status(200).send({message: 'Jugador eliminado correctamente'});
    } catch (e) {
        console.log(e);
        res.status(500).send({message: 'Error al borra Jugador.', code: 'errorDeletePlayer'});
        next(e);
    }
}

module.exports = {
    getPlayersByIdEvent,
    addPlayer,
    deletePlayer,
    updatePlayer,
    getPlayerById,
}