// class api for managing images
export default class SpriteSheet {
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map(); // for buffer saving
    }

    // method for saving image in buffer
    define(name, x, y, width, height) {
        const buffer = document.createElement('canvas'); // canvas buffer for images with same attributes
        // html canvas attributes
        buffer.width = width;
        buffer.height = height;
        // start drawing image
        buffer.getContext('2d').drawImage(
            this.image,
            x,
            y,
            width,
            height,
            0,
            0,
            width,
            height);
        // add buffer so we can call with name the values
        this.tiles.set(name, buffer);
    }

    // define function changed, caused some problems
    defineTile(name, x, y) {
        this.define(name, x * this.width, y * this.height, this.width, this.height);
    }

    draw(name, context, x, y) {
        const buffer = this.tiles.get(name); // get attributes from name key
        context.drawImage(buffer, x, y); // draw 
    }

    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height);
    }
}