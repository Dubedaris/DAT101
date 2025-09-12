"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";


printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let task1wrong = 2 + 3 * 2 - 4 * 6;
printOut("2 + 3 * 2 - 4 * 6 =" + task1wrong);
let task1right = 2 + 3 *(2 - 4)* 6;
printOut("2 + 3 * (2 - 4) * 6 =" + task1right);
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let cm=1;
let inch=2.54*cm;
let task2=2534*cm/inch;
printOut("25m and 34cm in inches is: " + task2.toFixed(2));
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let minute = 1;
let second = 1/60
let hour = 60;
let day = 1440;
let task3= (3*day)+(12*hour)+(14*minute)+(45*second);
printOut("3 days, 12 hours, 14 minutes and 45 seconds in minutes is: " +task3 + " minutes.");
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let totalminutes=6322.52
let task4day= totalminutes/day;
let task4hour= (task4day-4)*24;
let task4minute= (task4hour-9)*60;
let task4second= (task4minute-22)*60;

printOut("6322.52 minutes in days, hours, minutes and seconds is approximately: "); 
printOut(Math.floor(task4day) + " days, "); 
printOut(Math.floor(task4hour) + " hours, " );
printOut(Math.floor(task4minute) + " minutes, and ");
printOut(task4second.toFixed(0) + " seconds.");
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let USD = 1;
let NOK = 76/8.6;
let bigbucks = 54*USD;
let storepenger = (54*USD)*NOK;

printOut(bigbucks + " in USD is equal to " + Math.floor(storepenger) + " in NOK.");
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let text = "There is much between heaven and earth that we do not understand.";
let length = text.length;
let char = text.charAt(19);
let part = text.substr(35, 8);
let index = text.indexOf("earth")
printOut( text + " In this text there are " + length + " characters.");
printOut("The character at the 19th position is: " + char);
printOut("The 35th character through the next 8 characters contains the following: \"" + part +"\"");
printOut("The index of where the word \"earth\" starts is: " + index);
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let ac=(5>3);
let bb=(7>=7)
let ab=("a">"b");
let onea=(1<"a");
let abcdless=(2500<"abcd");
let arnethomas=("arne"!="thomas");
let equals=((2===5)===true);
let abcdbcd=(("abcd">"bcd")===false);
printOut("Is 5 greater than 3? " + ac); 
printOut("Is 7 greater than or equal to 7? " + bb);
printOut("Is a greater than b? " + ab);
printOut("Is 1 less than a? " + onea);
printOut("Is 2500 less than abcd? " + abcdless);
printOut("Arne is not equal to Thomas. " + arnethomas)
printOut("2 equals 5. Is this statement true? " + equals)
printOut("Abcd is greater than bcd. Is this statement false? " + abcdbcd)
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let text1="254";
let text2="57.23";
let text3="25 kroner";
printOut("These numbers have been converted from strings:");
printOut(Number(text1));
printOut(Number(text2));
printOut(Number(text3));
printOut("The last string contained both a number as well as text, which cannot be converted to a number");
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let random = Math.floor(Math.random()*360)+1;
printOut("Here is a random number between 1 and 360: ");
printOut( +random);
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let modulusweek=131/7;
let modulusday=131%7;
printOut("131 days in weeks and days are:");
printOut(Math.floor(modulusweek) + " weeks, and");
printOut(modulusday + " days");
printOut(newLine);