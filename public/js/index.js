import compositor from './comp.js';
import { loadLevel } from './imageLoader.js';
import { createBackgroundLayer } from './layers.js';
import { loadMario, loadSprites } from './sprites.js';

// high order function
function createSpriteLayer(sprites, position) {
    return function drawSpriteLayer(context) {
        sprites.draw('idle', context, position.x, position.y);
    };
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
    const comp = new compositor();
    const backgroundLayers = createBackgroundLayer(level.backgrounds, sprites);
    comp.layers.push(backgroundLayers);

    const position = {
        x: 64,
        y: 64
    };

    const spriteLayer = createSpriteLayer(marioSprite, position);
    comp.layers.push(spriteLayer);

    // mario left trail so repeat background drawing
    // for every new frame generated
    function updateDrawMario() {
        comp.draw(context);
        marioSprite.draw('idle', context, position.x, position.y);
        position.x += 2;
        position.y += 2;
        requestAnimationFrame(updateDrawMario); // frame repetition
    }

    updateDrawMario();
});