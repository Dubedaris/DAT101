"use strict";
import { TSpriteButton } from "libSprite";
import { TPoint } from "lib2d";
import { EOctave, ENoteName, TSoundWave } from "libSound";
import { checkUserInput } from "./sequence.js";
import { EGameStatusType } from "./SimonSays.mjs";

export class TColorButton extends TSpriteButton {
    #dst;
    #gameBoardCenter;
    #sound;

    constructor(aSpcvs, aSPI, aGameBoardCenter) {
        super(aSpcvs, aSPI, aSPI.dst.x, aSPI.dst.y);
        this.#dst = aSPI.dst;
        this.#gameBoardCenter = aGameBoardCenter;
        this.#sound = null;
    }

    isMouseOver(aMousePos) {
        const isOver = super.isMouseOver(aMousePos);
        if(isOver) {
            const dx = this.#gameBoardCenter.x - aMousePos.x;
            const dy = this.#gameBoardCenter.y - aMousePos.y;
            const hyp = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            let inside = hyp > this.#dst.r1 && hyp < this.#dst.r2;
            if(inside) {
                return true;
            } else {
                return false;
            }
        }
    }

    onMouseDown() {
        // No need to call super
        this.index = 1;
        if(this.#sound) {
            this.#sound.play();
        }
    }

    onMouseUp() {
        this.index = 0;
        if(this.#sound) {
            this.#sound.stop();
        }
        if(EGameStatusType.state === EGameStatusType.Player) {
        checkUserInput(this);
        }
    }

    createSound(aIndex) {
        let note = ENoteName.C;

        switch(aIndex) {
        case 1:
            note = ENoteName.Eb
            break
        case 2:
            note = ENoteName.G
            break
        case 3:
            note = ENoteName.Bb
            break}

        this.#sound = new TSoundWave(EOctave.Octave5, note);
        
    }
}