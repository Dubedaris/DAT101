"use strict";
import { TSprite } from "libSprite";
import { rbDayNight, setDayNight } from "./FlappyBird.mjs";

export class TBackground {
    #spriteBackground;
    #spriteGround;

    constructor(aSpcvs, aSPI) {
        this.#spriteBackground = new TSprite(aSpcvs, aSPI.background, 0, 0)
        this.#spriteBackground.index = 0;
        const groundPosition = aSPI.background.height - aSPI.ground.height;
        this.#spriteGround = new TSprite(aSpcvs, aSPI.ground, 0, groundPosition)
    }

    drawBackground() {
        if(setDayNight(rbDayNight)) {
            this.#spriteBackground.index = 0;
        } else {
            this.#spriteBackground.index = 1;
        }
        console.log(setDayNight(rbDayNight));
        this.#spriteBackground.draw();  
    }

    drawGround() {
        this.#spriteGround.draw();
    }

    animate() {
        const x = this.#spriteGround.x + (this.#spriteGround.width / 2);
        if (x < 5) {
            this.#spriteGround.x = 0;
        } else {
            this.#spriteGround.x--;
        }
    }
}