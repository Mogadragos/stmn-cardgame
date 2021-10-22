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
        
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setData('depth', gameObject.depth);
            self.children.bringToTop(gameObject);
        });

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
                gameObject.setDepth(gameObject.getData('depth'));
            }
        });
        
        this.input.on('drop', function (pointer, gameObject, dropZone) {
            const dragStack = gameObject.getData('stack');
            const dropStack = dropZone.getData('stack');
            if(dropStack != dragStack) {
                dropStack.addCards(dragStack.draw(), true, true);
            } else {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
                gameObject.setDepth(gameObject.getData('depth'));
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
            const stack = new DropStack(this, 150 + i * 150, 353, this.deck.draw(i + 1, false), function(last_card) {
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