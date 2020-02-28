// private background drawing function
function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        // drawing sky
        for (let x = x1; x < x2; x++) {
            for (let y = y1; y < y2; y++) {
                // by 16 because api does not accept tile sizes
                sprites.drawTile(background.tile, context, x, y); // api call
            }
        }
    });
}

// high order function
export function createBackgroundLayer(backgrounds, sprites) {
    // cant keep generating complete background
    // so adding to buffer all of it 
    // and generating only the ones that are drawn over by mario
    const backgroundBuffer = document.createElement('canvas');
    backgroundBuffer.width = 256;
    backgroundBuffer.height = 240;

    // load levels
    backgrounds.forEach(background => {
        drawBackground(background, backgroundBuffer.getContext('2d'), sprites);
    });

    return function drawBackgroundLayer(context) {
        context.drawImage(backgroundBuffer, 0, 0);
    };
}

// high order function
export function createSpriteLayer(entity) {
    return function drawSpriteLayer(context) {
        for (let i = 0; i < 20; i++) {
            // sprites.draw('idle', context, position.x + i * 16, position.y);
            entity.draw(context);
        }
    };
}