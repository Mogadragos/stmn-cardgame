export default class Card {
    constructor(scene) {
        this.render = (x, y, spriteName, family, value) => {
            this.spriteName = spriteName;

            this.family = family;
            this.value = value;

            this.sprite = scene.add.image(x, y, spriteName).setInteractive({ draggable: true, useHandCursor: true});
            this.sprite.displayWidth = 200;
            this.sprite.scaleY = this.sprite.scaleX;

            this.sprite.setTint(0xE7E7E7);

            this.sprite.on('pointerover', function () {
                this.setTint();
            });

            this.sprite.on('pointerout', function () {
                this.setTint(0xE7E7E7);
            });
        }
    }
}