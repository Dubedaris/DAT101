"use strict";
import { TSprite, TSpriteButton, TSpriteNumber } from "libSprite";
import { EGameStatus, startGame, soundMuted, hero, obstacleTable, baitTable } from "./FlappyBird.mjs";
import { TSoundFile } from "libSound";

const fnCountDown = "./Media/countDown.mp3";
const fnRunning = "./Media/running.mp3";
let finalScore = 0;
const highScoreTable = [];

export class TMenu {
    #spTitle;
    #spPlayBtn;
    #spCountDown;
    #sfCountDown;
    #sfRunning;
    #spScore;
    #spGameOver;
    #spInfoText;
    #spMedal;
    #spFinalScore;
    #spHighScore;
    #spRestart;

    constructor(aSpcvs, aSPI) {
        this.#spTitle = new TSprite(aSpcvs, aSPI.flappyBird, aSPI.background.width / 2 - (aSPI.flappyBird.width / 2), 100);
        this.#spPlayBtn = new TSpriteButton(aSpcvs, aSPI.buttonPlay, aSPI.background.width / 2 - (aSPI.buttonPlay.width / 2), 200);
        this.#spPlayBtn.addEventListener("click", this.spPlayBtnClick.bind(this));
        this.#spRestart = new TSpriteButton(aSpcvs, aSPI.buttonPlay, aSPI.background.width / 2 - (aSPI.buttonPlay.width / 2), 200);
        this.#spRestart.visible = false;
        this.#spRestart.addEventListener("click", this.spRestartClick.bind(this));
        this.#spCountDown = new TSpriteNumber(aSpcvs, aSPI.numberBig, aSPI.background.width / 2 - (aSPI.numberBig.width / 2), 200);
        this.#spCountDown.visible = false;
        this.#spScore = new TSpriteNumber(aSpcvs, aSPI.numberSmall, 10, 10, undefined, 0);
        this.#spScore.alpha = 0.6;
        this.#spGameOver = new TSprite(aSpcvs, aSPI.gameOver, aSPI.background.width / 2 - (aSPI.gameOver.width / 2), 86);
        this.#spGameOver.visible = false;
        this.#spInfoText = new TSprite(aSpcvs, aSPI.infoText, aSPI.background.width / 2 - (aSPI.infoText.width / 2), 200);
        this.#spInfoText.visible = false;
        this.#spMedal = new TSprite(aSpcvs, aSPI.medal, 201, 129);
        this.#spMedal.visible = false;
        this.#spFinalScore = new TSpriteNumber(aSpcvs, aSPI.numberSmall, 350, 119, undefined, 0);
        this.#spFinalScore.visible = false;
        this.#spHighScore = new TSpriteNumber(aSpcvs, aSPI.numberSmall, 350, 161, undefined, 0);
        this.#spHighScore.visible = false;
        this.#sfCountDown = null;
        this.#sfRunning = new TSoundFile(fnRunning);
        


    }

    spRestartClick() {
        console.log("Restart clicked!");
        EGameStatus.state = EGameStatus.countDown;
        obstacleTable.splice(0, obstacleTable.length);
        baitTable.splice(0, baitTable.length);
        finalScore = 0;
        this.#spFinalScore.value = 0;
        this.#spScore.value = 0;
        this.#spScore.visible = true;
        this.#spRestart.visible = false;
        this.#spMedal.visible = false;
        this.#spFinalScore.visible = false;
        this.#spHighScore.visible = false;
        this.#spGameOver.visible = false;
        this.#spInfoText.visible = true;
        this.#spCountDown.value = 6;
        setTimeout(this.countDown.bind(this), 1000);
        hero.restart();
    }

    showGameOver() {
        console.log()
        finalScore = this.#spFinalScore.value += this.#spScore.value;
        highScoreTable.push(finalScore);
        highScoreTable.sort((a, b) => b - a);

        if (finalScore >= highScoreTable[0]) {
            this.#spMedal.index = 2;
            this.#spHighScore.value = finalScore;
            console.log("high score" + this.#spHighScore.value)
            console.log(highScoreTable)

        } else if (finalScore < highScoreTable[0] && finalScore >= highScoreTable[1]) {
            this.#spMedal.index = 1;
        } else if (finalScore < highScoreTable[1] && finalScore >= highScoreTable[2]) {
            this.#spMedal.index = 3;
        } else {
            this.#spMedal.index = 0;
        }

        this.#spScore.visible = false;
        this.#spGameOver.visible = true;
        this.#spMedal.visible = true;
        this.#spFinalScore.visible = true;
        this.#spHighScore.visible = true;
        this.#spRestart.visible = true;
    }

    stopSound() {
        this.#sfRunning.stop();
    }

    points(aScore) {
        this.#spScore.value += aScore;
        console.log("gaming points " + aScore)
    }

    draw() {
        this.#spTitle.draw();
        this.#spPlayBtn.draw();
        if (EGameStatus.state === EGameStatus.countDown) {
            this.#spCountDown.draw();
            this.#spInfoText.draw();
        }
        if (EGameStatus.state === EGameStatus.gameOver) {
            this.#spGameOver.draw();
            this.#spMedal.draw();
            this.#spFinalScore.draw();
            this.#spHighScore.draw();
            this.#spRestart.draw();
        }
        if (EGameStatus.state === EGameStatus.running) {
            this.#spScore.draw();
        }
    }

    countDown() {
        if (this.#spCountDown.value < 5) {
            this.#spCountDown.visible = true;
            this.#spInfoText.visible = false;
        }
        if (this.#spCountDown.value > 0) {
            setTimeout(this.countDown.bind(this), 1000);
            this.#spCountDown.value--;
            if (this.#spCountDown.value <= 3 && !soundMuted) {
                this.#sfCountDown.play();
            }
        } else {
            this.#spCountDown.visible = false;
            startGame();
            this.setMuteSound(soundMuted);
            /*if (!soundMuted && EGameStatus.state === EGameStatus.running) {
                this.#sfRunning.play();
            } else {
                this.#sfRunning.stop();
            }*/
        }
    }

    spPlayBtnClick() {
        console.log("button clicked!");
        EGameStatus.state = EGameStatus.countDown;
        this.setMuteSound(soundMuted);
        this.#spPlayBtn.hidden = true;
        this.#spTitle.hidden = true;
        this.#spInfoText.visible = true;
        this.#sfCountDown = new TSoundFile(fnCountDown);
        this.#spCountDown.value = 6;
        setTimeout(this.countDown.bind(this), 1000);
    }

    //Need a method to toggle sound on and off!
    setMuteSound(aIsMuted) {
        if (aIsMuted) {
            this.#sfRunning.stop();
        } else if (!aIsMuted && EGameStatus.state === EGameStatus.running) {
            this.#sfRunning.play();
        }
    }
}