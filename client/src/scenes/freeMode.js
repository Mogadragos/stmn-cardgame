import Card from '../helpers/card';
import Hand from '../helpers/hand';
import Dealer from '../helpers/dealer'

export default class FreeMode extends Phaser.Scene {
    constructor() {
        super({
            key: 'FreeMode'
        });
    }

    preload() {
        this.cardLabels = [];
        const types = ['H', 'S', 'D', 'C'];
        const families = ['A', 'B', 'C', 'D'];
        for(let j = 0; j < 4; j++) {
            const type = types[j];
            const family = families[j];
            let value = 1;
            for(let i=2; i<11; i++) {
                this.load.image(family + value, 'src/assets/cards/'+ (i + type) +'.png');
                this.cardLabels.push(family + value);
                value++;
            }
            for(let head of ['J', 'Q', 'K', 'A']) {
                this.load.image(family + value, 'src/assets/cards/'+ (head + type) +'.png');
                this.cardLabels.push(family + value);
                value++;
            }
        }
    }

    create() {
        this.cameras.main.setBackgroundColor(0x3e765a);
        this.input.setTopOnly(true);
        let self = this;

        this.hand = new Hand(this);
        this.dropZone = this.hand.renderZone();

        this.dealer = new Dealer(this);

        this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Arial').setColor('#00ffff').setInteractive();

		this.dealText.on('pointerdown', function () {
            self.cards = self.dealer.dealCards(13);
        })

        this.dealText.on('pointerover', function () {
            self.dealText.setColor('#ff69b4');
        })

        this.dealText.on('pointerout', function () {
            self.dealText.setColor('#00ffff');
        })

        this.orderCards = this.add.text(75, 300, ['ORDER CARDS']).setFontSize(18).setFontFamily('Arial').setColor('#00ffff').setInteractive();

        this.orderCards.on('pointerdown', function() {
            self.hand.orderCards();
        })

        this.input.on('drag', function (pointer, cardObject, dragX, dragY) {
            cardObject.x = dragX;
            cardObject.y = dragY;
        })

        this.input.on('dragstart', function (pointer, cardObject) {
            self.children.bringToTop(cardObject);
        })

        this.input.on('dragend', function (pointer, cardObject, dropped) {
            cardObject.setTint();
            if (!dropped) {
                cardObject.x = cardObject.input.dragStartX;
            }
            cardObject.y = cardObject.input.dragStartY;
        })
    }
    
    update() {
    }
}