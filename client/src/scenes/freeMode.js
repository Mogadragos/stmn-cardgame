export default class FreeMode extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        this.load.image('2C', 'src/assets/cards/2C.png');
        this.load.image('2D', 'src/assets/cards/2D.png');
        this.load.image('2H', 'src/assets/cards/2H.png');
        this.load.image('2S', 'src/assets/cards/2S.png');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x35654d);
        this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
    }
    
    update() {
    
    }
}