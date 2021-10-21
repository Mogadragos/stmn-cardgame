import Stack from './stack';

export default class Deck extends Stack {
    constructor(scene, x, y, cards, onClickEmpty, setupLastCard) {
        super(x, y, -1, -1, setupLastCard);

        this.scene = scene;

        this.fill(cards);

        this.onClickEmpty = onClickEmpty;
    }

    render() {
        const self = this;

        this.emptyZone = this.scene.add.zone(this.x, this.y, 100, 153).setInteractive({ useHandCursor: true }).on('pointerdown', function () {
            self.onClickEmpty(this);
        }).disableInteractive();

        this.redrawDeck();
    }

    redrawDeck() {
        this.depth = 0;
        for(const card of this.cards) {
            this.redrawCard(card, false);
        }
        this.setupLastCard();
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    fill(cards) {
        this.cards = cards;
        this.shuffle();
    }
}