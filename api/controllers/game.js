'use strict';

// Include mock "db", it mimics mongodb
const db = require('../../data')();

// Exports all the functions to perform on the db
module.exports = {
    getGameList: getGameList,
    saveGame: saveGame,
    getGame: getGame,
    updateGame: updateGame,
    deleteGame: deleteGame
};

/*
 * GET /games
 */
function getGameList(req, res, next) {
    res.json({
        games: db.find()
    });
}

/*
 * POST /games
 */
function saveGame(req, res, next) {
    res.json({
        success: db.save(req.body),
        description: "Game added to the list!"
    });
}

/*
 * POST /games/{id}
 */
function getGame(req, res, next) {

    let id = req.swagger.params.id.value,
        game = db.find(id);

    if(game) {
        res.json(game);
    } else {
        res.status(204).send();
    }
}

/*
 * PUT /games/{id}
 */
function updateGame(req, res, next) {

    let id = req.swagger.params.id.value,
        game = req.body;

    if(db.update(id, game)){
        res.json({
            success: 1,
            description: "Game updated!"
        });
    } else {
        res.status(204).send();
    }
}

/*
 * DELETE /games/{id}
 */
function deleteGame(req, res, next) {

    let id = req.swagger.params.id.value;

    if(db.remove(id)){
        res.json({
            success: 1,
            description: "Game deleted!"
        });
    } else {
        res.status(204).send();
    }

}