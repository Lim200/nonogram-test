import nonogramData from './lyout.js';

const nonogramContainer = document.getElementById('nonogram');
let cell;

function createNonogramTable(data) {
  const table = document.createElement('table');
  for (let row = 0; row < data.length; row++) {
    const tr = document.createElement('tr');
    for (let col = 0; col < data[row].length; col++) {
      console.log(
        'data[row][col]',
        data[row][col],
        'type data[row][col]',
        typeof +data[row][col]
      );
      let elemTable = data[row][col];
      if (
        elemTable === '0' ||
        elemTable === '1' ||
        elemTable === '2' ||
        elemTable === '3' ||
        elemTable === '4' ||
        elemTable === '5' ||
        elemTable === '6' ||
        elemTable === '7' ||
        elemTable === '8' ||
        elemTable === '9'
      ) {
        cell = document.createElement('th');
      } else {
        cell = document.createElement('td');
      }

      cell.textContent = data[row][col];

      if (cell.textContent === 'a' || cell.textContent === 'x') {
        cell.className = 'gameField';
      } else if (cell.textContent === '') {
        cell.className = 'fieldLeft';
      }

      tr.appendChild(cell);
    }
    table.appendChild(tr);
  }
  return table;
}

nonogramContainer.appendChild(createNonogramTable(nonogramData));
