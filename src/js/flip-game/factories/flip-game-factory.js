/* globals module */
'use strict';

module.exports = ['_', '$timeout', (_, $timeout) => {
    const FlipGameFactory = {
        gameBoardUnclickable: false
    };

    const tileBackgroundTypes = [
        'cat',
        'dog',
        'fox',
        'koala',
        'owl',
        'penguin',
        'raccoon',
        'sheep'
    ];
    const tileStatuses = {
        CLOSED: 'closed',
        OPENED: 'opened',
        SOLVED: 'solved'
    };

    const createNewGameBoard = () => {
        let result = [];

        // Push tiles to array (2 tiles for each type)
        tileBackgroundTypes.forEach((type, index) => {
            result.push({
                status: tileStatuses.CLOSED,
                imgSrc: `images/${type}.svg`,
                id: `tile${index}`,
                type: type
            });
            result.push({
                status: tileStatuses.CLOSED,
                imgSrc: `images/${type}.svg`,
                id: `tile${index + tileBackgroundTypes.length}`,
                type: type
            });
        });

        // Shuffle tiles array
        result = _.shuffle(result);

        return result;
    };

    FlipGameFactory.tiles = createNewGameBoard();

    FlipGameFactory.onTileClick = (tileId) => {
        // Get clicked tile
        const clickedTile = _.find(FlipGameFactory.tiles, (tile) => tile.id === tileId);

        // Don't do anything if clicked tile have been already opened or solved
        if (clickedTile.status === tileStatuses.OPENED ||
            clickedTile.status === tileStatuses.SOLVED) return;

        // If some tile was already opened
        if (_.find(FlipGameFactory.tiles, (tile) => tile.status === tileStatuses.OPENED)) {
            // Prevent click events on game board
            FlipGameFactory.gameBoardUnclickable = true;

            const previousOpenedTile = _.find(FlipGameFactory.tiles, (tile) => tile.status === tileStatuses.OPENED);

            // Open clicked tile
            clickedTile.status = tileStatuses.OPENED;

            // Choose action for tiles: solve or close
            let tileStatus;
            if (previousOpenedTile.type === clickedTile.type) {
                tileStatus = tileStatuses.SOLVED;
            } else {
                tileStatus = tileStatuses.CLOSED;
            }

            $timeout(() => {
                previousOpenedTile.status = tileStatus;
                clickedTile.status = tileStatus;
                FlipGameFactory.gameBoardUnclickable = false;
            }, 700);
        } else {
            // Open clicked tile
            clickedTile.status = tileStatuses.OPENED;
        }
    };

    FlipGameFactory.resetGame = () => {
        FlipGameFactory.tiles = createNewGameBoard();
    };

    return FlipGameFactory;
}];
