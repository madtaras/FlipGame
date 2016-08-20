/* globals module */
const angular = require('angular');

module.exports = angular
    .module('FlipGame', [])
        .directive('flipGame', require('./directives/flip-game.js'))
        .factory('FlipGameFactory', require('./factories/flip-game-factory.js'));
