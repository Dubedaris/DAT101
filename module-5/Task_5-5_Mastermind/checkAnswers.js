"use strict";
import { computerAnswer, menu } from "./Mastermind.mjs";
import { playerAnswer } from "./colorPicker.js";

//RELEVANT FOR FINAL EXAMS!! PRINT OUT AND BRING ALONG!!

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
    const correct = [];
    for(let i = 0; i < p.length; i++) {
        if(p[i].index === c[i].index) {
            correct.push(i); //We save the correct index
        }
    }
    //We need to remove the correct guesses from lists c and p
    for(let i = 0; i < correct.length; i++) {
        p[correct[i]] = null;
        c[correct[i]] = null;
    }

    //2. check if color "p" is correct but incorrectly placed.
    let incorrectCount = 0;
    for(let i = 0; i < p.length; i++) {
        const pColor = p[i];
        let incorrectIndex = -1;
        for(let j = 0; j < c.length; j++) {
            const cColor = c[j];
            if(pColor && cColor && (pColor.index === cColor.index)) { //this color exists, but is incorrectly placed
                incorrectCount++;
                incorrectIndex = j;
                break;
            }
        } // End of inner loop
        if(incorrectIndex >= 0) {
                c.splice(incorrectIndex, 1);
                i = 0;
            }
    }

    menu.createHints(correct.length, incorrectCount);

}