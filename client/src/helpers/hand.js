import Card from './card';

export default class Hand {
    constructor(scene) {

        this.scene = scene;

        this.cards = [];

        const { width, height } = scene.sys.game.canvas;

        this.x = width/2;
        this.y = height - 175;
        this.width = width;
        this.height = 250;
        
        this.renderZone = () => {
            let dropZone = scene.add.zone(this.x, this.y, this.width, this.height).setRectangleDropZone(this.width, this.height);
            dropZone.setData({ cards: 0 });
            return dropZone;
        };
    }

    addCard(x, sprite) {
        const playerCard = new Card(this.scene);
        playerCard.render(x, this.scene.hand.y, sprite);
        this.cards.push(playerCard);
    }

    orderCards() {
        this.cards.sort((a, b) => {
            const famCompare = a.spriteName[0].localeCompare(b.spriteName[0]);
            if(famCompare === 0) {
                const aVal = parseInt(a.spriteName.slice(1)), bVal = parseInt(b.spriteName.slice(1));
                if(aVal < bVal) {
                    return -1;
                }
                if(aVal > bVal) {
                    return 1;
                }
                return 0;
            }
            return famCompare;
        });

        const minCardX = this.x - (this.cards.length/2)*75 + 37.5;
        let index = 0;

        for (const card of this.cards) {
            card.sprite.x = minCardX + (index * 75);
            card.sprite.setDepth(index + 1);
            index++;
        }
    }
}