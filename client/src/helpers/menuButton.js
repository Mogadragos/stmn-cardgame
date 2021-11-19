export default class MenuButton {
    constructor(scene) {
        const button = scene.add.bitmapText(scene.cameras.main.width - 20, 20, 'arial', "Menu", 15).setOrigin(1, 0);

        button.setInteractive({ useHandCursor: true }).on('pointerdown', function () {
            scene.scene.launch('Menu', { scene : scene.scene });
            scene.scene.pause();
        });
    }
}