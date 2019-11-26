const TheEvent = require('../models/theEvent');
const TypeGame = require('../models/typeGame');

const addEvent= async (req, res, next) => {
    try {
        const { body } = req;
        const event = await TheEvent.create(body);
        res.status(201).json(event);
    } catch (e) {
        console.log(e);
        res.status(500).send({message: 'Error al realizar la petición.', code: 'errorAddEvent'});
        next(e);
    }
}

const getEventById = async (req, res) => {
    let { id } = req.params;
    try {
        const event = await TheEvent.findOne({ where:{ id }, include: [{ model: TypeGame }], });
        if (!event) return res.status(404).send({message: 'El evento no existe.'});   
        res.status(200).json(event);
    } catch (e) {
        console.log(e);
        res.status(500).send({message: 'Error al realizar la petición.', code: 'errorJustOneEvent'});
        next(e);
    }
}


const getEvents = async (req, res) => {
    try {
        const theEvents = await TheEvent.findAll({ include: [{ model: TypeGame }], });
        res.status(200).json(theEvents);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Error al obtener los eventos', code: 'ErrorEvent' })
    }
}

const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await TheEvent.findAll({where:{ id }});
        if (!event) return res.status(404).send({message: 'El evento no existe.'}); 
        await TheEvent.destroy({where:{ id }});
        res.status(204).send({message: 'Evento eliminado correctamente'});
    } catch (e) {
        console.log(e);
        res.status(500).send({message: 'Error al borra evento.', code: 'errorDeleteEvent'});
        next(e);
    }
}


const updateEvent = async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    try {
        const event = await TheEvent.update( body, { where: { id } }, { new: true });
        if (!event) return res.status(404).send({message: 'El comentario no existe.'});   
        res.status(204).send();
    } catch (e) {
        console.log(e);
        res.status(500).send({message: 'Error al realizar la petición.', code: 'errorJustOneComment'});
        next(e);
    }
}

module.exports = {
    addEvent,
    getEventById,
    getEvents,
    deleteEvent,
    updateEvent,
}