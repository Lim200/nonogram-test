import { nonogramDataObj, nonogramGameFieldObj } from './templates.js';

const nameTemplates = [
  // "solved",
  'Grid',
  'Person',
  'Rocket',
  'LetterN',
  'Face',
  'Snowman',
  'Turnip',
  'Cat',
  'Kettle',
  'Cat_fence',
  'Lion',
  'Coffee',
  'Cow',
  'Elk',
  'Mickey',
];
const levelNames = ['easy', 'medium', 'hard'];

const templateLevels = {
  Grid: 'easy',
  Person: 'easy',
  Rocket: 'easy',
  LetterN: 'easy',
  Face: 'easy',
  Snowman: 'medium',
  Turnip: 'medium',
  Cat: 'medium',
  Kettle: 'medium',
  Cat_fence: 'medium',
  Lion: 'hard',
  Coffee: 'hard',
  Cow: 'hard',
  Elk: 'hard',
  Mickey: 'hard',
};

function generateTemplates(sumItem) {
  const randomIndex = Math.floor(Math.random() * sumItem);
  return nameTemplates[randomIndex];
}

function updateSelectsBasedOnTemplate(templateName) {
  const level = templateLevels[templateName];

  const levelSelect = document.querySelector('.select_level');
  levelSelect.value = level;

  updateTemplateName(level);
  const templateSelect = document.querySelector('.select_template');
  templateSelect.value = templateName;
}

let templatesRandom = generateTemplates(5);
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
let levelSelect;
let tableResult;
let timeArea;
let isSoundEnabled = true;

let cell;

function createNonogramTable(data, gameField) {
  const table = document.createElement('table');

  const firstGameFieldRow = data.length - gameField.length;
  const firstGameFieldCol = data[0].length - gameField[0].length;

  for (let row = 0; row < data.length; row++) {
    const tr = document.createElement('tr');
    for (let col = 0; col < data[row].length; col++) {
      let elemTable = data[row][col];
      let cellType = elemTable === '' || !isNaN(elemTable) ? 'th' : 'td';
      cell = document.createElement(cellType);
      // cell.textContent = data[row][col];

      if (cellType === 'th' && elemTable == 0) {
        cell.className = 'fieldZero';
        cell.textContent = data[row][col];
      } else {
        cell.textContent = data[row][col];
      }

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

      if (cellType === 'th') {
        if (
          col >= firstGameFieldCol &&
          (col - firstGameFieldCol + 1) % 5 === 0
        ) {
          cell.style.borderRight = '3px solid black';
        }
        if (
          row >= firstGameFieldRow &&
          (row - firstGameFieldRow + 1) % 5 === 0
        ) {
          cell.style.borderBottom = '3px solid black';
        }
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
  playAgainButton.className = 'modal_window__bnt button';
  playAgainButton.textContent = 'Close';

  const popUpModalResult = document.createElement('div');
  popUpModalResult.className = 'pop-up_result pop_up_modal modal_active';

  const modalWrapper = document.createElement('div');
  // modalWrapper.className = 'modalWrapper';
  modalWrapper.className = 'modal_window';

  const modalTextResult = document.createElement('h3');
  modalTextResult.className = 'modal-title';
  modalTextResult.textContent = 'Five bests results';

  tableResult = document.createElement('table');
  tableResult.className = 'tableResult';
  tableResult.textContent = '';

  const closeButton = document.createElement('button');
  closeButton.className = 'close_btn button';
  closeButton.textContent = 'Close';

  modalText.appendChild(timeSpan);
  modalWindow.appendChild(modalText);
  modalWindow.appendChild(playAgainButton);
  popUpModal.appendChild(modalWindow);

  modalWrapper.appendChild(modalTextResult);
  modalWrapper.appendChild(tableResult);
  modalWrapper.appendChild(closeButton);
  popUpModalResult.appendChild(modalWrapper);

  const wrapper = document.createElement('section');
  wrapper.className = 'wrapper';

  timeArea = document.createElement('div');
  timeArea.className = 'timeArea';

  time = document.createElement('span');
  time.className = 'time';
  time.textContent = '00:00';

  gameArea = document.createElement('div');
  gameArea.className = 'gameArea';

  const controlArea = document.createElement('div');
  controlArea.className = 'controlArea';

  const rowRow2 = document.createElement('div');
  rowRow2.className = 'row row2';

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

  const rowRow3 = document.createElement('div');
  rowRow3.className = 'row row3';

  const randomButton = document.createElement('button');
  randomButton.className = 'bnt_random button';
  randomButton.textContent = 'Random game';

  const solutionButton = document.createElement('button');
  solutionButton.className = 'bnt_solution button';
  solutionButton.textContent = 'Solution';

  const resultButton = document.createElement('button');
  resultButton.className = 'resultButton button';
  resultButton.textContent = 'Best results';

  const soundButton = document.createElement('button');
  soundButton.className = 'soundButton button';
  soundButton.textContent = 'Sound off';

  const rowRow1 = document.createElement('div');
  rowRow1.className = 'row row1';

  const levelLabel = document.createElement('label');
  levelLabel.className = 'level';
  levelLabel.htmlFor = 'level';
  levelLabel.textContent = 'Level:';

  levelSelect = document.createElement('select');
  levelSelect.className = 'select_level';
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
  templateLabel.className = 'template';
  templateLabel.htmlFor = 'template';
  templateLabel.textContent = 'Template:';

  templateName = document.createElement('select');
  templateName.className = 'select_template';
  templateName.name = 'template';
  templateName.id = 'template';

  // levelSelect.name = "template";
  // levelSelect.id = "template";

  levelSelect.addEventListener('change', (e) => {
    updateTemplateName(e.target.value);
  });

  const openButton = document.createElement('button');
  openButton.className = 'bnt_open button';
  openButton.textContent = 'Open';

  document.body.innerHTML = '';
  document.body.appendChild(popUpModal);
  document.body.appendChild(popUpModalResult);
  document.body.appendChild(wrapper);

  timeArea.appendChild(time);
  wrapper.appendChild(gameArea);
  gameArea.appendChild(timeArea);
  gameArea.appendChild(createNonogramTable(nonogramData, nonogramGameField));
  wrapper.appendChild(controlArea);

  controlArea.appendChild(rowRow1);
  rowRow1.appendChild(levelLabel);
  rowRow1.appendChild(levelSelect);
  rowRow1.appendChild(templateLabel);
  rowRow1.appendChild(templateName);
  rowRow1.appendChild(openButton);

  controlArea.appendChild(rowRow2);
  rowRow2.appendChild(cleanButton);
  rowRow2.appendChild(saveButton);
  rowRow2.appendChild(сontinueButton);
  rowRow2.appendChild(darkButton);

  controlArea.appendChild(rowRow3);
  rowRow3.appendChild(randomButton);
  rowRow3.appendChild(solutionButton);
  rowRow3.appendChild(resultButton);
  rowRow3.appendChild(soundButton);

  document.querySelector('.bnt_clean').addEventListener('click', () => {
    // body.classList.remove('no-scroll');
    cleanCells();
    cleanTimer();
  });

  document.querySelector('.bnt_open').addEventListener('click', () => {
    openTemplate(templateName.value);
    cleanTimer();
    changeMode();
  });

  document.querySelector('.modal_window__bnt').addEventListener('click', () => {
    drawPage();

    document.querySelector('.pop_up_modal').classList.add('modal_active');
    document.body.classList.remove('no-scroll');
    cleanTimer();
  });

  document.querySelector('.close_btn').addEventListener('click', () => {
    document.querySelector('.pop-up_result').classList.add('modal_active');
    document.body.classList.remove('no-scroll');
  });

  document.querySelector('.resultButton').addEventListener('click', () => {
    document.querySelector('.pop-up_result').classList.remove('modal_active');
    showRecordResult();
  });

  document.querySelector('.bnt_save').addEventListener('click', () => {
    saveTemplate();
    // cleanTimer();
  });

  document.querySelector('.bnt_сontinue').addEventListener('click', () => {
    restoreGame();
    changeMode();
    cleanTimer();
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

  document.querySelector('.bnt_random').addEventListener('click', () => {
    let templatesRandomAll = generateTemplates(15);
    openTemplate(templatesRandomAll);
    updateSelectsBasedOnTemplate(templatesRandomAll);
    // cleanTimer();
    changeMode();
    cleanTimer();
  });

  document.querySelector('.bnt_solution').addEventListener('click', () => {
    showSolution();
    // changeMode();
  });

  document.querySelector('.soundButton').addEventListener('click', () => {
    toggleSound();
  });

  updateTemplateName(levelSelect.value, templateName);
  changeMode();
}

function toggleSound() {
  isSoundEnabled = !isSoundEnabled;
  document.querySelector('.soundButton').textContent = isSoundEnabled
    ? 'Sound off'
    : 'Sound on';
}

function playSound(audioFile) {
  if (!isSoundEnabled) return;

  const audio = new Audio(audioFile);
  audio.play();
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

function showSolution() {
  const tableRows = document.querySelectorAll('.wrapper table tr');
  const firstGameFieldRow = nonogramData.length - nonogramGameField.length;

  const firstGameFieldCol =
    nonogramData[0].length - nonogramGameField[0].length;

  for (
    let rowIndex = firstGameFieldRow;
    rowIndex < tableRows.length;
    rowIndex++
  ) {
    const cells = tableRows[rowIndex].querySelectorAll('td.gameField');

    for (
      let colIndex = firstGameFieldCol;
      colIndex < cells.length + firstGameFieldCol;
      colIndex++
    ) {
      const cell = cells[colIndex - firstGameFieldCol];
      const solutionValue =
        nonogramGameField[rowIndex - firstGameFieldRow][
          colIndex - firstGameFieldCol
        ];
      cell.classList.remove('blackField', 'blackFieldDark', 'crossedField');

      if (solutionValue === 'a') {
        const activeClass =
          localStorage.getItem('themeMode') === 'darkMode'
            ? 'blackFieldDark'
            : 'blackField';
        cell.classList.add(activeClass);
      }
    }
  }
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
      if (
        cell.classList.contains('blackField') ||
        cell.classList.contains('blackFieldDark')
      ) {
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
  updateSelectsBasedOnTemplate(selectedTemplateNameStorage);

  const savedGameField = JSON.parse(localStorage.getItem('savedGameField'));
  if (!savedGameField || savedGameField.length === 0) {
    alert('No saved game found');
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
  }
  time.textContent = formatTime(seconds);
}

function cleanTimer() {
  clearInterval(interval);
  isSolved = false;
  milliseconds = 0;
  seconds = 0;
  time.textContent = formatTime(seconds);
  interval = null;
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
  gameArea.appendChild(timeArea);
  gameArea.appendChild(newTable);

  nonogramData = nonogramDataObj[selectedTemplateName];
  nonogramGameField = nonogramGameFieldObj[selectedTemplateName];
}

function updateTemplateName(selectedLevel) {
  let arrTemplates;
  const templateNameContainer = document.querySelector('.select_template');

  if (selectedLevel === 'easy') {
    arrTemplates = nameTemplates.slice(0, 5);
  } else if (selectedLevel === 'medium') {
    arrTemplates = nameTemplates.slice(5, 10);
  } else if (selectedLevel === 'hard') {
    arrTemplates = nameTemplates.slice(10);
  }

  templateNameContainer.innerHTML = '';

  arrTemplates.forEach((templateValue) => {
    const option = document.createElement('option');
    option.value = templateValue;
    option.textContent =
      templateValue.charAt(0).toUpperCase() + templateValue.slice(1);
    templateNameContainer.appendChild(option);
  });
}

function leftClick(event) {
  if (
    !this.classList.contains('blackField') &&
    !this.classList.contains('blackFieldDark')
  ) {
    const activeClass =
      localStorage.getItem('themeMode') === 'darkMode'
        ? 'blackFieldDark'
        : 'blackField';
    this.classList.add(activeClass);
    this.classList.remove('crossedField');
    playSound('assets/audio/fillcell.wav');
  } else {
    this.classList.remove('blackField', 'blackFieldDark');
    this.classList.remove('crossedField');
    playSound('assets/audio/clean.mp3');
  }

  checkFill();

  if (!interval && !isSolved) {
    interval = setInterval(startTimer, 10);
  }
}

function rightClick(event) {
  event.preventDefault();
  if (!this.classList.contains('crossedField')) {
    this.classList.add('crossedField');
    this.classList.remove('blackField', 'blackFieldDark');
    playSound('assets/audio/cross.wav');
  } else {
    this.classList.remove('blackField', 'blackFieldDark', 'crossedField');
    playSound('assets/audio/clean.mp3');
  }

  checkFill();
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
      const mode = localStorage.getItem('themeMode');
      if (mode !== 'darkMode') {
        rowCourantGameField.push(
          cell.classList.contains('blackField') ? 'a' : 'x'
        );
      }
      if (mode === 'darkMode') {
        rowCourantGameField.push(
          cell.classList.contains('blackFieldDark') ? 'a' : 'x'
        );
      }
    }
    if (rowCourantGameField.length !== 0) {
      cellsGameField.push(rowCourantGameField);
    }
  }

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
    solved();
  }
}

function solved() {
  document.querySelector('.pop_up_modal').classList.remove('modal_active');
  clearInterval(interval);
  console.log('Great! You have solved the nonogram!');
  timeSpan.textContent = seconds;
  modalText.innerHTML = `Great! You have solved the nonogram in <span class="modal_window__time">${timeSpan.textContent}</span> seconds!`;
  document.body.classList.add('no-scroll');
  playSound('assets/audio/win.mp3');

  isSolved = true;

  const game = {
    templateName: templateName.value,
    level: levelSelect.value,
    time: formatTime(seconds),
    seconds,
  };

  let savedGames = JSON.parse(localStorage.getItem('games')) || [];

  savedGames.unshift(game);

  if (savedGames.length > 5) {
    savedGames = savedGames.slice(0, 5);
  }

  localStorage.setItem('games', JSON.stringify(savedGames));

  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}

function showRecordResult() {
  const savedGames = JSON.parse(localStorage.getItem('games')) || [];
  let resultArr = savedGames;

  tableResult.innerHTML = '';

  if (savedGames.length > 0) {
    resultArr.sort((a, b) => a.seconds - b.seconds);

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const trHead = document.createElement('tr');

    const headers = ['Place', 'Template', 'Level', 'Time'];
    headers.forEach((headerText) => {
      const th = document.createElement('th');
      th.textContent = headerText;
      trHead.appendChild(th);
    });

    thead.appendChild(trHead);
    table.appendChild(thead);

    resultArr.forEach((game, index) => {
      const tr = document.createElement('tr');

      const tdPlace = document.createElement('td');
      tdPlace.textContent = index + 1;
      tr.appendChild(tdPlace);

      const tdTemplate = document.createElement('td');
      tdTemplate.textContent = game.templateName;
      tr.appendChild(tdTemplate);

      const tdLevel = document.createElement('td');
      tdLevel.textContent = game.level;
      tr.appendChild(tdLevel);

      const tdTime = document.createElement('td');
      tdTime.textContent = game.time;
      tr.appendChild(tdTime);

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    tableResult.appendChild(table);
  } else {
    const noGamesMsg = document.createElement('p');
    noGamesMsg.classList = 'not_save';
    noGamesMsg.textContent = 'There are no saved games.';
    tableResult.appendChild(noGamesMsg);
  }
  document.body.classList.add('no-scroll');
}

function cleanCells() {
  const tableRows = document.querySelectorAll('.wrapper table tr');

  for (let rowIndex = 1; rowIndex < tableRows.length; rowIndex++) {
    const cells = tableRows[rowIndex].querySelectorAll('td');

    for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
      const cell = cells[cellIndex];

      if (cell.classList.contains('gameField')) {
        cell.classList.remove('blackField', 'blackFieldDark', 'crossedField');
      }
    }
  }
}

drawPage();
changeMode();
updateSelectsBasedOnTemplate(templatesRandom);
