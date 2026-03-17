"use strict";
import { TSpriteDraggable } from "libSprite";
import { spcvs, SpriteInfoList, colors } from "./Mastermind.mjs";
import { MastermindBoard } from "./MastermindBoard.mjs";


export class TColorPicker extends TSpriteDraggable{

    constructor(aPos) {
        super(spcvs, SpriteInfoList.ColorPicker, aPos.x, aPos.y);

    }

    

    onStartDrag() {
        const index = colors.indexOf(this);
        colors.splice(index, 1);
        colors.push(this);
    }

}

