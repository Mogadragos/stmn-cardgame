import Phaser from "phaser";
import FreeMode from "./scenes/freeMode";

const config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'stmn-cardgame',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 780,
    },
    scene: [
        FreeMode
    ]
};

const game = new Phaser.Game(config);