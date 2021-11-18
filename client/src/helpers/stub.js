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

    addCards(cards, visible = false, setupLastCard = false) {
        super.addCards(cards, visible, setupLastCard);

        this.prev_cards = cards;
    }
}