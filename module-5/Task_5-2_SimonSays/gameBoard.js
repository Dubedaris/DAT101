"use strict";
import { TSprite, TSpriteButton } from "libSprite";
import { TColorButton } from "./colorButton.js";
import { TPoint, TCircle } from "lib2d";
import { activateAudioContext } from "libSound";

export class TGameBoard extends TSprite {
    #colorButtons;
    #spStartEnd;
    #isSoundEnabled;

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
        this.#spStartEnd = new TSpriteButton(aSpcvs, aSPI.ButtonStartEnd, aSPI.ButtonStartEnd.dst.x, aSPI.ButtonStartEnd.dst.y);
        this.#spStartEnd.debug = true;
        this.#spStartEnd.onClick = this.#startEndClick.bind(this);
        this.#disableColorButtons(true);
        this.#isSoundEnabled = false;
        
    }

    draw() {
        super.draw();
        for(let i=0; i < this.#colorButtons.length; i++) {
            const colorButton = this.#colorButtons[i];
            colorButton.draw();
        }
       this.#spStartEnd.draw();
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
    }
}