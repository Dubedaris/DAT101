"use strict";
import { TSprite, TSpriteButton, TSpriteNumber } from "libSprite";
import { EGameStatus, startGame } from "./FlappyBird.mjs";
import { TSoundFile } from "libSound";

const fnCountDown = "./Media/countDown.mp3";
const fnRunning = "./Media/running.mp3";

export class TMenu {
    #spTitle;
    #spPlayBtn;
    #spCountDown;
    #sfCountDown;
    #sfRunning;
    #spScore;
    constructor(aSpcvs, aSPI) {
        this.#spTitle = new TSprite(aSpcvs, aSPI.flappyBird, aSPI.background.width / 2 - (aSPI.flappyBird.width / 2), 100);
        this.#spPlayBtn = new TSpriteButton(aSpcvs, aSPI.buttonPlay, aSPI.background.width / 2 - (aSPI.buttonPlay.width / 2), 200);
        this.#spCountDown = new TSpriteNumber(aSpcvs, aSPI.numberBig, aSPI.background.width / 2 - (aSPI.numberBig.width / 2), 200);
        this.#spScore = new TSpriteNumber(aSpcvs, aSPI.numberSmall, 10,10);
        this.#spScore.alpha = 0.6;
        this.#spPlayBtn.addEventListener("click", this.spPlayBtnClick.bind(this));
        this.#spCountDown.visible = false;
        this.#sfCountDown = null;
        this.#sfRunning = null;


    }

    points(aScore) {
        this.#spScore.value += aScore;
    }

    stopSound() {
        this.#sfRunning.stop();
    }

    draw() {
        this.#spTitle.draw();
        this.#spPlayBtn.draw();
        this.#spCountDown.draw();
        this.#spScore.draw();
    }

    countDown() {
        this.#spCountDown.value--;
        if (this.#spCountDown.value > 0) {
            setTimeout(this.countDown.bind(this), 1000);
        } else {
            this.#spCountDown.visible = false;
            startGame();
            this.#sfRunning = new TSoundFile(fnRunning);
            this.#sfRunning.play();
        }
    }

    spPlayBtnClick() {
        console.log("button clicked!");
        this.#spPlayBtn.hidden = true;
        this.#spTitle.hidden = true;
        this.#spCountDown.visible = true;
        this.#spCountDown.value = 3;
        this.#sfCountDown = new TSoundFile(fnCountDown);
        this.#sfCountDown.play();
        setTimeout(this.countDown.bind(this), 1000);
    }
}