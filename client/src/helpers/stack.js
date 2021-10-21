export default class Stack {
    constructor(x, y, deltaX = 0, deltaY = 0) {
        this.x = x;
        this.y = y;

        this.deltaX = deltaX;
        this.deltaY = deltaY;

        this.cards = [];

        this.depth = 0;
    }
    
    addCards(cards, visible) {
        for(const card of cards) {
            this.cards.push(card);
            card.sprite.setDepth(this.depth).setTexture(visible ? card.spriteName : 'BACK_RED').setX(this.x + this.deltaX * this.depth).setY(this.y + this.deltaY * this.depth);
            this.depth++;
        }
    }

    getAllCards() {
        this.depth = 0;
        return this.cards.splice(0, this.cards.length);
    }
}