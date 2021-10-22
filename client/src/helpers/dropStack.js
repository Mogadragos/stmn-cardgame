import Stack from './stack';

export default class DropStack extends Stack {
    constructor(scene, x, y, cards, callbackLastCard) {
        super(x, y, callbackLastCard, 0, 20, cards);

        this.scene = scene;
    }

    get dropZone() {
        const width = 100, height = 20 * 12 + 153;
        const dropZone = this.scene.add.zone(this.x, this.y, width, height).setRectangleDropZone(width, height).setDepth(-1);
        dropZone.setData({ stack: this });
        this.scene.add.rectangle(this.x, dropZone.y + 120, width, height, 0x6666ff).setDepth(-1);
        return dropZone;
    }
}