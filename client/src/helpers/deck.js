import Stack from './stack';

export default class Deck extends Stack {
    constructor(scene, x, y, cards, callbackLastCard) {
        super(x, y, callbackLastCard, -1, -1, cards);

        this.scene = scene;

        this.shuffle();
    }

    get EmptyZone() {
        return this.emptyZone = this.scene.add.zone(this.x, this.y, 100, 153);
    }

    /**
     * @param {Card[]} cards
     */
    set Cards (cards) {
        for(const card of cards) {
            card.sprite.setData('stack', this);
        }
        this.cards = cards;
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
}