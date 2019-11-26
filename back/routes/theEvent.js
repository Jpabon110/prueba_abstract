const express = require('express');
const router = express.Router();
const EventCtrl = require('../controllers/theEvent');
const PlayerCtrl = require('../controllers/player');


router.get('/', EventCtrl.getEvents);
router.get('/:id', EventCtrl.getEventById);
router.get('/:id/players', PlayerCtrl.getPlayersByIdEvent);
router.post('/', EventCtrl.addEvent);
router.put('/:id', EventCtrl.updateEvent);
router.delete('/:id', EventCtrl.deleteEvent);

module.exports = router;