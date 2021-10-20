import FreeMode from "./freeMode";
import SpiderSolitaire from "./spiderSolitaire";

export default class ChooseMode extends Phaser.Scene {
    constructor() {
        super({
            key: 'ChooseMode'
        });
    }

    preload() {
        this.cardLabels = [];
        const types = ['H', 'S', 'D', 'C'];
        const families = ['A', 'B', 'C', 'D'];
        for(let j = 0; j < 4; j++) {
            const type = types[j];
            const family = families[j];
            let value = 1;
            for(let i=2; i<11; i++) {
                this.load.image(family + value, 'src/assets/cards/'+ (i + type) +'.png');
                this.cardLabels.push(family + value);
                value++;
            }
            for(let head of ['J', 'Q', 'K', 'A']) {
                this.load.image(family + value, 'src/assets/cards/'+ (head + type) +'.png');
                this.cardLabels.push(family + value);
                value++;
            }
        }
    }

    create() {
        this.cameras.main.setBackgroundColor(0x35654d);
        this.input.setTopOnly(true);
        let self = this;

        const scenes = [
            { name: "Mode libre", key: "FreeMode" },
            { name: "Spider Solitaire", key: "SpiderSolitaire" },
        ];

        let i = 0;
        for(const scene of scenes) {
            const button = this.add.text(75, 350 + 20 * i, [scene.name]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
            button.on('pointerdown', function () {
                self.scene.launch(scene.key).sleep();
            });
            button.on('pointerover', function () {
                this.setColor('#ff69b4');
            })
            button.on('pointerout', function () {
                this.setColor('#00ffff');
            })
            i++;
        }
    }
    
    update() {
    }
}