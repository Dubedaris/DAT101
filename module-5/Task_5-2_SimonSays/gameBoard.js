"use strict";
import { ESpriteNumberJustifyType, TSprite, TSpriteButton, TSpriteNumber } from "libSprite";
import { TColorButton } from "./colorButton.js";
import { TPoint, TCircle } from "lib2d";
import { activateAudioContext } from "libSound";
import { spawnButton, resetGame } from "./SimonSays.mjs";

export class TGameBoard extends TSprite {
    #colorButtons;
    #spStartEnd;
    #isSoundEnabled;
    #spFinalScore;

    constructor(aSpcvs, aSPI) {
        const center = new TPoint(
            aSPI.Background.height/2,
            aSPI.Background.width/2
        );

        super(aSpcvs, aSPI.Background, 0, 0);
        this.#colorButtons = [
            new TColorButton(aSpcvs, aSPI.ButtonRed, center),
            new TColorButton(aSpcvs, aSPI.ButtonBlue, center),
            new TColorButton(aSpcvs, aSPI.ButtonGreen, center),
            new TColorButton(aSpcvs, aSPI.ButtonYellow, center)
        ];
        this.#spStartEnd = new TSpriteButton(aSpcvs, aSPI.ButtonStartEnd, aSPI.ButtonStartEnd.dst.x, aSPI.ButtonStartEnd.dst.y, TCircle);
        this.#spStartEnd.onClick = this.#startEndClick.bind(this);
        this.#disableColorButtons(true);
        this.#isSoundEnabled = false;

        this.spRound = new TSpriteNumber(aSpcvs, aSPI.number, 405, 385);
        this.spRound.justify = ESpriteNumberJustifyType.Right;
        this.spRound.value = 0;
        this.#spFinalScore = new TSpriteNumber(aSpcvs, aSPI.number, aSPI.Background.width/2,450);
        this.#spFinalScore.justify = ESpriteNumberJustifyType.Center;
        this.#spFinalScore.visible = false;
        
    }

    get colorButtons() {
        return this.#colorButtons;
    }

    gameOver() {
        this.#disableColorButtons(true);
        this.#spStartEnd.index = 1;
        this.#spStartEnd.hidden = false;
        this.#spStartEnd.disabled = false;
        this.#spFinalScore.value = this.spRound.value;
        this.#spFinalScore.visible = true;
    }

    draw() {
        super.draw();
        for(let i=0; i < this.#colorButtons.length; i++) {
            const colorButton = this.#colorButtons[i];
            colorButton.draw();
        }
        this.spRound.draw();
        this.#spStartEnd.draw();
        this.#spFinalScore.draw();
    }

    #disableColorButtons(aDisable) {
        for(let i = 0; i < this.#colorButtons.length; i++) {
            const colorButton = this.#colorButtons[i];
            colorButton.disabled = aDisable;
        }
    }
    #startEndClick() {
        this.#spStartEnd.disabled = true;
        this.#spStartEnd.hidden = true;
        this.#disableColorButtons(false);
        if(this.#isSoundEnabled === false) {
            activateAudioContext();
            this.#isSoundEnabled = true;
            for(let i = 0; i < this.#colorButtons.length; i++) {
                const colorButton = this.#colorButtons[i];
                colorButton.createSound(i);
            }
        }
        this.#spFinalScore.visible = false;
        resetGame();
        spawnButton(); // this activates the sequence when we start the game. 
    }
}