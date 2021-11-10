export default class ChooseMode extends Phaser.Scene {
    constructor() {
        super({
            key: 'ChooseMode'
        });
    }

    preload() {
        this.load.bitmapFont('arial', './assets/fonts/arial.png', './assets/fonts/arial.xml');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x3e765a);
        this.input.setTopOnly(true);
        let self = this;

        const scenes = [
            //{ name: "Mode libre", key: "FreeMode" },
            { name: "Solitaire", key: "Solitaire" },
        ];

        let i = 0;
        for(const scene of scenes) {
            const button = this.add.bitmapText(75, 350 + 20 * i, 'arial', scene.name, 18).setInteractive();
            button.on('pointerdown', function () {
                self.scene.launch(scene.key).sleep();
            }).on('pointerover', function () {
                this.setTint(0xff69b4);
            }).on('pointerout', function () {
                this.clearTint();
            });
            i++;
        }
    }
    
    update() {
    }
}