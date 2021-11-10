export default class Clock {
    constructor(scene, x, y) {
        this.text = scene.add.bitmapText(x, y, 'arial', "0", 15);
        this.isRunning = false;
        this.minutes = 0;

        const self = this;

        this.timer = scene.time.addEvent({
            delay: 60000,
            loop: true,
            paused: true,
            callback: () => {
                self.minutes++;
            }
        });
    }

    start() {
        this.timer.paused = false;
        this.isRunning = true;
    }

    update() {
        if(this.isRunning) {
            this.text.setText(this.minutes + ' min ' + Math.floor(this.timer.getElapsed())/1000);
        }
    }

    stop() {
        this.timer.paused = true;
        this.isRunning = false;
        this.text.setText(this.minutes + ' min ' + Math.floor(this.timer.getElapsed())/1000);
    }

}