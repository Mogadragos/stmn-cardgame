import Phaser from "phaser";
import ChooseMode from "./scenes/chooseMode";
import FreeMode from "./scenes/freeMode";
import Menu from "./scenes/menu";
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
        Menu
    ]
};

const game = new Phaser.Game(config);