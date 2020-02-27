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

// function for mario sprites
function loadMario() {
    return loadImage('/sprites/characters.png').then(image => {
        const sprites = new SpriteSheet(image, 16, 16); // sprite API
        sprites.define('idle', 276, 44, 16, 16); // mario position
        return sprites;
    });
}

// function for background sprites
function loadSprites() {
    return loadImage('/sprites/tileset.png').then(image => {
        const sprites = new SpriteSheet(image, 16, 16); // sprite API
        sprites.defineTile('ground', 0, 0);
        sprites.defineTile('sky', 3, 23);
        return sprites;
    });
}

// get DOM element
const drawingboard = document.getElementById('screen');
const context = drawingboard.getContext('2d');

// optimization and synchronization
Promise.all([
    loadMario(),
    loadSprites(),
    loadLevel('1-1')
]).then(([marioSprite, sprites, level]) => {
    // load levels
    level.backgrounds.forEach(background => {
        console.log(background);
        drawBackground(background, context, sprites);
    });
    marioSprite.draw('idle', context, 64, 64);
});