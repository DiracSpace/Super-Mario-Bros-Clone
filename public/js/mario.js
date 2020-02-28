import { loadMario } from './sprites.js';
import EntityCharacters from './entityClass.js';

// mario class
export function createMario() {
    return loadMario().then(sprite => {
        const mario = new EntityCharacters();

        mario.draw = function drawMario(context) {
            sprite.draw('idle', context, this.position.x, this.position.y);
        }

        mario.update = function updateMario(fulltime) {
            this.position.x += this.velocity.x * fulltime;
            this.position.y += this.velocity.y * fulltime;
        }
        return mario;
    });
}