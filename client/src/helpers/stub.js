import Stack from './stack';
import Card from './card';

export default class Stub extends Stack {
    /**
     * 
     * @param {number} x 
     * @param {number} y
     * @param {function} callbackLastCard 
     * @param {number} nb_cards
     */
    constructor(x, y, callbackLastCard = null, nb_cards = 1) {
        super(x, y, callbackLastCard);

        this.nb_cards = nb_cards;

        this.deltaX = 20;
    }

    addCards(cards) {
        for(const card of this.cards.slice(-this.nb_cards)) {
            card.sprite.setX(this.x).disableInteractive();
        }

        super.addCards(cards, true);

        let i = 0;
        for(const card of cards) {
            card.sprite.setX(this.x + this.deltaX * i);
            i++;
        }

        this.setupLastCard(false);

        this.last_card_x = this.last_card.sprite.x;
    }

    setupLastCard(move_cards = true) {
        super.setupLastCard();

        if(move_cards) {
            if(this.cards.length > this.nb_cards - 1) {
                if(this.last_card.sprite.x < this.last_card_x) {
                    let i = 0;
                    for(const card of this.cards.slice(-this.nb_cards)) {
                        card.sprite.setX(this.x + this.deltaX * i);
                        i++;
                    }
                }
            }
        }
    }
}