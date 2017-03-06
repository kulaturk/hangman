'use strict;'

// Used to generate the game id 

// Used to generate the game id
var crypto = require('crypto');

module.exports = function() {

    return {

        gameList: [],

        gameListTest: [
            {
                "category": "World Capitals",
                "wrong_allowed": 5,
                "guess_words": [
                    {
                        "word": "Berlin",
                        "hints": "It is the largest city in Germany."
                    },
                    {
                        "word": "Budapest",
                        "hints": "Home to the headquarters of the European Institute of Innovation and Technology."
                    }
                ]
            },
            {
                "category": "US States",
                "wrong_allowed": 5,
                "guess_words": [
                    {
                        "word": "California",
                        "hints": "Death Valley is located in this state."
                    },
                    {
                        "word": "Rhode Island",
                        "hints": "It is the smallest U.S. state."
                    }
                ]
            }
        ],

        /** 
         * @desc Saves a game to the list array 
         * @param object - the game to be saved 
         * @return number - success
         */
        save(game) {
            game.id = crypto.randomBytes(20).toString('hex');
            this.gameList.push(game);
            return 1;
        },

        /** 
         * @desc Retrieve a game with a given id  or return the game list array if id is undefined.
         * @param string - the game id 
         * @return object/array - game or all games 
         */
        find(id) {

            if(id) {

                return this.gameList.find(game => {
                    return game.id === id;
                });

            } else {
                return this.gameList;
            }
        },

        /** @desc Delete a game
         * @param string - the game id 
         * @return number - success or failure
         */
        remove(id) {

            let gameExist = 0;

            this.gameList = this.gameList.filter(element => {

                if(el.id === id ) {  
                    gameExist = 1; 
                }  

                return el.id !== id;
            });

            return gameExist;
        },


        /**  @desc Update a game
         * @param string - the game id 
         * @param object - the game object 
         * @return number - success or failure 
         */
        update(id, game) {

            let gameIndex = this.gameList.findIndex(element => {
                return element.id === id;
            });

            if(gameIndex !== -1) {
                this.gameList[gameIndex] = game;
                return 1;
            } else {
                return 0;
            }
        }
    }
};