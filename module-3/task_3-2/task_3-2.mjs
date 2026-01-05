"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let text1 = "";
let text2 = "";
for (let i = 1; i <= 10; i++) {
    text1 += " " + i.toString();
}
for (let j = 10; j > 0; j--) {
    text2 += " " + j.toString();
}
printOut(text1);
printOut(text2);
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let answer = 32;
let guess = Math.floor(Math.random() * 60) + 1;
while (guess !== answer) {
    guess = Math.floor(Math.random() * 60) + 1;
}
printOut("Guess the correct number between 1 and 60!")
printOut(guess);
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let bigGuess = Math.ceil(Math.random() * 1000000);
let attempts = 0;
const timeStart = Date.now()
while (bigGuess !== answer) {
    bigGuess = Math.ceil(Math.random() * 1000000);
    attempts += 1;
}
printOut("Guess the correct number between 1 and 1000000!");
printOut(bigGuess);
printOut("It took " + attempts + " attempts to guess correctly.");
printOut("It took " + (Date.now() - timeStart) + " milliseconds to guess.");
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
// I don't understand how it works
let primes = "";
for (let p = 2; p < 200; p++) {
    let t = p - 1;
    let isPrime = true;
    while (t > 1 && isPrime) {
        let rest = p % t;
        isPrime = rest != 0;
        t--;
    }
    if (isPrime) {
        primes += " " + p;
    }
}
printOut("Here are all the prime numbers between 1 and 200:")
printOut(primes);
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let rowColumn = "";
for (let row = 1; row <= 7; row++) {
    for (let col = 1; col <= 9; col++) {
        rowColumn += "K" + col.toString();
        rowColumn += "R" + row.toString() + "&nbsp;&nbsp;&nbsp;";
    }
    rowColumn += newLine
}

printOut(rowColumn);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

function grade(aStudent) {
    if (aStudent >= 89) {
        return aStudent += "% - A"
    } else if (aStudent >= 77) {
        return aStudent += "% - B"
    } else if (aStudent >= 65) {
        return aStudent += "% - C"
    } else if (aStudent >= 53) {
        return aStudent += "% - D"
    } else if (aStudent >= 41) {
        return aStudent += "% - E"
    } else (aStudent >= 0); {
        return aStudent += "% - F"
    }
}

let studentA = Math.floor((Math.floor(Math.random() * 236) + 1) / 2.36);
let studentB = Math.floor((Math.floor(Math.random() * 236) + 1) / 2.36);
let studentC = Math.floor((Math.floor(Math.random() * 236) + 1) / 2.36);
let studentD = Math.floor((Math.floor(Math.random() * 236) + 1) / 2.36);
let studentE = Math.floor((Math.floor(Math.random() * 236) + 1) / 2.36);

printOut("Here are the students' grades: ")
printOut(grade(studentA));
printOut(grade(studentB));
printOut(grade(studentC));
printOut(grade(studentD));
printOut(grade(studentE));
printOut(newLine)

let first = studentA;
let second = studentB;
let third = studentC;
let fourth = studentD;
let fifth = studentE;


for (let i=0; i < 5; i++) {
    let temp; 
    if (first <= second) {
        temp = first
        first = second
        second = temp
    } if (second <= third) {
        temp = second
        second = third
        third = temp
    } if (third <= fourth) {
        temp = third
        third = fourth
        fourth = temp
    } if (fourth <= fifth) {
        temp = fourth
        fourth = fifth
        fifth = temp
    }
}
printOut("Here the same grades have been sorted in a descending order:")
printOut(grade(first) + newLine + grade(second) + newLine + grade(third) + newLine + grade(fourth) + newLine + grade(fifth))

printOut(newLine)


printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
/*Simulate 6 dice and print how many "throws" it takes to get:
● 1 2 3 4 5 6 (full straight)
● 3 pairs
● 2 of a kind and 4 of a kind (tower)
● All the same (Yahtzee)*/

let d1 = Math.ceil(Math.random() * 6);
let d2 = Math.ceil(Math.random() * 6);
let d3 = Math.ceil(Math.random() * 6);
let d4 = Math.ceil(Math.random() * 6);
let d5 = Math.ceil(Math.random() * 6);
let d6 = Math.ceil(Math.random() * 6);
const dice = [d1, d2, d3, d4, d5, d6];

function countOccurrence (aDie, aTargetNumber) {

}


let fullStraight = [];
let threePairs = [];
let tower = [];
let yahtzee = [];

let throwsFullStraight = 0;
let throwsThreePairs = 0;
let throwsTower = 0;
let throwsYahtzee = 0;

//It might be easier to do with string, because there are functions that can help you count instances of each value.
//It can be done with arrays as well, but there might be more work with loops and such. 
//   `${dice.sort()}`
// Can i compare the array dice to the result i want? e.g. keep a loop running while dice !== threePairs
// Can i use string.match to find how many times a value appears?
// Do I use "" on the numbers in the array, or just use array.toLength or other methods?
// Do i throw dice and push the numbers I want into the relevant arrays?
// while loop with if statement?
// Should i make functions for every result i want?


printOut("test");



printOut(newLine);
