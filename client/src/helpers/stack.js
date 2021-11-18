export default class Stack {
    constructor(x, y, callbackLastCard = null, deltaX = 0, deltaY = 0, cards = []) {
        this.x = x;
        this.y = y;

        this.deltaX = deltaX;
        this.deltaY = deltaY;

        this.callbackLastCard = callbackLastCard;

        for(const card of cards) {
            card.sprite.setData('stack', this);
        }
        this.cards = cards;

        this.depth = 0;
    }
    
    addCards(cards, visible = false, setupLastCard = false) {
        for(const card of cards) {
            this.addCard(card, visible, setupLastCard);
        }
    }

    addCard(card, visible, setupLastCard) {
        card.sprite.setData('stack', this);
        this.cards.push(card);
        this.redrawCard(card, visible);
        if(setupLastCard && this.callbackLastCard) this.setupLastCard();
    }

    render() {
        this.depth = 0;
        for(const card of this.cards) {
            this.redrawCard(card, false);
        }
        if(this.callbackLastCard) this.setupLastCard();
    }

    redrawCard(card, visible) {
        card.sprite.setDepth(this.depth).setTexture(visible ? card.spriteName : 'BACK_RED').setX(this.x + this.deltaX * this.depth).setY(this.y + this.deltaY * this.depth);
        this.depth++;
    }

    setupLastCard() {
        this.last_card = this.cards[this.cards.length-1];
        this.callbackLastCard(this.last_card);
    }

    drawAll() {
        return this.draw(this.cards.length, false);
    }

    draw(nb_cards = 1, setupLastCard = true) {
        const cards = this.cards.splice(this.cards.length - nb_cards, nb_cards);
        if(setupLastCard && this.callbackLastCard) this.setupLastCard();
        this.depth -= nb_cards;
        return cards;
    }

    getCards(pos_start) {
        return this.cards.slice(pos_start);
    }
}