import Stack from './stack';

export default class DropStack extends Stack {
    constructor(scene, x, y, height, cards, callbackLastCard) {
        super(x, y, callbackLastCard, 0, 20, cards);

        this.scene = scene;

        this.height = height;
    }

    get dropZone() {
        const width = 100;
        const dropZone = this.scene.add.zone(this.x, this.y + 120, width, this.height).setRectangleDropZone(width, this.height).setDepth(-1);
        dropZone.setData('stack', this);
        this.scene.add.rectangle(this.x, dropZone.y, width, this.height, 0x6666ff).setDepth(-1);
        return dropZone;
    }
}