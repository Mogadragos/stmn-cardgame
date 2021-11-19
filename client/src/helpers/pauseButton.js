export default class PauseButton {
    constructor(scene) {
        const button = scene.add.bitmapText(1080, 20, 'arial', "Pause", 15);

        button.setInteractive({ useHandCursor: true }).on('pointerdown', function () {
            scene.scene.launch('Pause', { scene : scene.scene.key });
            scene.scene.pause();
        });
    }
}