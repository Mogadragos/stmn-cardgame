export default class Stack {
    constructor(x, y, deltaX = 0, deltaY = 0, setupLastCard) {
        this.x = x;
        this.y = y;

        this.deltaX = deltaX;
        this.deltaY = deltaY;

        this.setupLastCard = setupLastCard;

        this.cards = [];

        this.depth = 0;
    }
    
    addCards(cards, visible) {
        for(const card of cards) {
            this.cards.push(card);
            this.redrawCard(card, visible);
        }
    }

    redrawCard(card, visible) {
        card.sprite.setDepth(this.depth).setTexture(visible ? card.spriteName : 'BACK_RED').setX(this.x + this.deltaX * this.depth).setY(this.y + this.deltaY * this.depth);
        this.depth++;
    }

    drawAll() {
        return this.draw(this.cards.length, false);
    }

    draw(nb_cards = 1, setupLastCard = true) {
        const cards = this.cards.splice(this.cards.length - nb_cards, nb_cards);
        if(setupLastCard && this.setupLastCard) this.setupLastCard();
        this.depth -= nb_cards;
        return cards;
    }
}