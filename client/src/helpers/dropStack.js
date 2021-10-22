import Stack from './stack';

export default class DropStack extends Stack {
    constructor(scene, x, y, cards, callbackLastCard) {
        super(x, y, callbackLastCard, 0, 20, cards);

        this.scene = scene;
    }

    render() {
        const self = this;

        this.dropZone = this.scene.add.zone(this.x, this.y, 100, 20 * 6 + 153).setInteractive({ useHandCursor: true });

        this.redrawStack();

        this.setupLastCard();
    }
}