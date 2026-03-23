"use strict";
import { computerAnswer } from "./Mastermind.mjs";
import { playerAnswer } from "./colorPicker.js";

export function checkAnswers() {
    const c = [];
    for(let i = 0; i < computerAnswer.length; i++) {
        c.push(computerAnswer[i]);
    }
    const p = [];
    for(let i = 0; i < playerAnswer.length; i++) {
        p.push(playerAnswer[i]);
    }
    //1. check if color "p" is correctly placed. 
    //2. check if color "p" is correct but placed wrong.
}