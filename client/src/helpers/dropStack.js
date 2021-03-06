import Stack from './stack';
import Card from './card';

export default class DropStack extends Stack {
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} type 
     * @param {number} x 
     * @param {number} y 
     * @param {number} deltaX 
     * @param {number} deltaY 
     * @param {number} deltaZoneY 
     * @param {number} height 
     * @param {Card[]} cards 
     * @param {function=} callbackLastCard 
     */
    constructor(scene, type, x, y, deltaX, deltaY, deltaZoneY, height, cards, callbackLastCard = null) {
        super(x, y, callbackLastCard, deltaX, deltaY, cards);

        this.type = type;

        this.scene = scene;

        this.height = height;
        const width = 100;

        this.dropZone = this.scene.add.zone(this.x, this.y + deltaZoneY, width, this.height).setDepth(-1).setDropZone();
        this.dropZone.setData('stack', this);
    }
}