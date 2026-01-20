"use strict";
import { TSprite } from "libSprite";
import { EGameStatus } from "./FlappyBird.mjs";
import { TSineWave } from "lib2d";

export class THero extends TSprite{
    #gravity;
    #speed;
    #wave;
    constructor(aSpcvs, aSPI) {
        const heroX = aSPI.background.width/3;
        const heroY = (aSPI.background.height-aSPI.ground.height)/2;
        super(aSpcvs, aSPI.hero1, heroX, heroY-60)
        this.animationSpeed = 10;
        this.#gravity = 9.81 / 100
        this.#speed = 0;
        this.#wave = new TSineWave(1,1);
        

    }

    animate(){
        
        if(EGameStatus.state === EGameStatus.running || EGameStatus.state === EGameStatus.heroIsDead) {
            if(this.y < 400 - this.height){
                this.#speed += this.#gravity;
                this.y += this.#speed;
                if(this.rotation < 90) {
                    this.rotation = this.#speed*15;
                }
            }
            else {
                EGameStatus.state = EGameStatus.gameOver;
                this.animationSpeed = 0;
                }
        } else if(EGameStatus.state === EGameStatus.idle) {
            this.y += this.#wave.value;
        }
    }

    flap () {
        this.#speed = -3;
        this.rotation = 0;
    }
}