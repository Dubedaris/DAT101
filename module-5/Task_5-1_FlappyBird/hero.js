"use strict";
import { TSprite } from "libSprite";
import { EGameStatus, menu } from "./FlappyBird.mjs";
import { TSineWave } from "lib2d";
import { TSoundFile } from "libSound";

const fnFood = "./Media/food.mp3";
const fnHeroIsDead = "./Media/heroIsDead.mp3";
const fnGameOver = "./Media/gameOver.mp3";

export class THero extends TSprite {
    #gravity;
    #speed;
    #wave;
    #sfFood;
    #sfCrash;
    #sfGameOver;
    constructor(aSpcvs, aSPI) {
        const heroX = aSPI.background.width / 3;
        const heroY = (aSPI.background.height - aSPI.ground.height) / 2;
        super(aSpcvs, aSPI.hero1, heroX, heroY - 60)
        this.animationSpeed = 10;
        this.#gravity = 9.81 / 100
        this.#speed = 0;
        this.#wave = new TSineWave(1, 1);
        this.#sfFood = null;
        this.#sfCrash = null;
        this.#sfGameOver = null;


    }

    eat() {
        if (this.#sfFood === null) {
            this.#sfFood = new TSoundFile(fnFood);
        } else {
            this.#sfFood.stop();
        }
        this.#sfFood.play();
    }

    animate() {

        if (EGameStatus.state === EGameStatus.running || EGameStatus.state === EGameStatus.heroIsDead) {
            if (this.y < 400 - this.height) {
                this.#speed += this.#gravity;
                this.y += this.#speed;
                if (this.rotation < 90) {
                    this.rotation = this.#speed * 15;
                }
            }
            else {
                EGameStatus.state = EGameStatus.gameOver;
                this.animationSpeed = 0;
                menu.stopSound();
                if (EGameStatus.state === EGameStatus.gameOver) {
                    this.#sfGameOver = new TSoundFile(fnGameOver);
                    this.#sfGameOver.play();
                }
            }
        } else if (EGameStatus.state === EGameStatus.idle) {
            this.y += this.#wave.value;
        }
        if (EGameStatus.state === EGameStatus.heroIsDead) {
            menu.stopSound();
            if (this.#sfCrash === null) {
                this.#sfCrash = new TSoundFile(fnHeroIsDead);
            }
            this.#sfCrash.play();
        }
    }

    flap() {
        this.#speed = -3;
        this.rotation = 0;
    }
}