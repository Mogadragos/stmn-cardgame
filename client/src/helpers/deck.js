import Stack from './stack';

export default class Deck extends Stack {
    constructor(scene, x, y, cards, callbackLastCard, onClickEmpty) {
        super(x, y, callbackLastCard, -1, -1, cards);

        this.scene = scene;

        this.onClickEmpty = onClickEmpty;

        this.shuffle();
    }

    /**
     * @param {Card[]} cards
     */
    set Cards (cards) {
        this.cards = cards;
        this.shuffle();
    }

    render() {
        const self = this;

        this.emptyZone = this.scene.add.zone(this.x, this.y, 100, 153).setInteractive({ useHandCursor: true }).on('pointerdown', function () {
            self.onClickEmpty(this);
        }).disableInteractive();

        this.redrawDeck();
    }

    redrawDeck() {
        this.redrawStack();
        this.setupLastCard();
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
}