import Card from '../helpers/card';
import Deck from '../helpers/deck';
import DropStack from '../helpers/dropStack';
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
            {
                const label = type + value;
                this.load.image(label, 'src/assets/cards/'+ ('A' + type) +'.png');
                this.cards_data.push({label, family, value});
                value++
            }
            for(let i=2; i<11; i++) {
                const label = type + value;
                this.load.image(label, 'src/assets/cards/'+ (i + type) +'.png');
                this.cards_data.push({label, family, value});
                value++;
            }
            for(let head of ['J', 'Q', 'K']) {
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
        //this.cameras.main.setBackgroundColor(0x35654d);
        this.input.setTopOnly(true);
        let self = this;

        let draggedCards = [];
        
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            for(const card of draggedCards) {
                card.sprite.x = pointer.x + card.deltaX;
                card.sprite.y = pointer.y + card.deltaY;
            }
        });

        this.input.on('dragstart', function (pointer, gameObject) {
            draggedCards = [];
            for(const card of gameObject.getData('stack').getCards(gameObject.depth)) {
                draggedCards.push({ sprite: card.sprite, depth: card.sprite.depth, deltaX: card.sprite.x - pointer.x, deltaY: card.sprite.y - pointer.y, originalX: card.sprite.x, originalY: card.sprite.y });
                self.children.bringToTop(card.sprite);
            };
        });

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            gameObject.setTint();
            if (!dropped) {
                for(const card of draggedCards) {
                    card.sprite.x = card.originalX;
                    card.sprite.y = card.originalY;
                    card.sprite.depth = card.depth;
                }
            }
        });
        
        this.input.on('drop', function (pointer, gameObject, dropZone) {
            const dragStack = gameObject.getData('stack');
            const dropStack = dropZone.getData('stack');
            const card = gameObject.getData('card');
            if(dropStack != dragStack && ( !dropStack.last_card || (card.value == (dropStack.last_card.value - 1) && card.family % 2 != dropStack.last_card.family % 2))) {
                dropStack.addCards(dragStack.draw(dragStack.cards.length - card.sprite.depth), true, true);
            } else {
                for(const card of draggedCards) {
                    card.sprite.x = card.originalX;
                    card.sprite.y = card.originalY;
                    card.sprite.depth = card.depth;
                }
            }
        });

        const cards = [];
        for(const card_data of this.cards_data) {
            const card = new Card(this, card_data.label, card_data.family, card_data.value);
            card.render(0, 0, false);
            cards.push(card);
        }

        this.stub = new Stack(300, 150, function(last_card) {
            if(last_card) {
                last_card.sprite.setInteractive({ useHandCursor: true});
                self.input.setDraggable(last_card.sprite);
            }
        });

        this.deck = new Deck(this, 150, 150, cards, function(last_card) {
            if(last_card) {
                const deck = this;
                last_card.sprite.setInteractive({ useHandCursor: true}).on('pointerdown', function () {
                    this.off('pointerdown');
                    this.disableInteractive();
                    self.stub.addCards(deck.draw(), true, true);
                });
            } else {
                this.emptyZone.setInteractive();
            }
        });

        this.deck.EmptyZone.setInteractive({ useHandCursor: true }).on('pointerdown', function () {
            this.disableInteractive();
            self.deck.Cards = self.stub.drawAll();
            for(const card of self.deck.cards) {
                card.sprite.input.draggable = false;
            }
            self.deck.render();
        }).disableInteractive();

        for(let i = 0; i < 7; i++) {
            const stack = new DropStack(this, 150 + i * 150, 353, 20*12+153, this.deck.draw(i + 1, false), function(last_card) {
                if(last_card) {
                    last_card.sprite.setTexture(last_card.spriteName).setInteractive({ useHandCursor: true});
                    self.input.setDraggable(last_card.sprite);
                }
            });
            stack.dropZone;
            stack.render();
        }

        this.deck.render();
    }
    
    update() {
    }
}