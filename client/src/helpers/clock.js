export default class Clock {
    constructor(scene, x, y, isRunning = true) {
        this.text = scene.add.text(x, y, "").setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
        this.isRunning = isRunning;

        this.timer = scene.time.addEvent({
            loop: true,
            paused: !isRunning
        });
    }

    update() {
        if(this.isRunning) {
            this.text.setText(Math.floor(this.timer.getElapsed())/1000);
        }
    }

    stop() {
        this.text.setText(Math.floor(this.timer.getElapsed())/1000);
        this.isRunning = false;
        this.timer.paused = true;
    }

}