"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Create an array where you hard-code all the numbers from 1 to 20. Use a for loop to "run through" the
array and print all the elements in the array.
○ Hint: Look at the learning outcomes to find the solutions to the task.

Put your code below here!*/
const hardCodedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

for (let i = 0; i < hardCodedArray.length; i++) {
    printOut(i);
}

printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Take the array from task 1 and use a built-in method found in the array object to print all the elements with
a custom defined character separating all the elements.
○ Hint: You should be able to do it with just one line of code 😃

Put your code below here!*/
printOut(hardCodedArray.join("😃"));
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Create a constant that contains the text "Hei på deg, hvordan har du det?" (Hello there, how are you?)
Take this text and convert it into an array that contains all the words in the text, i.e., each element should
contain only one word from the text. Use a loop to traverse (run through) this array so that you can print
which word number, which index the word is at, and the word itself.

Put your code below here!*/

let textPart3 = "Hei på deg, hvordan har du det?";

const textConverted = textPart3.split(" ");

for (let i = 0; i < textConverted.length; i++) {
    printOut("length: " + textConverted[i].length + ", index: " + i + ", word: " + textConverted[i].toString());
}
//jeg skjønte ikke dette helt! skulle jeg ha index+1 for å finne word number? Jeg fikk det ikke til, får bare length
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Create an array with these names: "Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid",
"Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth" and "Kristin".
Then create a function that will remove an element from an array. Let the function have two parameters.
Parameter number one is the array from which you will remove the element, parameter two is the text that
should be removed from the array. Check if the element exists in the array so that you can inform whether
the element exists or not in the array.

Put your code below here!*/

let girlsArray = ["Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid",
    "Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth", "Kristin"]

function removeName(aArray, aName) {
    const index = aArray.indexOf(aName);
    printOut("Name chosen: " + aName + newLine + "...");
    if (aArray.includes(aName)) {
        printOut(aName + " found! Removing name from array.")
        aArray.splice(index, 1)
    } else {
        printOut(aName + " not found!")
        return;
    }
}
printOut(girlsArray.toString() + newLine);
removeName(girlsArray, "Solveig")
printOut(newLine + girlsArray.toString());
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Create a new array with these names: "Jakob", "Lucas", "Emil", "Oskar", "Oliver", "William", "Filip", "Noah",
"Elias", "Isak", "Henrik", "Aksel", "Kasper", "Mathias", "Jonas", "Tobias", "Liam", "Håkon", "Theodor"and
"Magnus" Merge the arrays with girl names and boy names into a new array with all the names.
○ Hint: You can solve this with two lines of code. Remember that an empty array also has
properties and methods 😃

Put your code below here!*/

let boysArray = ["Jakob", "Lucas", "Emil", "Oskar", "Oliver", "William", "Filip", "Noah",
    "Elias", "Isak", "Henrik", "Aksel", "Kasper", "Mathias", "Jonas", "Tobias", "Liam", "Håkon", "Theodor",
    "Magnus"]

const girlsAndBoys = girlsArray.concat(boysArray);

printOut(girlsAndBoys);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Create a class named TBook.
Let the constructor fill in the three attributes (title, author, and ISBN number). Create a public function
"toString" in the class, it should return a text string that contains the three attributes of the class.
Create an array that contains three instances of the TBook class. Use a loop to print out the books that are
in the list.

Put your code below here!*/

class TBook {
    #title;
    #author;
    #isbn;

    constructor(aTitle, aAuthor, aISBN) {
        this.#title = aTitle;
        this.#author = aAuthor;
        this.#isbn = aISBN;
    }

    toString() {
        return `Title: ${this.#title}. Author: ${this.#author}. ISBN: ${this.#isbn}`;
    }
}

const book1 = new TBook("Hamnet", "Maggie O'Farrell", "978-1472223791");
const book2 = new TBook("The Hobbit", "J.R.R. Tolkien", "9780008779900");
const book3 = new TBook("Serafin og hans makeløse mesterverk", "Philippe Fix", "9788205336698");
const bookArray = [book1, book2, book3];

for(let i = 0; i < bookArray.length; i++) {
    printOut(bookArray[i].toString());
}
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Create a static object!
You can replace the language in the "name" attributes with whatever you want.
Use this function: Object.keys(EWeekDays) to create an array with the "keys" that exist in the
EWeekDays object.
Create a loop that traverses this "key" array and prints all the elements that exist in the EWeekDays object
○ Hint: Use W3Schools as I have shown you, here you see good examples of exactly this!

Put your code below here!*/

const EWeekDays = {
    WeekDay1: { value: 0x01, name: "Monday" },
    WeekDay2: { value: 0x02, name: "Tuesday" },
    WeekDay3: { value: 0x04, name: "Wednesday" },
    WeekDay4: { value: 0x08, name: "Thursday" },
    WeekDay5: { value: 0x10, name: "Friday" },
    WeekDay6: { value: 0x20, name: "Saturday" },
    WeekDay7: { value: 0x40, name: "Sunday" },

    Workdays: {
        value: 0x01 + 0x02 + 0x04 + 0x08 + 0x10,
        name: "Workdays"
    },

    Weekends: {
        value: 0x20 + 0x40,
        name: "Weekend"
    },
};

const keys = Object.keys(EWeekDays);

for(const key of keys) {
    const day = EWeekDays[key];
    printOut(`Value: ${day.value}, name: ${day.name}`);
}


printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Create an array that contains 35 random numbers from 1 to 20 (inclusive). Sort these arrays in ascending
and descending order. To get full credit for this task, it must be solved with "callback" functions that you
use in the .sort(...) method of this array.

Put your code below here!*/

const randomArray = [];

for(let i = 0; i < 35; i++) {
    const random = Math.ceil(Math.random()*20);
    randomArray.push(random);
}

function arraySorted(a, b) {
    return a-b;
}

function arrayReversed(a, b) {
    return b-a;
}
const randomArraySorted = [...randomArray].sort(arraySorted);
const randomArrayReversed = [...randomArray].sort(arrayReversed);

printOut("Random array: " + randomArray);
printOut("Sorted array: " + randomArraySorted);
printOut("Reversed array: " + randomArrayReversed);


printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Based on part 8, print out how many times the different numbers occur in the array. First, print the
numbers and their frequency, then print the frequencies and which numbers they correspond to. You must
print the most frequent ones first, and if there are multiple numbers where the frequency is the same, then
it should again be sorted from the smallest to the largest number.

Put your code below here!*/

const frequency = {};
for(let i = 0; i < randomArray.length; i++){
  if(frequency[randomArray[i]]){
    frequency[randomArray[i]] += 1;
  }else{
    frequency[randomArray[i]] = 1;
  }
}
let part9Text1 = "Number Frequencies:" + newLine;
for(const number in frequency){
  part9Text1 += `Number ${number} occurs ${frequency[number]} times.` + newLine;
}
printOut(part9Text1);
printOut(newLine);

function frequencySort(a, b){
  if(frequency[b] === frequency[a]){
    return a - b; // Ascending order for numbers
  }
  return frequency[b] - frequency[a]; // Descending order for frequency
}

const frequencyKeys = Object.keys(frequency);
frequencyKeys.sort(frequencySort);
const frequencyValues = [];
for(let i = 0; i < frequencyKeys.length; i++){
  const value = parseInt(frequencyKeys[i]);
  frequencyValues.push(value);
}
let part9Text2 = "Frequencies Sorted:" + newLine;
for(let i = 0; i < frequencyValues.length; i++){
  const num = frequencyValues[i];
  part9Text2 += `Number ${num} occurs ${frequency[num]} times.` + newLine;
}
printOut(part9Text2);

printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Create an array that contains rows and columns (2 dimensions, 5x9). Start with an empty array. Use "for"
loops to create rows and columns, respectively. In each "cell," create a text that shows which row and
column the "cell" is in. Then create two new sets of "for" loops to print the array itself.
○ Hint: For each round in the loop for the rows, you create a column. And for each round in the
columns, you write the "cell" value.

Put your code below here!*/

const rows = 5;
const cols = 9;
const grid = [];
for(let i = 0; i < rows; i++) {
    const cells = [];
    for(let j = 0; j < cols; j++) {
        cells.push(`Row ${i + 1}, Col ${j + 1}`);
    }
    grid.push(cells);
}
let gridText = "";
for(let i = 0; i < rows; i++){
  for(let j = 0; j < cols; j++){
    gridText += grid[i][j] + "&nbsp;&nbsp;&nbsp;";
  }
  gridText += newLine;
}
printOut(gridText);
printOut(newLine);
