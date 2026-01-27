"use strict";
import { TSprite } from "libSprite";
import { TColorButton } from "./colorButton.js";
import { TPoint } from "lib2d";

export class TGameBoard extends TSprite {
    #colorButtons;
    #spStartEnd;

    constructor(aSpcvs, aSPI) {
        const spiStartEnd = aSPI.ButtonStartEnd;
        const center = new TPoint(
            aSPI.Background.height/2,
            aSPI.Background.width/2
        );

        super(aSpcvs, aSPI.Background, 0, 0);
        this.#spStartEnd = new TSprite(aSpcvs, spiStartEnd, spiStartEnd.dst.x, spiStartEnd.dst.y);
        this.#colorButtons = [
            new TColorButton(aSpcvs, aSPI.ButtonRed, center),
            new TColorButton(aSpcvs, aSPI.ButtonBlue, center),
            new TColorButton(aSpcvs, aSPI.ButtonGreen, center),
            new TColorButton(aSpcvs, aSPI.ButtonYellow, center)
        ];
    }

    draw() {
        super.draw();
        for(let i=0; i < this.#colorButtons.length; i++) {
            const colorButton = this.#colorButtons[i];
            colorButton.draw();
        }
        //this.#spStartEnd.draw();
    }
}