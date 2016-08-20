/* globals module */
'use strict';

module.exports = () => ({
    restrict: 'E',
    template: `
        <input type="button" class="flip-game-reset-game-btn" value="Reset game" ng-click="resetGame()">
        <div class="flip-game-board" ng-class="{'unclickable': model.gameBoardUnclickable}">
            <div class="flip-game-tile flip-game-tile-flip-container" ng-repeat="tile in model.tiles"
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
        $scope.model = FlipGameFactory;

        $scope.onTileClick = (tileId) => {
            $scope.model.onTileClick(tileId);
        };

        $scope.resetGame = () => {
            $scope.model.resetGame();
        };
    }]
});
