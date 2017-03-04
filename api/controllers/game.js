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

    req.check('category', 'Game category is required.').notEmpty();
    req.check('wrong_allowed', 'The number of wrong guesses allowed must be a number.').optional({checkFalsy: true}).isNumeric();

    // TODO: Enable for prod, possible conflict with swagger-tools validator
    //req.check('guess_words', 'The guess word value is required.').arrayPropNotEmpty('word');

    // Error Message Handling
    let errors = req.validationErrors();

    if(errors){
        res.send({
            status: "failure",
            error: errors,
            message: "JSON validation error"
        });
    } else {
        res.json({
            success: db.save(req.body),
            description: "Game added to the list!"
        });
    }
}

/*
 * POST /games/{id}
 */
function getGame(req, res, next) {

    // TODO: Enable for prod, possible conflict with swagger-tools validator
    /*
    if (!validateIdFromRequest(req, res)) {
        return;
    }
    */

    let id = req.params.id;
    let game = db.find(id);

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

    // TODO: Enable for prod, possible conflict with swagger-tools validator
    /*
     if (!validateIdFromRequest(req, res)) {
     return;
     }
     */

    let id = req.params.id;
    let game = req.body;

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

    // TODO: Enable for prod, possible conflict with swagger-tools validator
    /*
     if (!validateIdFromRequest(req, res)) {
     return;
     }
     */

    let id = req.params.id;

    if(db.remove(id)){
        res.json({
            success: 1,
            description: "Game deleted!"
        });
    } else {
        res.status(204).send();
    }

}

/**
 * Validates ID from the request.
 * @param req
 */
function validateIdFromRequest(req, res) {

    req.check('id', 'Game id is required.').notEmpty();

    // Error Message Handling
    let errors = req.validationErrors();

    if(errors){
        res.send({
            status: "failure",
            error: errors,
            message: "JSON validation error"
        });

        return false;
    } else {
        return true;
    }

}