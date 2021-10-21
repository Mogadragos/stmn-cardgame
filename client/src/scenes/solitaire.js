import Card from '../helpers/card';
import Deck from '../helpers/deck';
import Stack from '../helpers/stack';

export default class Solitaire extends Phaser.Scene {
    constructor() {
        super({
            key: 'Solitaire'
        });
    }

    preload() {
        this.cards_data = [];
        const types = ['H', 'S', 'D', 'C'];
        let family = 1;
        for(const type of types) {
            let value = 1;
            for(let i=2; i<11; i++) {
                const label = type + value;
                this.load.image(label, 'src/assets/cards/'+ (i + type) +'.png');
                this.cards_data.push({label, family, value});
                value++;
            }
            for(let head of ['J', 'Q', 'K', 'A']) {
                const label = type + value;
                this.load.image(label, 'src/assets/cards/'+ (head + type) +'.png');
                this.cards_data.push({label, family, value});
                value++;
            }
            family++;
        }
        this.load.image('BACK_RED', 'src/assets/cards/red_back.png');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x35654d);
        this.input.setTopOnly(true);
        let self = this;

        const cards = [];
        for(const card_data of this.cards_data) {
            const card = new Card(this, card_data.label, card_data.family, card_data.value);
            card.render(0, 0, false);
            cards.push(card);
        }

        this.stub = new Stack(300, 200);

        this.deck = new Deck(this, 150, 200, cards, function(zone) {
            zone.disableInteractive();
            this.fill(self.stub.drawAll());
            this.redrawDeck();
        }, function() {
            const deck = this;
            const last_card = this.last_card = this.cards[this.cards.length-1];
            if(last_card) {
                last_card.sprite.setInteractive({ useHandCursor: true}).on('pointerdown', function () {
                    this.off('pointerdown');
                    this.disableInteractive();
                    self.stub.addCards(deck.draw(), true);
                });
            } else {
                this.emptyZone.setInteractive();
            }
        });

        for(let i = 1; i < 8; i++) {
            this.deck.draw(i, false);
        }

        this.deck.render();
    }
    
    update() {
    }
}