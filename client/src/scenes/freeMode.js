import Card from '../helpers/card';
import Hand from '../helpers/hand';
import Dealer from '../helpers/dealer'

export default class FreeMode extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        this.cardLabels = [];
        const types = ['C', 'D', 'H', 'S'];
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
        this.cameras.main.setBackgroundColor(0x35654d);
        this.input.setTopOnly(true);
        let self = this;

        this.hand = new Hand(this);
        this.dropZone = this.hand.renderZone();

        this.dealer = new Dealer(this);

        this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();

		this.dealText.on('pointerdown', function () {
            self.dealer.dealCards(13);
        })

        this.dealText.on('pointerover', function () {
            self.dealText.setColor('#ff69b4');
        })

        this.dealText.on('pointerout', function () {
            self.dealText.setColor('#00ffff');
        })

        this.orderCards = this.add.text(75, 300, ['ORDER CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();

        this.orderCards.on('pointerdown', function() {
            self.hand.orderCards();
        })

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        this.input.on('dragstart', function (pointer, gameObject) {
            self.children.bringToTop(gameObject);
        })

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
            }
            gameObject.y = gameObject.input.dragStartY;
        })
    }
    
    update() {
    }
}