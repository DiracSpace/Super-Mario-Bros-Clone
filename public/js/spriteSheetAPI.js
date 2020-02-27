// class api for managing images
export default class SpriteSheet {
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map(); // for buffer saving
    }

    // method for saving image in buffer
    define(name, x, y) {
        const buffer = document.createElement('canvas'); // canvas buffer for images with same attributes
        // html canvas attributes
        buffer.width = this.width;
        buffer.height = this.height;
        // start drawing image
        buffer.getContext('2d').drawImage(
            this.image,
            x * this.width,
            y * this.height,
            this.width,
            this.height,
            0,
            0,
            this.width,
            this.height);
        // add buffer so we can call with name the values
        this.tiles.set(name, buffer);
    }

    draw(name, context, x, y) {
        const buffer = this.tiles.get(name); // get attributes from name key
        context.drawImage(buffer, x, y); // draw 
    }

    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height);
    }
}