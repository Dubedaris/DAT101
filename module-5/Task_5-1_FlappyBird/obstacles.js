"use strict";
import { TSprite } from "libSprite";
import { hero, EGameStatus } from "./FlappyBird.mjs";

const easyFlyerGap = 150;
const hardFlyerGap = 100;
const minimumProtrusion = 30;



export class TObstacles {
    #spObsTop;
    #spObsBottom;
    #spi;

    constructor (aSpcvs, aSPI) {
        const x = 600;
        this.#spi = aSPI;

        const gap = Math.ceil(Math.random() * (easyFlyerGap-hardFlyerGap) + hardFlyerGap);
        const minTop = -this.#spi.obstacle.height + minimumProtrusion;
        const maxTop = -minimumProtrusion;
        let top = Math.ceil(Math.random() * (maxTop-minTop) + minTop);
        const minBottom = 400-minimumProtrusion;
        let topWithGap = this.#spi.obstacle.height + top + gap;
        if(topWithGap > minBottom) {
            const adjustment = topWithGap - minBottom;
            top -= adjustment;
            topWithGap = this.#spi.obstacle.height + top + gap;
        }


        this.#spObsBottom = new TSprite (aSpcvs, aSPI.obstacle, x, topWithGap)
        this.#spObsBottom.index = 2;
        this.#spObsTop = new TSprite (aSpcvs, aSPI.obstacle, x, top)
        this.#spObsTop.index = 3;
    }

    //Properties
    get x () {
        return this.#spObsBottom.x;
    }

    get width() {
        return this.#spObsBottom.width;
    }

    draw() {
        this.#spObsBottom.draw();
        this.#spObsTop.draw();
    }

    animate () {
        this.#spObsBottom.x--;
        this.#spObsTop.x--;
        let hasCollided = hero.hasCollided(this.#spObsBottom) || hero.hasCollided(this.#spObsTop)

        if(hasCollided) {
            console.log("Hero has collided");
            EGameStatus.state = EGameStatus.heroIsDead;
            hero.animationSpeed = 0;
            hero.flap();
        } 
    }
}
