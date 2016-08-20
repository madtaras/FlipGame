const angular = require('angular');

window._ = require('lodash');
require('./flip-game/index');

angular.module('FlipGameApp', ['FlipGame'])
    .factory('_', ($window) => $window._);