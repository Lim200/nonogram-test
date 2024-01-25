import { nonogramDataObj, nonogramGameField } from "./layout.js";

const nonogramData = nonogramDataObj.letterN;

const nonogramContainer = document.getElementById("nonogram");
let cell;
// let cellsGameField = [];

function createNonogramTable(data) {
  const table = document.createElement("table");

  const firstGameFieldRow = data.length - nonogramGameField.length;
  const firstGameFieldCol = data[0].length - nonogramGameField[0].length;

  // table.classList.add("nonogramTable");
  for (let row = 0; row < data.length; row++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < data[row].length; col++) {
      // console.log(
      //   "data[row][col]",
      //   data[row][col],
      //   "type data[row][col]",
      //   typeof +data[row][col]
      // );
      let elemTable = data[row][col];
      let cellType = elemTable === "" || !isNaN(elemTable) ? "th" : "td";
      cell = document.createElement(cellType);
      cell.textContent = data[row][col];

      if (cell.textContent === "a" || cell.textContent === "x") {
        cell.textContent = "";
        cell.className = "gameField";
      } else if (cell.textContent === "") {
        cell.className = "fieldLeft";
      }

      if (col === firstGameFieldCol - 1) {
        cell.style.borderRight = "3px solid black";
      }
      if (row === firstGameFieldRow - 1) {
        cell.style.borderBottom = "3px solid black";
      }

      if (cell.classList.contains("gameField")) {
        if ((row - firstGameFieldRow) % 5 === 0) {
          cell.style.borderTop = "3px solid black";
        }
        if ((col - firstGameFieldCol) % 5 === 0) {
          cell.style.borderLeft = "3px solid black";
        }
      }

      if (cell.classList.contains("gameField")) {
        cell.addEventListener("click", leftClick);
        cell.addEventListener("contextmenu", rightClick);
      }

      tr.appendChild(cell);
    }
    table.appendChild(tr);
  }

  return table;
}

nonogramContainer.appendChild(createNonogramTable(nonogramData));

function leftClick(event) {
  if (!this.classList.contains("blackField")) {
    this.classList.add("blackField");
    this.classList.remove("crossedField");
  } else {
    this.classList.remove("blackField");
    this.classList.remove("crossedField");
  }
  checkFill();
}

function rightClick(event) {
  event.preventDefault();
  if (!this.classList.contains("crossedField")) {
    this.classList.add("crossedField");
    this.classList.remove("blackField");
  } else {
    this.classList.remove("crossedField");
  }
  checkFill();
}

function checkFill() {
  const tableRows = document.querySelectorAll("#nonogram table tr");
  let cellsGameField = [];

  for (let rowIndex = 1; rowIndex < tableRows.length; rowIndex++) {
    const cells = tableRows[rowIndex].querySelectorAll("td");
    let rowCourantGameField = [];

    for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
      const cell = cells[cellIndex];
      rowCourantGameField.push(
        cell.classList.contains("blackField") ? "a" : "x"
      );
    }
    if (rowCourantGameField.length !== 0) {
      cellsGameField.push(rowCourantGameField);
    }
  }

  // console.log("cellsGameField", cellsGameField);

  let isCorrect = true;
  for (let rowIndex = 0; rowIndex < cellsGameField.length; rowIndex++) {
    for (
      let colIndex = 0;
      colIndex < cellsGameField[rowIndex].length;
      colIndex++
    ) {
      if (
        cellsGameField[rowIndex][colIndex] !==
        nonogramGameField[rowIndex][colIndex]
      ) {
        isCorrect = false;
        break;
      }
    }
    if (!isCorrect) {
      break;
    }
  }

  if (isCorrect) {
    console.log("Great! You have solved the nonogram!");
  }
}
