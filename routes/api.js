
var express = require('express');
var router = express.Router();

var controller = require('../api/controllers/game');

router.get('/api/games', controller.getGameList);
router.post('/api/games', controller.saveGame);
router.get('/api/games/:id', controller.getGame);
router.put('/api/games/:id', controller.updateGame);
router.delete('/api/games/:id', controller.deleteGame);

module.exports = router;