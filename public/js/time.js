export default class Counter {
    constructor(fulltime = 1/60) {
        let accumulated = 0;
        let lasttime = 0;

        this.updateProxy = (time) => {
            accumulated += (time - lasttime) / 1000;

            while (accumulated > fulltime) {
                this.update(fulltime);
                accumulated -= fulltime;
            }

            lasttime = time;
            this.queue();
        }
    }

    queue() {
        requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.queue();
    }
}