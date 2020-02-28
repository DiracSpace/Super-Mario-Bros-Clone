import compositor from './comp.js';
import Counter from './time.js';
import { loadLevel } from './imageLoader.js';
import { createMario } from './mario.js';
import { loadSprites } from './sprites.js';
import { createSpriteLayer, createBackgroundLayer } from './layers.js';

window.addEventListener('keydown', event => {
    console.log(event);
});

// get DOM element
const drawingboard = document.getElementById('screen');
const context = drawingboard.getContext('2d');

// optimization and synchronization
Promise.all([
    createMario(),
    loadSprites(),
    loadLevel('1-1')
]).then(([mario, backgroundSprites, level]) => {
    const comp = new compositor();
    const backgroundLayers = createBackgroundLayer(level.backgrounds, backgroundSprites);
    comp.layers.push(backgroundLayers);

    const gravity = 2000;
    mario.position.set(64, 180);
    mario.velocity.set(200, -600);

    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);

    const timer = new Counter(1 / 60);
    // mario left trail so repeat background drawing
    // for every new frame generated
    timer.update = function updateDrawMario(fulltime) {
        mario.update(fulltime);
        comp.draw(context);
        mario.velocity.y += gravity * fulltime;
    }
    timer.start();
});