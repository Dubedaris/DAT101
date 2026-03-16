"use strict";
import { TSpriteNumber, TSpriteButton, ESpriteNumberJustifyType } from "libSprite";
import { TPoint } from "lib2d";
import { gameLevel, newGame } from "./Minesweeper.mjs";
import { gameIsOver, gameIsWon } from "./tiles.js";


export class TGameInfo {
    #countDown;
    #timer;
    #smiley;
    #hndTimer;

    constructor(aSpcvs, aSPI) {
        const pos = new TPoint();
        pos.x = aSPI.Board.LeftMiddle.width;
        pos.y = 22;
        this.#countDown = new TSpriteNumber(aSpcvs, aSPI.Numbers, pos.x, pos.y);
        this.#countDown.digits = 3;
        this.#countDown.value = gameLevel.Mines;
        pos.x = aSpcvs.width - 24;
        this.#timer = new TSpriteNumber(aSpcvs, aSPI.Numbers, pos.x, pos.y);
        this.#timer.justify = ESpriteNumberJustifyType.Right;
        this.#timer.digits = 3;
        pos.x = (aSpcvs.width/2) - (aSPI.ButtonSmiley.width / 2);
        this.#smiley = new TSpriteButton(aSpcvs, aSPI.ButtonSmiley, pos.x, pos.y);
        this.#smiley.addEventListener("mousedown", this.#smileyMouseDown.bind(this));
        this.#smiley.addEventListener("mouseup", this.#smileyMouseUp.bind(this));
        this.#hndTimer = setInterval(this.onTime.bind(this), 1000);
    }

    #smileyMouseDown() {
        this.#smiley.index++;
    }

    #smileyMouseUp() {
        this.#smiley.index--;
        newGame();
    }


    get flagCount() {
        return this.#countDown.value;
    }

    set flagCount(aValue) {
        this.#countDown.value = aValue;
    }
    
    smileyIndex(aIndex) {
        this.#smiley.index = aIndex;
    }

    draw() {
        this.#countDown.draw();
        this.#timer.draw();
        this.#smiley.draw();
    }

    onTime() {
        this.#timer.value++;
        if(gameIsOver || gameIsWon) {
            clearInterval(this.#hndTimer);
        }
    }


}



