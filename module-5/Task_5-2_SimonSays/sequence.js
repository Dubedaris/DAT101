"use strict";
import { EGameStatusType, spawnButton, gameOver, updateRound } from "./SimonSays.mjs";

let colorButton = null;
let sequence = [];
let round = 0;
let seqIndex = 0;

export function resetSequence() {
    sequence = [];
    round = 0;
    seqIndex = 0;
}

export function addRandomButton(aColorButtons){
    const index = Math.floor(Math.random() * aColorButtons.length);
    colorButton = aColorButtons[index];
    sequence.push(colorButton);
    seqIndex = 0;
    colorButton = sequence[0];
    setTimeout(setButtonDown, 500); // this is the wait time before the sequence starts
}

export function checkUserInput(aColorButton) {
    if(aColorButton === colorButton) {
        console.log("correct!");
        seqIndex++;
        if(seqIndex < sequence.length) {
            //if we have not reached the end of the sequence
            colorButton = sequence[seqIndex];
        }else{
            //or else we have successfully reached the end of the sequence
            round++
            updateRound(round);
            spawnButton();
        }
    } else {
        gameOver();
    }
}

function setButtonDown() {
    colorButton.onMouseDown();
    setTimeout(setButtonUp, 500);
}

function setButtonUp() {
    colorButton.onMouseUp();
    seqIndex++;
    if(seqIndex < sequence.length) {
        colorButton = sequence[seqIndex];
        setTimeout(setButtonDown, 500);
    } else {
    EGameStatusType.state = EGameStatusType.Player;
    seqIndex = 0;
    colorButton = sequence[0];
    }
}

