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
        this.prev_cards = [];
    }

    addCards(cards) {
        super.addCards(cards, true);

        let i = 0;
        for(const card of cards) {
            card.sprite.setX(this.x + 20 * i);
            i++;
        }

        this.setupLastCard();
    }
}