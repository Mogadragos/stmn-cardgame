export default class PauseButton {
    constructor(scene) {
        const button = scene.add.bitmapText(scene.cameras.main.width - 20, 20, 'arial', "Pause", 15).setOrigin(1, 0);

        button.setInteractive({ useHandCursor: true }).on('pointerdown', function () {
            scene.scene.launch('Pause', { scene : scene.scene.key });
            scene.scene.pause();
        });
    }
}