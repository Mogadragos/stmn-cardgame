export default class ChooseMode extends Phaser.Scene {
    constructor() {
        super({
            key: 'ChooseMode'
        });
    }

    preload() {}

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
            const button = this.add.text(75, 350 + 20 * i, [scene.name]).setFontSize(18).setFontFamily('Arial').setColor('#00ffff').setInteractive();
            button.on('pointerdown', function () {
                self.scene.launch(scene.key).sleep();
            }).on('pointerover', function () {
                this.setColor('#ff69b4');
            }).on('pointerout', function () {
                this.setColor('#00ffff');
            });
            i++;
        }
    }
    
    update() {
    }
}