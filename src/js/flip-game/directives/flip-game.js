/* globals module */
'use strict';

module.exports = () => ({
    restrict: 'E',
    template: `
        <div class="flip-game-board">
            <div class="flip-game-tile flip-game-tile-flip-container" ng-repeat="tile in tiles"
              ng-click="onTileClick(tile.id)" ng-class="{'opened': tile.status === 'opened',
              'solved': tile.status === 'solved'}">
                <div class="flip-game-tile-flipper">
                    <div class="flip-game-tile-front">
                        <img src="images/question-mark.svg" ng-hide="status === 'solved'">
                    </div>
                    <div class="flip-game-tile-back">
                        <img ng-src="{{tile.imgSrc}}">
                    </div>
                </div>
            </div>
        </div>
    `,
    controller: ['$scope', 'FlipGameFactory', ($scope, FlipGameFactory) => {
        $scope.tiles = FlipGameFactory.tiles;

        $scope.onTileClick = (tileId) => {
            FlipGameFactory.onTileClick(tileId);
        };
    }]
});
