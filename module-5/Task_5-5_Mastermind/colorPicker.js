"use strict";
import { TSpriteDraggable, TSnapTo } from "libSprite";
import { spcvs, SpriteInfoList, colors, menu } from "./Mastermind.mjs";
import { MastermindBoard } from "./MastermindBoard.mjs";
import { TPoint } from "lib2d";

let PAR = MastermindBoard.PlayerAnswer.Row1;
export let playerAnswer = [null, null, null, null];

class TSnapping extends TSnapTo {

    constructor() {
        super(PAR, 10);
    }
}

export class TColorPicker extends TSpriteDraggable {

    constructor(aPos) {
        super(spcvs, SpriteInfoList.ColorPicker, aPos.x, aPos.y);
        this.snapTo = new TSnapping();
        this.initPos = new TPoint(aPos.x, aPos.y);

    }

    onDrop(aPos) {
        const dupe = this.duplicate();
        colors.push(dupe);
        for(let i = 0; i < PAR.length; i++) {
            const pos = PAR[i];
            if((aPos.x === pos.x) && (aPos.y === pos.y)) {
                playerAnswer[i] = this;
            }
        }
        let count = 0
        for(let i = 0; i < playerAnswer.length; i++) {
            if(playerAnswer[i] !== null) {
                count++
            }
        }
        if(count >= 4) {
            menu.enableCheckAnswer();
        }
        /*if(this.canDrop() === false) {
            colors.pop();
        }*/
    }

    duplicate() {
        const dupe = new TColorPicker(this.initPos);
        dupe.index = this.index;
        return dupe;
    }

    canDrop(aPos) {
        for (let i = 0; i < PAR.length; i++) {
            const pos = PAR[i];
            if ((pos.x === aPos.x) && (pos.y === aPos.y)) {
                return true;
            }
        }
        return false;
    }

    onStartDrag() {
        const index = colors.indexOf(this);
        colors.splice(index, 1);
        colors.push(this);
    }

}

