export default class Menu extends Phaser.Scene {
    constructor() {
        super({
            key: 'Menu'
        });
    }

    preload() {
    }

    create(data) {
        this.cameras.main.setBackgroundColor(0x3e765a);
        this.input.setDefaultCursor('default');

        const self = this;

        const resume = () => {
            data.scene.resume();
            self.scene.stop();
        }
  
        this.add.bitmapText(this.cameras.main.centerX, this.cameras.main.centerY - 60, 'arial', "Reprendre", 30).setOrigin(0.5).setInteractive({ useHandCursor: true }).once('pointerdown', resume);

        this.add.bitmapText(this.cameras.main.centerX, this.cameras.main.centerY, 'arial', "Recommencer", 30).setOrigin(0.5).setInteractive({ useHandCursor: true }).once('pointerdown', function () {
            data.scene.restart();
            self.scene.stop();
        });

        this.add.bitmapText(this.cameras.main.centerX, this.cameras.main.centerY + 60, 'arial', "Retour au menu", 30).setOrigin(0.5).setInteractive({ useHandCursor: true }).once('pointerdown', function () {
            data.scene.stop();
            self.scene.wake('ChooseMode');
            self.scene.stop();
        });

        this.input.keyboard.on('keydown-ESC', resume);
    }
    
    update() {
    }
}