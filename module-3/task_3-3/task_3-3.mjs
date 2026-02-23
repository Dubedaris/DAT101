"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");

const dd = new Date()
const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
function dato() {
    return dd.toLocaleDateString("no-NB", options)
}
printOut("Dagens dato: " + dato());
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");

const releaseDate = new Date(2026, 4, 14)
const milliDag = 8.64e+7
function countDown(aReleaseDate, aToday) {
    return (aReleaseDate-aToday)/milliDag
}
printOut("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
printOut("2XKO");
printOut("only " + Math.floor(countDown(releaseDate, dd)));
printOut("days until release!!!");
printOut("Pre-order the EPIC EDITION now and get 5% off" + newLine + "of your third purchase in our in-game store");
printOut("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");

let radiusValue = 5;
function radius (aRadius) {
    return "If the radius is: " + radiusValue +
    newLine +
    "the diameter will be: " + aRadius*2 + 
    newLine + 
    "the circumference will be: " + (aRadius*2*Math.PI).toFixed(2) + 
    newLine + 
    "and the area will be: " + (Math.PI*aRadius*aRadius).toFixed(2)
}
printOut(radius(radiusValue));
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");

let width = 5;
let height = 6;
function rectangle (aWidth, aHeight) {
    return "If the width is: " + aWidth + 
    newLine + 
    "and the height is: " + aHeight + 
    newLine + 
    "the circumference will be: " + (2*aWidth+2*aHeight) +
    newLine +
    "and the area will be: " + aWidth*aHeight
}
printOut(rectangle(width, height));
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");

let Celsius = "Celsius";
let Kelvin = "Kelvin" ;
let Fahrenheit = "Fahrenheit";

function conversion (aDegrees, aTempType) {
    switch (aTempType) {
        case Celsius:
            let CtoK = Math.round(aDegrees + 273.15)
            let CtoF = Math.round(aDegrees*(9/5)+32)
            printOut(aDegrees + " degrees in Celsius equals approximately " + CtoK + " in Kelvin, and " + CtoF + " in Fahrenheit.")
            break
        case Kelvin:
            let KtoC = Math.round(aDegrees - 273.15)
            let KtoF = Math.round((aDegrees - 273.25)*(9/5)+32)
            printOut(aDegrees + " degrees in Kelvin equals approximately " + KtoC + " in Celsius, and " + KtoF + " in Fahrenheit.") 
            break
        case Fahrenheit:
            let FtoC = Math.round((aDegrees-32)*(5/9))
            let FtoK = Math.round((aDegrees-32)*(5/9)+273.15)
            printOut(aDegrees + " degrees in Fahrenheit equals approximately " + FtoC + " in Celsius, and " + FtoK + " in Kelvin.")
            break
    }
}


conversion(25, Celsius);
conversion(0, Kelvin);
conversion(100, Fahrenheit);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");

function noVAT(aGrossAmount, aTaxGroup) {
    let VAT ;
    const taxGroup = aTaxGroup.toLowerCase();
   switch (taxGroup) {
    case "normal":
        VAT = 1.25
        printOut("Price:  " + aGrossAmount + newLine +
            "Tax group:  " + aTaxGroup + newLine +
            "Price without VAT: " + (aGrossAmount/VAT).toFixed(2) + newLine)
        break;
    case "food":
        VAT = 1.15
        printOut("Price:  " + aGrossAmount + newLine +
            "Tax group:  " + aTaxGroup + newLine +
            "Price without VAT: " + (aGrossAmount/VAT).toFixed(2) + newLine)
        break;
    case "hotel":
    case "transport":
    case "cinema":
        VAT = 1.1
        printOut("Price:  " + aGrossAmount + newLine +
            "Tax group:  " + aTaxGroup + newLine +
            "Price without VAT: " + (aGrossAmount/VAT).toFixed(2) + newLine)
        break;
    default:
        printOut("Price:  " + aGrossAmount + newLine +
            "Tax group:  " + aTaxGroup + newLine +
            "Unknown VAT group!" + newLine)
        break;
   } 
}
noVAT(399, "normal");
noVAT(250, "Food");
noVAT(120, "cineMA");
noVAT(8008135, "goblins");
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Create a function that takes 3 arguments and returns the following calculation:
● Speed = Distance / Time
If speed is missing, calculate speed. If time is missing, calculate time. If distance is missing, calculate the
distance. If more than one parameter is missing, return NaN*/

function Missing(aSpeed, aDistance, aTime) {
    if(aSpeed === null) {
        if(aDistance === null) {
            return NaN;
        } else if(aTime === null) {
            return NaN;
        } else {
        aSpeed = (aDistance/aTime)
            printOut("When the distance is " + aDistance + " and the time is " + aTime)
            printOut("the speed in meters per second is: " + aSpeed) 
        }
    } else if(aDistance === null) {
        if(aSpeed === null) {
            return NaN;
        } else if(aTime === null) {
            return NaN;
        } else {
        aDistance = (aSpeed*aTime)
            printOut("When the speed is " + aSpeed + " and the time is " + aTime)
            printOut("the distance in meters is: " + aDistance)
        }
    } else if(aTime === null) {
        if(aSpeed === null) {
            return NaN;
        } else if(aDistance === null) {
            return NaN;
        } else {
        aTime = (aDistance/aSpeed)
            printOut("When the distance is " + aDistance + " and the speed is " + aSpeed)
            printOut("the time in seconds is: " + aTime)
        }
    }
 
}

Missing(null,100,5);
printOut(newLine);
Missing(30,null,10);
printOut(newLine);
Missing(25,50,null);
printOut(newLine);
if(isNaN(Missing(null,300,null))) {
    printOut("Cannot calculate when missing two or more parameters");
}
printOut(newLine);


printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Create a function that takes four parameters and returns a result. Parameter one: A text string. Parameter
two: Value for the maximum size of the text string. Parameter three: Text character. Parameter four:
Consecutive insertion of characters (boolean value). Take the text parameter; if it's smaller than the
maximum, make it larger with the specified character, either before or after, using the given boolean value.
Have the function return the new string and print it out*/ 
function TextFunction(aString, aMaxValue, aCharacter, aBoolean) {
    while (aString.length < aMaxValue) {
    if (aBoolean === true) {
        aString += aCharacter;
    } else {
        aString = aCharacter + aString;
    }
    } 
        printOut(aString);
    
}
TextFunction("Yeah boi", 20, "i", true);
TextFunction("AH!", 10, "A", false);
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* From mathematics, we have the following expression:
1 + 2 = 3
4 + 5 + 6 = 7 + 8
9 + 10 + 11 + 12 = 13 + 14 + 15
16 + 17 + 18 + 19 + 20 = 21 + 22 + 23 + 24
25 + 26 + 27 + 28 + 29 + 30 = 31 + 32 + 33 + 34 + 35
Create a function or functions that can test this expression for 200 lines. If the test fails, print out where the
two sides are not equal and stop the loop. If all 200 lines are OK, print "Maths fun!".*/

//Denne klarte jeg ikke før fristen! Kan hende jeg får det til hvis jeg prøver mer på egen hånd. 
function Part9TestMathExpression(aLines) {
  let currentNumber = 1;
  for (let line = 1; line <= aLines; line++) {
    let leftSum = 0;
    let rightSum = 0;
    // Calculate left side, one more number than right side
    for (let i = 0; i < line + 1; i++) {
      leftSum += currentNumber++;
    }
    // Calculate right side
    for (let i = 0; i < line; i++) {
      rightSum += currentNumber++;
    }
    if (leftSum !== rightSum) {
      printOut(`Test failed at line ${line}: Left sum (${leftSum}) != Right sum (${rightSum})`);
      return;
    }
  }
  printOut("Maths fun!");
}


printOut(Part9TestMathExpression(200));
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Recursive function. Create a function that calculates the factorial of a given number. Factorial of 5 = 5 * 4 *
3 * 2 * 1. Factorial of 6 = 6 * 5 * 4 * 3 * 2 * 1. Etc.
Have the function call itself to calculate the result and print the final answer.*/

function recursive (aNumber) {
    if(aNumber <= 0) {
        return 1;
    } else {
        const result = aNumber * recursive(aNumber-1);
        return result;
    }
}

const factorialNumber = Math.ceil(Math.random() * 9);
const factorialResult = recursive(factorialNumber)
recursive(factorialNumber);
printOut(`The factorial of ${factorialNumber} = ${factorialResult}`);
printOut(newLine);
