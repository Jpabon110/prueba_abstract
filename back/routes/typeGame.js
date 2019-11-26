const express = require('express');
const router = express.Router();
const TypeGame = require('../controllers/typeGame');


router.get('/', TypeGame.getTypesGames);

module.exports = router;