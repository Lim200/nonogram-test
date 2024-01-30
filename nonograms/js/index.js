import { nonogramDataObj, nonogramGameFieldObj } from './layout.js';

const nameTemplates = [
  'solved',
  'grid',
  // "person",
  // "rocket",
  // "letterN",
  // "face",
  // "2",
  // "2",
  // "2",
  // "2",
  // "2",
  // "3",
  // "3",
  // "3",
  // "3",
  // "3",
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
let timeSpan;
let time;
let milliseconds = 0;
let seconds = 0;
let interval;
let isSolved = false;
let modalText;
let nonogramData = nonogramDataObj[templatesRandom];
let nonogramGameField = nonogramGameFieldObj[templatesRandom];

let cell;

function createNonogramTable(data, gameField) {
  const table = document.createElement('table');

  const firstGameFieldRow = data.length - gameField.length;
  const firstGameFieldCol = data[0].length - gameField[0].length;

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

  modalText = document.createElement('h3');
  // modalText.className = "modal_window__text";
  // modalText.textContent = "Great! You have solved the nonogram in  seconds!";

  timeSpan = document.createElement('span');
  timeSpan.className = 'modal_window__time';
  timeSpan.textContent = '00:00';

  modalText.innerHTML = `Great! You have solved the nonogram in <span class="modal_window__time">${timeSpan.textContent}</span> seconds!`;

  const playAgainButton = document.createElement('button');
  playAgainButton.className = 'modal_window__bnt';
  playAgainButton.textContent = 'Play again';

  modalText.appendChild(timeSpan);
  modalWindow.appendChild(modalText);
  modalWindow.appendChild(playAgainButton);
  popUpModal.appendChild(modalWindow);

  const wrapper = document.createElement('section');
  wrapper.className = 'wrapper';

  const timeArea = document.createElement('div');
  timeArea.className = 'timeArea';

  time = document.createElement('span');
  time.className = 'time';
  time.textContent = '00:00';

  gameArea = document.createElement('div');
  gameArea.className = 'gameArea';

  const controlArea = document.createElement('div');
  controlArea.className = 'controlArea';

  const cleanButton = document.createElement('button');
  cleanButton.className = 'bnt_clean button';
  cleanButton.textContent = 'Reset game';

  const saveButton = document.createElement('button');
  saveButton.className = 'bnt_save button';
  saveButton.textContent = 'Save game';

  const сontinueButton = document.createElement('button');
  сontinueButton.className = 'bnt_сontinue button';
  сontinueButton.textContent = 'Сontinue last game';

  const darkButton = document.createElement('button');
  darkButton.className = 'bnt_dark button';
  darkButton.textContent = 'Dark';

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
  openButton.className = 'bnt_open button';
  openButton.textContent = 'Open';

  document.body.innerHTML = '';
  document.body.appendChild(popUpModal);
  document.body.appendChild(wrapper);
  wrapper.appendChild(timeArea);
  timeArea.appendChild(time);
  wrapper.appendChild(gameArea);
  gameArea.appendChild(createNonogramTable(nonogramData, nonogramGameField));
  wrapper.appendChild(controlArea);
  controlArea.appendChild(cleanButton);
  controlArea.appendChild(levelLabel);
  controlArea.appendChild(levelSelect);
  controlArea.appendChild(templateLabel);
  controlArea.appendChild(templateName);
  controlArea.appendChild(openButton);
  controlArea.appendChild(saveButton);
  controlArea.appendChild(сontinueButton);
  controlArea.appendChild(darkButton);

  document.querySelector('.bnt_clean').addEventListener('click', () => {
    // body.classList.remove('no-scroll');
    cleanCells();
    cleanTimer();
  });

  document.querySelector('.bnt_open').addEventListener('click', () => {
    openTemplate(templateName.value);
    cleanTimer();
  });

  document.querySelector('.modal_window__bnt').addEventListener('click', () => {
    drawPage();
    document.querySelector('.pop_up_modal').classList.add('modal_active');
    cleanTimer();
  });

  document.querySelector('.bnt_save').addEventListener('click', () => {
    saveTemplate();
  });

  document.querySelector('.bnt_сontinue').addEventListener('click', () => {
    restoreGame();
  });

  document.querySelector('.bnt_dark').addEventListener('click', () => {
    const currentTheme = localStorage.getItem('themeMode');
    if (currentTheme === 'darkMode') {
      localStorage.removeItem('themeMode');
      darkButton.textContent = 'Dark';
    } else {
      localStorage.setItem('themeMode', 'darkMode');
      darkButton.textContent = 'Light';
    }
    changeMode();
  });

  updateTemplateName(levelSelect.value, templateName);
  changeMode();
}

function changeMode() {
  const currentTheme = localStorage.getItem('themeMode');
  const cells = document.querySelectorAll('.fieldLeft, .fieldLeftDark');
  const cellsTh = document.querySelectorAll('th');
  const cellsActive = document.querySelectorAll('.gameField');
  try {
    if (currentTheme === 'darkMode') {
      document.body.classList.add('darkMode');
      cellsActive.forEach((cell) => {
        if (cell.classList.contains('blackField')) {
          cell.classList.remove('blackField');
          cell.classList.add('blackFieldDark');
        }
      });
      cellsTh.forEach((cell) => {
        cell.classList.add('tips');
      });
      cells.forEach((cell) => {
        cell.classList.remove('tips');
        cell.classList.remove('fieldLeft');
        cell.classList.add('fieldLeftDark');
      });
    } else {
      document.body.classList.remove('darkMode');
      cellsTh.forEach((cell) => {
        cell.classList.remove('tips');
      });
      cells.forEach((cell) => {
        cell.classList.remove('fieldLeftDark');
        cell.classList.add('fieldLeft');
      });
      cellsActive.forEach((cell) => {
        if (cell.classList.contains('blackFieldDark')) {
          cell.classList.remove('blackFieldDark');
          cell.classList.add('blackField');
        }
      });
    }
  } catch (err) {}
}

function saveTemplate() {
  const selectedTemplateName = templateName.value;
  localStorage.setItem('selectedTemplateName', selectedTemplateName);
  const tableRows = document.querySelectorAll('.wrapper table tr');
  let savedGameField = [];

  for (let rowIndex = 0; rowIndex < tableRows.length; rowIndex++) {
    const cells = tableRows[rowIndex].querySelectorAll('td, th');
    let rowCurrentGameField = [];

    for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
      const cell = cells[cellIndex];
      if (cell.classList.contains('blackField')) {
        rowCurrentGameField.push('black');
      } else if (cell.classList.contains('crossedField')) {
        rowCurrentGameField.push('crossed');
      } else {
        rowCurrentGameField.push('empty');
      }
    }
    savedGameField.push(rowCurrentGameField);
  }

  localStorage.setItem('savedGameField', JSON.stringify(savedGameField));
  console.log('Game saved');
}

function restoreGame() {
  const selectedTemplateNameStorage = localStorage.getItem(
    'selectedTemplateName'
  );

  openTemplate(selectedTemplateNameStorage);

  const savedGameField = JSON.parse(localStorage.getItem('savedGameField'));
  if (!savedGameField || savedGameField.length === 0) {
    console.log('No saved game found');
    return;
  }

  const tableRows = document.querySelectorAll('.wrapper table tr');

  savedGameField.forEach((row, rowIndex) => {
    const cells = tableRows[rowIndex].querySelectorAll('td, th');
    row.forEach((cellState, cellIndex) => {
      const cell = cells[cellIndex];
      if (cellState === 'black') {
        cell.classList.add('blackField');
      } else if (cellState === 'crossed') {
        cell.classList.add('crossedField');
      } else {
        cell.classList.remove('blackField', 'crossedField');
      }
    });
  });

  console.log('Game restored');
}

function startTimer() {
  milliseconds++;
  if (milliseconds > 99) {
    seconds++;
    milliseconds = 0;
    // time.textContent = formatTime(seconds);
  }
  time.textContent = formatTime(seconds);
}

function cleanTimer() {
  isSolved = false;
  milliseconds = 0;
  seconds = 0;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

  return `${formattedMinutes}:${formattedSeconds}`;
}

function openTemplate(templateName) {
  const selectedTemplateName = templateName;
  const newTable = createNonogramTable(
    nonogramDataObj[selectedTemplateName],
    nonogramGameFieldObj[selectedTemplateName]
  );

  gameArea.innerHTML = '';
  gameArea.appendChild(newTable);

  nonogramData = nonogramDataObj[selectedTemplateName];
  nonogramGameField = nonogramGameFieldObj[selectedTemplateName];
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
  const currentTheme = localStorage.getItem('themeMode');
  if (currentTheme === 'darkMode') {
    if (!this.classList.contains('blackFieldDark')) {
      this.classList.add('blackFieldDark');
      this.classList.remove('crossedField');
    } else {
      this.classList.remove('blackFieldDark');
      this.classList.remove('crossedField');
    }
  } else {
    if (!this.classList.contains('blackField')) {
      this.classList.add('blackField');
      this.classList.remove('crossedField');
    } else {
      this.classList.remove('blackField');
      this.classList.remove('crossedField');
    }
  }
  checkFill();
  // clearInterval(interval);
  // interval = setInterval(startTimer, 10);
  if (!interval && !isSolved) {
    interval = setInterval(startTimer, 10);
  }
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
  // clearInterval(interval);
  // interval = setInterval(startTimer, 10);
  if (!interval && !isSolved) {
    interval = setInterval(startTimer, 10);
  }
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
    solved();
  }
}

function solved() {
  document.querySelector('.pop_up_modal').classList.remove('modal_active');
  clearInterval(interval);
  console.log('Great! You have solved the nonogram!');
  timeSpan.textContent = formatTime(seconds);
  modalText.innerHTML = `Great! You have solved the nonogram in <span class="modal_window__time">${timeSpan.textContent}</span> seconds!`;
  // milliseconds = 0;
  // seconds = 0;
  isSolved = true;
  if (interval) {
    clearInterval(interval);
    interval = null;
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
changeMode();
