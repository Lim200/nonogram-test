import { nonogramDataObj, nonogramGameFieldObj } from './layout.js';

const nameTemplates = [
  'grid',
  'person',
  'rocket',
  'letterN',
  'face',
  '2',
  '2',
  '2',
  '2',
  '2',
  '3',
  '3',
  '3',
  '3',
  '3',
];
const levelNames = ['small', 'medium', 'large'];

function generateTemplates() {
  const randomIndex = Math.floor(Math.random() * nameTemplates.length);
  console.log(nameTemplates[randomIndex]);
  return nameTemplates[randomIndex];
}

let templatesRandom = generateTemplates();
let templateName;
let gameArea;
let milliseconds = 0;
let seconds = 0;
let interval;
const nonogramData = nonogramDataObj[templatesRandom];
const nonogramGameField = nonogramGameFieldObj[templatesRandom];

// const nonogramContainer = document.getElementById("nonogram");
let cell;
// let cellsGameField = [];

function createNonogramTable(data, gameField) {
  const table = document.createElement('table');

  const firstGameFieldRow = data.length - gameField.length;
  const firstGameFieldCol = data[0].length - gameField[0].length;

  // table.classList.add("nonogramTable");
  for (let row = 0; row < data.length; row++) {
    const tr = document.createElement('tr');
    for (let col = 0; col < data[row].length; col++) {
      // console.log(
      //   "data[row][col]",
      //   data[row][col],
      //   "type data[row][col]",
      //   typeof +data[row][col]
      // );
      let elemTable = data[row][col];
      let cellType = elemTable === '' || !isNaN(elemTable) ? 'th' : 'td';
      cell = document.createElement(cellType);
      cell.textContent = data[row][col];

      if (cell.textContent === 'a' || cell.textContent === 'x') {
        cell.textContent = '';
        cell.className = 'gameField';
      } else if (cell.textContent === '') {
        cell.className = 'fieldLeft';
      }

      if (col === firstGameFieldCol - 1) {
        cell.style.borderRight = '3px solid black';
      }
      if (row === firstGameFieldRow - 1) {
        cell.style.borderBottom = '3px solid black';
      }

      if (cell.classList.contains('gameField')) {
        if ((row - firstGameFieldRow) % 5 === 0) {
          cell.style.borderTop = '3px solid black';
        }
        if ((col - firstGameFieldCol) % 5 === 0) {
          cell.style.borderLeft = '3px solid black';
        }
      }

      if (cell.classList.contains('gameField')) {
        cell.addEventListener('click', leftClick);
        cell.addEventListener('contextmenu', rightClick);
      }

      tr.appendChild(cell);
    }
    table.appendChild(tr);
  }

  return table;
}

function drawPage() {
  const popUpModal = document.createElement('div');
  popUpModal.className = 'pop_up_modal modal_active';

  const modalWindow = document.createElement('div');
  modalWindow.className = 'modal_window';

  const modalText = document.createElement('h3');
  modalText.className = 'modal_window__text';
  modalText.textContent = 'Great! You have solved the nonogram in  seconds!';

  const secretWordSpan = document.createElement('span');
  secretWordSpan.className = 'modal_window__time';
  secretWordSpan.textContent = '10:00';

  const playAgainButton = document.createElement('button');
  playAgainButton.className = 'modal_window__bnt';
  playAgainButton.textContent = 'Play again';

  modalText.appendChild(secretWordSpan);
  modalWindow.appendChild(modalText);
  modalWindow.appendChild(playAgainButton);
  popUpModal.appendChild(modalWindow);

  const wrapper = document.createElement('section');
  wrapper.className = 'wrapper';

  const timeArea = document.createElement('div');
  timeArea.className = 'timeArea';

  const time = document.createElement('span');
  time.className = 'time';
  time.textContent = '00:00';

  gameArea = document.createElement('div');
  gameArea.className = 'gameArea';

  const controlArea = document.createElement('div');
  controlArea.className = 'controlArea';

  const cleanButton = document.createElement('button');
  cleanButton.className = 'bnt_clean';
  cleanButton.textContent = 'Reset game';

  const levelLabel = document.createElement('label');
  levelLabel.htmlFor = 'level';
  levelLabel.textContent = 'Level:';

  const levelSelect = document.createElement('select');
  levelSelect.name = 'level';
  levelSelect.id = 'level';

  levelNames.forEach((optionValue) => {
    const option = document.createElement('option');
    option.value = optionValue;
    option.textContent =
      optionValue.charAt(0).toUpperCase() + optionValue.slice(1);
    levelSelect.appendChild(option);
  });

  const templateLabel = document.createElement('label');
  templateLabel.htmlFor = 'template';
  templateLabel.textContent = 'Template:';

  templateName = document.createElement('select');
  levelSelect.name = 'template';
  levelSelect.id = 'template';

  levelSelect.addEventListener('change', (e) => {
    updateTemplateName(e.target.value);
  });

  const openButton = document.createElement('button');
  openButton.className = 'bnt_open';
  openButton.textContent = 'Open';
  // const level = document.querySelector('.level');
  // const arrTemplates = [];
  // if (level.textContent === 'Small') {
  //   arrTemplates = nameTemplates.slice(0, 5);
  // } else if (level.textContent === 'Medium') {
  //   arrTemplates = nameTemplates.slice(6, 11);
  // } else if (level.textContent === 'Large') {
  //   arrTemplates = nameTemplates.slice(11);
  // }

  // arrTemplates.forEach((templateValue) => {
  //   const template = document.createElement('template');
  //   option.value = templateValue;
  //   option.textContent =
  //     templateValue.charAt(0).toUpperCase() + templateValue.slice(1);
  //   levelSelect.appendChild(option);
  // });

  document.body.innerHTML = '';
  document.body.appendChild(popUpModal);
  document.body.appendChild(wrapper);
  wrapper.appendChild(timeArea);
  wrapper.appendChild(gameArea);
  gameArea.appendChild(createNonogramTable(nonogramData, nonogramGameField));
  wrapper.appendChild(controlArea);
  controlArea.appendChild(cleanButton);
  controlArea.appendChild(levelLabel);
  controlArea.appendChild(levelSelect);
  controlArea.appendChild(templateLabel);
  controlArea.appendChild(templateName);
  controlArea.appendChild(openButton);

  document.querySelector('.bnt_clean').addEventListener('click', () => {
    // body.classList.remove('no-scroll');
    cleanCells();
  });

  document.querySelector('.bnt_open').addEventListener('click', () => {
    openTemplate();
  });

  updateTemplateName(levelSelect.value, templateName);
}

function startTimer() {
  milliseconds++;
  if (milliseconds > 99) {
    seconds++;
    milliseconds = 0;
    time.innerHTML = formatTime(seconds);
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

  return `${formattedMinutes}:${formattedSeconds}`;
}

function openTemplate() {
  const selectedTemplateName = templateName.value;
  const newTable = createNonogramTable(
    nonogramDataObj[selectedTemplateName],
    nonogramGameFieldObj[selectedTemplateName]
  );

  gameArea.innerHTML = '';
  gameArea.appendChild(newTable);
}

function updateTemplateName(selectedLevel, templateName) {
  const arrTemplates =
    selectedLevel === 'small'
      ? nameTemplates.slice(0, 5)
      : selectedLevel === 'medium'
      ? nameTemplates.slice(6, 11)
      : nameTemplates.slice(11);

  while (templateName.firstChild) {
    templateName.removeChild(templateName.firstChild);
  }

  arrTemplates.forEach((templateValue) => {
    const option = document.createElement('option');
    option.value = templateValue;
    option.textContent =
      templateValue.charAt(0).toUpperCase() + templateValue.slice(1);
    templateName.appendChild(option);
  });
}

function leftClick(event) {
  if (!this.classList.contains('blackField')) {
    this.classList.add('blackField');
    this.classList.remove('crossedField');
  } else {
    this.classList.remove('blackField');
    this.classList.remove('crossedField');
  }
  checkFill();
  clearInterval(interval);
  interval = setInterval(startTimer, 10);
}

function rightClick(event) {
  event.preventDefault();
  if (!this.classList.contains('crossedField')) {
    this.classList.add('crossedField');
    this.classList.remove('blackField');
  } else {
    this.classList.remove('crossedField');
  }
  checkFill();
  clearInterval(interval);
  interval = setInterval(startTimer, 10);
}

function checkFill() {
  const tableRows = document.querySelectorAll('.wrapper table tr');
  let cellsGameField = [];

  for (let rowIndex = 1; rowIndex < tableRows.length; rowIndex++) {
    const cells = tableRows[rowIndex].querySelectorAll('td');
    let rowCourantGameField = [];

    for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
      const cell = cells[cellIndex];
      rowCourantGameField.push(
        cell.classList.contains('blackField') ? 'a' : 'x'
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
    document.querySelector('.pop_up_modal').classList.remove('modal_active');
    console.log('Great! You have solved the nonogram!');
  }
}

function cleanCells() {
  const tableRows = document.querySelectorAll('.wrapper table tr');

  for (let rowIndex = 1; rowIndex < tableRows.length; rowIndex++) {
    const cells = tableRows[rowIndex].querySelectorAll('td');

    for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
      const cell = cells[cellIndex];

      if (cell.classList.contains('gameField')) {
        // console.log('Clean');
        cell.classList.remove('blackField');
      }
    }
  }
}

drawPage();
