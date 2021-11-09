export default class Clock {
    constructor(scene, x, y, isRunning = true) {
        this.text = scene.add.text(x, y, "").setFontSize(15).setFontFamily('Arial').setColor('#ffffff');
        this.isRunning = isRunning;
        this.minutes = 0;

        const self = this;

        this.timer = scene.time.addEvent({
            delay: 60000,
            loop: true,
            paused: !isRunning,
            callback: () => {
                self.minutes++;
            }
        });
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