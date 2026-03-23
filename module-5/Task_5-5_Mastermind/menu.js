"use strict";
import { spcvs, SpriteInfoList, newGame } from "./Mastermind.mjs";
import { TSprite, TSpriteButtonHaptic } from "libSprite";
import { checkAnswers } from "./checkAnswers.js";

/*
1. make background
2. make all menu elements
3. make two draw functions: draw and drawBackground */

export class TMenu {
    #btnNewGame;
    #btnCheckAnswer;
    #btnCheat;
    #panelAnswer;
    
    constructor() {
        this.#btnNewGame = new TSpriteButtonHaptic(spcvs, SpriteInfoList.ButtonNewGame, 275, 5);
        this.#btnCheckAnswer = new TSpriteButtonHaptic(spcvs, SpriteInfoList.ButtonCheckAnswer, 275, 53)
        this.#btnCheat = new TSpriteButtonHaptic(spcvs, SpriteInfoList.ButtonCheat, 5, 45);
        this.#panelAnswer = new TSprite(spcvs, SpriteInfoList.PanelHideAnswer, 84, 45);

        this.#btnCheckAnswer.disabled = true;
        this.#btnCheat.onClick = this.#togglePanel.bind(this);
        this.#btnNewGame.onClick = this.#startNewGame.bind(this);
        this.#btnCheckAnswer.onClick = this.#checkAnswer.bind(this);

    }

    #checkAnswer() {
        checkAnswers();
    }

    enableCheckAnswer() {
        this.#btnCheckAnswer.disabled = false;
    }

    #startNewGame() {
        newGame();
        console.log("New game started!")
    }


    #togglePanel() {
        this.#panelAnswer.hidden = !this.#panelAnswer.hidden;
    }

    
    draw() {
        this.#btnNewGame.draw();
        this.#btnCheckAnswer.draw();
        this.#btnCheat.draw();
        this.#panelAnswer.draw();   
    }
    
}


