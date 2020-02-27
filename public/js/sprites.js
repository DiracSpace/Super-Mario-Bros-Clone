import {loadImage} from './imageLoader.js';
import SpriteSheet from './spriteSheetAPI.js';

// function for mario sprites
export function loadMario() {
    return loadImage('/sprites/characters.png').then(image => {
        const sprites = new SpriteSheet(image, 16, 16); // sprite API
        sprites.define('idle', 276, 44, 16, 16); // mario position
        return sprites;
    });
}

// function for background sprites
export function loadSprites() {
    return loadImage('/sprites/tileset.png').then(image => {
        const sprites = new SpriteSheet(image, 16, 16); // sprite API
        sprites.defineTile('ground', 0, 0);
        sprites.defineTile('sky', 3, 23);
        return sprites;
    });
}