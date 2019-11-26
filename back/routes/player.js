const express = require('express');
const router = express.Router();
const PlayerCtrl = require('../controllers/player');


router.get('/:id', PlayerCtrl.getPlayerById);
router.post('/', PlayerCtrl.addPlayer);
router.put('/:id', PlayerCtrl.updatePlayer);
router.delete('/:id', PlayerCtrl.deletePlayer);

module.exports = router;