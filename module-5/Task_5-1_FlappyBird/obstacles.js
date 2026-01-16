"use strict";
import { TSprite } from "libSprite";

const easyFlyerGap = 450;
const hardFlyerGap = 300;
const minimumProtrusion = 30;



export class TObstacles {
    #spObsTop;
    #spObsBottom;
    #spi;

    constructor (aSpcvs, aSPI) {
        
        this.#spi = aSPI;
        this.#spObsBottom = new TSprite (aSpcvs, aSPI.obstacle, aSPI.background.width, 350)
        this.#spObsBottom.index = 2;
        this.#spObsTop = new TSprite (aSpcvs, aSPI.obstacle, aSPI.background.width, -100)
        this.#spObsTop.index = 3;
    }

    //Properties
    get x () {
        return this.#spObsBottom.x;
    }

    draw() {
        this.#spObsBottom.draw();
        this.#spObsTop.draw();
    }

    animate () {
        this.#spObsBottom.x--;
        this.#spObsTop.x--;

        const rndmY = Math.ceil(Math.random() * (350-150) + 150)

        /*if(this.#spObsBottom.x < 0-this.#spObsBottom.width) {
            this.#spObsBottom.x = this.#spi.background.width;
            this.#spObsTop.x = this.#spi.background.width;
            this.#spObsBottom.y = rndmY;
            this.#spObsTop.y = this.#spObsBottom.y-450;
        }*/

        
    }
}