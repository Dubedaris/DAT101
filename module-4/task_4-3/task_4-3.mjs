"use strict";

const CarTypes = [
  { value: 1, caption: "Aston Martin" },
  { value: 2, caption: "Bentley" },
  { value: 3, caption: "Alfa Romeo" },
  { value: 4, caption: "Ferrari" },
  { value: 5, caption: "Subaru" },
  { value: 6, caption: "Porsche" },
  { value: 7, caption: "Citroën" },
  { value: 8, caption: "Toyota" },
  { value: 9, caption: "Renault" },
  { value: 10, caption: "Peugeot" },
  { value: 11, caption: "Suzuki" },
  { value: 12, caption: "Mitsubishi" },
  { value: 13, caption: "Nissan" },
];

const GirlsNames = ["Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid", "Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth", "Kristin"];

const MovieGenre = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Superhero",
  "Thriller",
  "War",
  "Western",
  "Trash"
];

//--- Part 1 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

function cmbTask1CalculateClick() {
  const txtTask1Output = document.getElementById("txtTask1Output");
  const txtRectHeight = document.getElementById("txtRectHeight");
  const txtRectWidth = document.getElementById("txtRectWidth");
  const width = parseInt(txtRectWidth.value);
  const height = parseInt(txtRectHeight.value);
  const area = width * height;
  const perimeter = 2 * (width + height);
  txtTask1Output.innerHTML = `width: ${width}, height: ${height}`;
  txtTask1Output.innerHTML += `<br/>area: ${area}, perimeter: ${perimeter}`;
}

let cmbTask1Calculate = document.getElementById("cmbTask1Calculate");
cmbTask1Calculate.onclick = cmbTask1CalculateClick;


//--- Part 2 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

function txtTask2WordKeyPress(aEvent) {
  const txtTask2Output = document.getElementById("txtTask2Output");
  //txtTask2Output.innerHTML = `You pressed the key: ${aEvent.key}`;
  if (aEvent.key === "Enter") {
    const word = txtTask2Word.value;
    task2Words.push(word);
    txtTask2Output.innerHTML = `You have entered ${task2Words.length} words: <br/>`
    txtTask2Output.innerHTML += task2Words.join(" ");
    txtTask2Word.value = "";
  }
}
const txtTask2Word = document.getElementById("txtTask2Word");
txtTask2Word.addEventListener("keypress", txtTask2WordKeyPress);
const task2Words = [];


//--- Part 3 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

const chkTask3 = document.getElementsByName("chkTask3");
const cmbTask3CheckAnswer = document.getElementById("cmbTask3CheckAnswer");
const txtTask3Output = document.getElementById("txtTask3Output");
txtTask3Output.innerHTML = "";
function cmbTask3CheckAnswerClick() {
  for (let i = 0; i < chkTask3.length; i++) {
    const chkBox = chkTask3[i];
    const text = `chkTask3[${i}].checked = ${chkBox.checked}`
    txtTask3Output.innerHTML += text + "<br/>";
  }
}
cmbTask3CheckAnswer.addEventListener("click", cmbTask3CheckAnswerClick);


//--- Part 4 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

const divTask4Cars = document.getElementById("divTask4Cars");

function rdbCarNameSelect(aEvent) {
  const txtTask4Output = document.getElementById("txtTask4Output");
  txtTask4Output.innerHTML = `User select car type number: ${aEvent.target.value}`;
}

for (let i = 0; i < CarTypes.length; i++) {
  const car = CarTypes[i];
  const inputRadio = document.createElement("input");
  inputRadio.type = "radio";
  inputRadio.name = "rdbCarName";
  inputRadio.value = car.value;
  inputRadio.id = "rdbCarName" + i.toString();
  inputRadio.addEventListener("change", rdbCarNameSelect);

  const labelCaption = document.createElement("label");
  labelCaption.for = inputRadio.id;
  labelCaption.appendChild(document.createTextNode(car.caption));
  divTask4Cars.appendChild(inputRadio);
  divTask4Cars.appendChild(labelCaption);
  divTask4Cars.appendChild(document.createElement("br"));


  console.log(`CarTypes[${i}].value = ${car.value}, CarTypes[${i}].caption = ${car.caption}`);
}

//--- Part 5 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

const selectTask5Animals = document.getElementById("selectTask5Animals");
const txtTask5Output = document.getElementById("txtTask5Output");

function SelectTask5AnimalsChange() {
  const animalValue = selectTask5Animals.value;
  txtTask5Output.innerHTML = "User selected animal number: " + animalValue;
}
selectTask5Animals.addEventListener("change", SelectTask5AnimalsChange);

//--- Part 6 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

const selectTask6Girls = document.getElementById("selectTask6Girls");
const txtTask6Output = document.getElementById("txtTask6Output");

for (let i = 0; i < GirlsNames.length; i++) {
  const option = document.createElement("option");
  option.value = i.toString();
  option.appendChild(document.createTextNode(GirlsNames[i]));
  selectTask6Girls.appendChild(option);
}
function SelectGirlsChange() {
  const value = parseInt(selectTask6Girls.value);
  const name = GirlsNames[value];
  txtTask6Output.innerHTML = `You selected: ${value}, ${name}`;
}
selectTask6Girls.addEventListener("change", SelectGirlsChange);

//--- Part 7 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
const txtMovieTitle = document.getElementById("txtMovieTitle");
const selectMovieGenre = document.getElementById("selectMovieGenre");
const txtMovieDirector = document.getElementById("txtMovieDirector");
const txtMovieRate = document.getElementById("txtMovieRate");
const cmbAddMovie = document.getElementById("cmbAddMovie");
const tblMovies = document.getElementById("tblMovies");
const tblMoviesBody = tblMovies.getElementsByTagName("tbody")[0];
let movieIndex = 1 ;


function cmbAddMovieClick() {
  const title = txtMovieTitle.value;
  const genreIndex = parseInt(selectMovieGenre.value);
  const genre = MovieGenre[genreIndex];
  const director = txtMovieDirector.value;
  const rating = txtMovieRate.value;
  const newRow = tblMoviesBody.insertRow();
  const cellIndex = newRow.insertCell();
  const cellTitle = newRow.insertCell();
  const cellGenre = newRow.insertCell();
  const cellDirector = newRow.insertCell();
  const cellRate = newRow.insertCell();

  cellIndex.innerHTML = movieIndex++;
  cellTitle.innerHTML = title;
  cellGenre.innerHTML = genre;
  cellDirector.innerHTML = director;
  cellRate.innerHTML = rating;
   // Clear input fields
  txtMovieTitle.value = "";
  selectMovieGenre.value = "0";
  txtMovieDirector.value = "";
  txtMovieRate.value = "";

}


for (let i = 0; i < MovieGenre.length; i++) {
  const option = document.createElement("option");
  option.value = i.toString();
  option.appendChild(document.createTextNode(MovieGenre[i]));
  selectMovieGenre.appendChild(option);
}

cmbAddMovie.addEventListener("click", cmbAddMovieClick);


//sample movies

txtMovieTitle.value = "Hamnet";
selectMovieGenre.value = "7";
txtMovieDirector.value = "Chloe Zhao";
txtMovieRate.value = "10";
cmbAddMovieClick();

txtMovieTitle.value = "Hot Fuzz";
selectMovieGenre.value = "4";
txtMovieDirector.value = "Edgar Wright";
txtMovieRate.value = "9.9";
cmbAddMovieClick();

txtMovieTitle.value = "Pearl Harbor";
selectMovieGenre.value = "24";
txtMovieDirector.value = "Michael Bay";
txtMovieRate.value = "3";
cmbAddMovieClick();
