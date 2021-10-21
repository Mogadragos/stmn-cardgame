export default class Card {
    constructor(scene, spriteName, family, value) {
        this.scene = scene;
        this.spriteName = spriteName;
        this.family = family;
        this.value = value;
    }

    render(x, y, revealed) {
        this.sprite = this.scene.add.image(x, y, (revealed ? this.spriteName : 'BACK_RED'));
        this.sprite.displayWidth = 100;
        this.sprite.scaleY = this.sprite.scaleX;
        this.sprite.setTint(0xE7E7E7).on('pointerover', function () {
            this.setTint();
        }).on('pointerout', function () {
            this.setTint(0xE7E7E7);
        });
    }
}