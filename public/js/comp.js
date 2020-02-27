// compositor class is only for drawing in the layers in order
export default class compositor {
    constructor() {
        this.layers = [];
    }

    draw(context) {
        this.layers.forEach(layer => {
            // function that draws in a context
            layer(context);
        });
    }
}