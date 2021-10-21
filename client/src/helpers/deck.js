export default class Deck {
    constructor(scene, x, y, cards) {
        this.scene = scene;

        this.x = x;
        this.y = y;

        this.fill(cards);
    }

    render() {
        const self = this;

        this.emptyZone = this.scene.add.zone(this.x, this.y, 100, 153).setInteractive({ useHandCursor: true}).on('pointerdown', function () {
            this.disableInteractive();
            self.fill(self.scene.stub.getAllCards());
            self.setupCards();
        }).disableInteractive();

        this.setupCards();
    }

    setupCards() {
        let i = 0;
        for(const card of this.cards) {
            card.sprite.setDepth(i).setTexture('BACK_RED').setX(this.x - i).setY(this.y - i);
            i++;
        }
        this.setupLastCard();
    }

    setupLastCard() {
        const self = this;

        const last_card = this.last_card = this.cards[this.cards.length-1];

        if(last_card) {
            last_card.sprite.setInteractive({ useHandCursor: true}).on('pointerdown', function () {
                this.off('pointerdown');
                this.disableInteractive();
                self.scene.stub.addCards(self.draw(1), true);
                self.setupLastCard();
            });
        } else {
            this.emptyZone.setInteractive();
        }
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

    draw(nb_cards = 1) {
        return this.cards.splice(this.cards.length - nb_cards, nb_cards);
    }
}