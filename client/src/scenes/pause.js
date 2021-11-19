export default class Pause extends Phaser.Scene {
    constructor() {
        super({
            key: 'Pause'
        });
    }

    preload() {
    }

    create(data) {
        this.cameras.main.setBackgroundColor(0x3e765a);
        this.input.setDefaultCursor('default');

        const self = this;
  
        this.add.bitmapText(this.cameras.main.centerX, this.cameras.main.centerY, 'arial', "Play", 32).setOrigin(1).setInteractive({ useHandCursor: true }).once('pointerdown', function () {
            self.scene.resume(data.scene);
            self.scene.stop();
        });
    }
    
    update() {
    }
}