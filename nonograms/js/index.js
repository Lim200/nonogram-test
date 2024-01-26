import { nonogramDataObj, nonogramGameFieldObj } from "./layout.js";

const nameTemplates = ["grid", "person", "rocket", "letterN", "face"];

function generateTemplates() {
  const randomIndex = Math.floor(Math.random() * nameTemplates.length);
  console.log(nameTemplates[randomIndex]);
  return nameTemplates[randomIndex];
}

let templatesRandom = generateTemplates();
const nonogramData = nonogramDataObj[templatesRandom];

const nonogramGameField = nonogramGameFieldObj[templatesRandom];

// const nonogramContainer = document.getElementById("nonogram");
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

function drawPage() {
  const popUpModal = document.createElement("div");
  popUpModal.className = "pop_up_modal modal_active";

  const modalWindow = document.createElement("div");
  modalWindow.className = "modal_window";

  const modalText = document.createElement("h3");
  modalText.className = "modal_window__text";
  modalText.textContent = "Great! You have solved the nonogram in  seconds!";

  const secretWordSpan = document.createElement("span");
  secretWordSpan.className = "modal_window__time";
  secretWordSpan.textContent = "10:00";

  const playAgainButton = document.createElement("button");
  playAgainButton.className = "modal_window__bnt";
  playAgainButton.textContent = "Play again";

  modalText.appendChild(secretWordSpan);
  modalWindow.appendChild(modalText);
  modalWindow.appendChild(playAgainButton);
  popUpModal.appendChild(modalWindow);

  const wrapper = document.createElement("section");
  wrapper.className = "wrapper";

  const cleanButton = document.createElement("button");
  cleanButton.className = "bnt_clean";
  cleanButton.textContent = "Clean";

  document.body.innerHTML = "";
  document.body.appendChild(popUpModal);
  document.body.appendChild(wrapper);
  wrapper.appendChild(createNonogramTable(nonogramData));
  wrapper.appendChild(cleanButton);
}

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
  const tableRows = document.querySelectorAll(".wrapper table tr");
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
        // console.log('Break1');
        break;
      }
    }
    if (!isCorrect) {
      // console.log('Break2');
      break;
    }
  }

  if (isCorrect) {
    document.querySelector(".pop_up_modal").classList.remove("modal_active");
    console.log("Great! You have solved the nonogram!");
  }
}

drawPage();
