"use strict";
import { spcvs, SpriteInfoList, newGame } from "./Mastermind.mjs";
import { TSprite, TSpriteButtonHaptic } from "libSprite";
import { checkAnswers } from "./checkAnswers.js";
import { MastermindBoard } from "./MastermindBoard.mjs";

let AHR = MastermindBoard.AnswerHint.Row1;

export class TMenu {
    #btnNewGame;
    #btnCheckAnswer;
    #btnCheat;
    #panelAnswer;
    #hints;

    constructor() {
        this.#btnNewGame = new TSpriteButtonHaptic(spcvs, SpriteInfoList.ButtonNewGame, 275, 5);
        this.#btnCheckAnswer = new TSpriteButtonHaptic(spcvs, SpriteInfoList.ButtonCheckAnswer, 275, 53)
        this.#btnCheat = new TSpriteButtonHaptic(spcvs, SpriteInfoList.ButtonCheat, 5, 45);
        this.#panelAnswer = new TSprite(spcvs, SpriteInfoList.PanelHideAnswer, 84, 45);
        this.#btnCheckAnswer.disabled = true;
        this.#btnCheat.onClick = this.#togglePanel.bind(this);
        this.#btnNewGame.onClick = this.#startNewGame.bind(this);
        this.#btnCheckAnswer.onClick = this.#checkAnswer.bind(this);
        this.#hints = [];

    }

    createHints(aCorrectAnswer, aIncorrectPlacement) {
        let hintIndex = 0;
        for (let i = 0; i < aCorrectAnswer; i++) {
            const pos = AHR[hintIndex];
            const blackPeg = new TSprite(spcvs, SpriteInfoList.ColorHint, pos.x, pos.y);
            blackPeg.index = 1;
            this.#hints.push(blackPeg);
            hintIndex++;
        }
        for(let i = 0; i < aIncorrectPlacement; i++) {
            const pos = AHR[hintIndex];
            const whitePeg = new TSprite(spcvs, SpriteInfoList.ColorHint, pos.x, pos.y);
            whitePeg.index = 0;
            this.#hints.push(whitePeg);
            hintIndex++;
        }
        
        
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
        for (let i = 0; i < this.#hints.length; i++) {
            const hintPeg = this.#hints[i];
            hintPeg.draw();
        }
    }

}


