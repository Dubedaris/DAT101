"use strict";
import { TSprite, TSpriteButton } from "libSprite";
import { startGame } from "./FlappyBird.mjs";

export class TMenu {
    #spTitle;
    #spPlayBtn;
    constructor(aSpcvs, aSPI) {
        const titleX = aSPI.background.width/2-(aSPI.flappyBird.width/2);
        const playX = aSPI.background.width/2-(aSPI.buttonPlay.width/2);
        this.#spTitle = new TSprite(aSpcvs, aSPI.flappyBird, titleX, 100);
        this.#spPlayBtn = new TSpriteButton(aSpcvs, aSPI.buttonPlay, playX, 200);
        this.#spPlayBtn.addEventListener("click", this.spPlayBtnClick.bind(this));

    }

    draw() {
        this.#spTitle.draw();
        this.#spPlayBtn.draw();
    }

    spPlayBtnClick() {
        console.log("button clicked!");
        this.#spPlayBtn.hidden = true;
        this.#spTitle.hidden = true;
        startGame();
    }
}