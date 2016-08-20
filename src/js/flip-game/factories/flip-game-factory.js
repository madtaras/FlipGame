/* globals module */
'use strict';

module.exports = ['_', (_) => {
    const FlipGameFactory = {};

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
                id: `tile${index}`
            });
            result.push({
                status: tileStatuses.CLOSED,
                imgSrc: `images/${type}.svg`,
                id: `tile${index + tileBackgroundTypes.length}`
            });
        });

        // Shuffle tiles array
        result = _.shuffle(result);

        return result;
    };

    FlipGameFactory.tiles = createNewGameBoard();

    FlipGameFactory.onTileClick = (tileId) => {
        // TODO: put onTileClick logic here
    };

    return FlipGameFactory;
}];
