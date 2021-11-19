import Phaser from "phaser";
import ChooseMode from "./scenes/chooseMode";
import FreeMode from "./scenes/freeMode";
import Pause from "./scenes/pause";
import Solitaire from "./scenes/solitaire";

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
        ChooseMode,
        Solitaire,
        Pause
    ]
};

const game = new Phaser.Game(config);