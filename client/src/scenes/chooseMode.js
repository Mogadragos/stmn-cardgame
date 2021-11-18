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
            { name: "Solitaire", key: "Solitaire", difficulties: [{ name: "1", value: 1 }, { name: "2", value: 2 }, { name: "3", value: 3 }] },
        ];

        let i = 0;
        for(const scene of scenes) {
            const y = 350 + 20 * i;
            const button = this.add.bitmapText(75, y, 'arial', scene.name, 18);
            
            if(scene.difficulties) {
                let j = 0;
                let prev_x = button.x + button.width;
                for(const diff of scene.difficulties) {
                    const x = prev_x + 25;
                    const diff_button = this.add.bitmapText(x, y, 'arial', diff.name, 18).setInteractive({useHandCursor: true});
                    
                    diff_button.on('pointerdown', function () {
                        self.scene.launch(scene.key, {difficulty: diff.value}).sleep();
                    }).on('pointerover', function () {
                        this.setTint(0xff69b4);
                    }).on('pointerout', function () {
                        this.clearTint();
                    });

                    prev_x = x + diff_button.width;
                    j++;
                }
            } else {
                button.setInteractive({useHandCursor: true});
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
    }
    
    update() {
    }
}