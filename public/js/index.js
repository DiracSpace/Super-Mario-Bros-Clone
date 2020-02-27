import SpriteSheet from './spriteSheetAPI.js';
import { loadImage, loadLevel } from './imageLoader.js';

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

// get DOM element
const drawingboard = document.getElementById('screen');
const context = drawingboard.getContext('2d');

loadImage('/sprites/tileset.png').then(image => {
    const sprites = new SpriteSheet(image, 16, 16); // sprite API
    sprites.define('ground', 0, 0);
    sprites.define('sky', 3, 23);

    // load levels
    loadLevel('1-1').then(level => {
        level.backgrounds.forEach(background => {
            console.log(background);
            drawBackground(background, context, sprites);
        });
    });
});