import { vectors } from './vector.js';

// class for mario management
export default class EntityCharacters {
    constructor() {
        this.position = new vectors(0, 0);
        this.velocity = new vectors(0, 0)
    }
}