"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

printOut("--- Part 1, 2, 3 ----------------------------------------------------------------------------------------");
/* Put your code below here!*/
let wakeUpTime = 7;
printOut("I woke up at " + wakeUpTime + " today.");
if (wakeUpTime==7) {
  printOut("I can catch the bus to school");
  } else if(wakeUpTime==8) {
  printOut("I can take the train");
} else {
  printOut("I'll have to drive");
}
printOut(newLine);

printOut("--- Part 4, 5 --------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let integer=32 ;
printOut("The integer is: " + integer);
if (integer<0){
  printOut("Negative");
} else if (integer==0) {
  printOut("Zero");
} else {
  printOut("Positive");
}
printOut(newLine);

printOut("--- Part 6, 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let mp = Math.floor(Math.random() *8) +1;
printOut("Size of file in MP: " + mp);
if (mp>=6) {
  printOut("The image is too large");
} else if (mp<=3) {
  printOut("The image is too small");
}else {
  printOut("Thank You");
}
printOut(newLine);

printOut("--- Part 8, 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const monthList=["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];
const noOfMonth=monthList.length;
const monthName=monthList[Math.floor(Math.random () * noOfMonth)];
let days;
switch(monthName) {
  case "January": 
  case "March": 
  case "May":
  case "July":
  case "August":
  case "October":
  case "December":
    days = "31"
    break
  case "February":
    days = "28"
    break
  case "April":
  case "June":
  case "September":
  case "November":
    days = "30";
}

printOut( "What month is it? " + monthName + ". This month has " + days + " days.");
if (monthName.includes("r")) {
  printOut("You must take vitamin D");
} else {
  printOut("You do not need to take vitamin D");
}
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
if (monthName==="March" || monthName==="April" || monthName==="May") {
  printOut("The art gallery is closed")
  if(monthName==="April") {
    printOut(", however for the month of April it is available in a separate building")
  } 
} else {
  printOut("The art gallery is open")
}
printOut(newLine);
