"use strict";
import { TSprite } from "libSprite";
import { EGameStatus } from "./FlappyBird.mjs";
import { TSineWave } from "lib2d";


export class TBait extends TSprite{
    #speed;
    #wave;


    constructor(aSpcvs, aSPI) {
        super(aSpcvs, aSPI, 600, 100);
        const amp = Math.ceil(Math.random() * 3);
        this.#wave = new TSineWave(amp, 1);
        this.#speed = Math.ceil(Math.random() * 13) /10;
        this.y = this.#wave.value;
        this.animationSpeed = this.#speed * 75;
    }
    
    animate() {
        if(EGameStatus.state === EGameStatus.running) {
            this.translate(-this.#speed, this.#wave.value);
        } else {
            this.translate(this.#speed, this.#wave.value);
        }
    }  

    distanceTo(aPoint) {
        const dx = Math.pow(this.center.x - aPoint.x, 2);
        const dy = Math.pow(this.center.y - aPoint.y, 2);
        return Math.sqrt(dx + dy);
    }
}
