export const nonogramDataObj = {
  grid: [
    ["", "", "", "1", "0", "1", "0", "1"],
    ["", "", "", "1", "1", "1", "1", "1"],
    ["", "", "", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "a", "x", "a", "x", "a"],
    ["0", "1", "1", "x", "a", "x", "a", "x"],
    ["1", "1", "1", "a", "x", "a", "x", "a"],
    ["0", "1", "1", "x", "a", "x", "a", "x"],
    ["1", "1", "1", "a", "x", "a", "x", "a"],
  ],
  person: [
    ["", "", "1", "1", "1", "1", "1"],
    ["", "", "2", "1", "1", "1", "2"],
    ["0", "1", "x", "x", "a", "x", "x"],
    ["2", "2", "a", "a", "x", "a", "a"],
    ["0", "1", "x", "x", "a", "x", "x"],
    ["2", "2", "a", "a", "x", "a", "a"],
    ["1", "1", "a", "x", "x", "x", "a"],
  ],
  rocket: [
    ["", "", "0", "0", "1", "0", "0"],
    ["", "", "2", "3", "1", "3", "2"],
    ["0", "1", "x", "x", "a", "x", "x"],
    ["1", "1", "x", "a", "x", "a", "x"],
    ["0", "3", "x", "a", "a", "a", "x"],
    ["2", "2", "a", "a", "a", "a", "a"],
    ["1", "1", "a", "x", "a", "x", "a"],
  ],
  letterN: [
    ["", "", "", "0", "0", "0", "0", "0"],
    ["", "", "", "5", "1", "1", "1", "5"],
    ["0", "1", "1", "a", "x", "x", "x", "a"],
    ["0", "2", "1", "a", "a", "x", "x", "a"],
    ["1", "1", "1", "a", "x", "a", "x", "a"],
    ["0", "1", "2", "a", "x", "x", "a", "a"],
    ["0", "1", "1", "a", "x", "x", "x", "a"],
  ],
  face: [
    ["", "", "", "0", "1", "0", "1", "0"],
    ["", "", "", "0", "1", "3", "1", "0"],
    ["", "", "", "5", "1", "1", "1", "5"],
    ["0", "0", "5", "a", "a", "a", "a", "a"],
    ["1", "1", "1", "a", "x", "a", "x", "a"],
    ["0", "0", "5", "a", "a", "a", "a", "a"],
    ["0", "1", "1", "a", "x", "x", "x", "a"],
    ["0", "0", "5", "a", "a", "a", "a", "a"],
  ],
};

export const nonogramGameFieldObj = {
  grid: [
    ["a", "x", "a", "x", "a"],
    ["x", "a", "x", "a", "x"],
    ["a", "x", "a", "x", "a"],
    ["x", "a", "x", "a", "x"],
    ["a", "x", "a", "x", "a"],
  ],
  person: [
    ["x", "x", "a", "x", "x"],
    ["a", "a", "x", "a", "a"],
    ["x", "x", "a", "x", "x"],
    ["a", "a", "x", "a", "a"],
    ["a", "x", "x", "x", "a"],
  ],
  rocket: [
    ["x", "x", "a", "x", "x"],
    ["x", "a", "x", "a", "x"],
    ["x", "a", "a", "a", "x"],
    ["a", "a", "a", "a", "a"],
    ["a", "x", "a", "x", "a"],
  ],
  letterN: [
    ["a", "x", "x", "x", "a"],
    ["a", "a", "x", "x", "a"],
    ["a", "x", "a", "x", "a"],
    ["a", "x", "x", "a", "a"],
    ["a", "x", "x", "x", "a"],
  ],
  face: [
    ["a", "a", "a", "a", "a"],
    ["a", "x", "a", "x", "a"],
    ["a", "a", "a", "a", "a"],
    ["a", "x", "x", "x", "a"],
    ["a", "a", "a", "a", "a"],
  ],
};

// export const nonogramData = [
//   ["", "", "1", "1", "1", "1", "1"],
//   ["", "", "2", "1", "1", "1", "2"],
//   ["0", "1", "x", "x", "a", "x", "x"],
//   ["2", "2", "a", "a", "x", "a", "a"],
//   ["0", "1", "x", "x", "a", "x", "x"],
//   ["2", "2", "a", "a", "x", "a", "a"],
//   ["1", "1", "a", "x", "x", "x", "a"],
// ];

const nonogramData1 = [
  [
    ["", "", "", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["", "", "", "5", "1", "1", "1", "5", "5", "1", "1", "1", "5"],
    ["0", "1", "1", "a", "x", "x", "x", "a", "a", "x", "x", "x", "a"],
    ["0", "2", "1", "a", "a", "x", "x", "a", "a", "x", "x", "x", "a"],
    ["1", "1", "1", "a", "x", "a", "x", "a", "a", "x", "x", "x", "a"],
    ["0", "1", "2", "a", "x", "x", "a", "a", "a", "x", "x", "x", "a"],
    ["0", "1", "1", "a", "x", "x", "x", "a", "a", "x", "x", "x", "a"],
    ["0", "1", "1", "a", "x", "x", "x", "a", "a", "x", "x", "x", "a"],
    ["0", "1", "1", "a", "x", "x", "x", "a", "a", "x", "x", "x", "a"],
  ],
  [
    // grid
    ["", "", "", "1", "0", "1", "0", "1"],
    ["", "", "", "1", "1", "1", "1", "1"],
    ["", "", "", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "a", "x", "a", "x", "a"],
    ["0", "1", "1", "x", "a", "x", "a", "x"],
    ["1", "1", "1", "a", "x", "a", "x", "a"],
    ["0", "1", "1", "x", "a", "x", "a", "x"],
    ["1", "1", "1", "a", "x", "a", "x", "a"],
  ],
  [
    //person
    ["", "", "1", "1", "1", "1", "1"],
    ["", "", "2", "1", "1", "1", "2"],
    ["0", "1", "x", "x", "a", "x", "x"],
    ["2", "2", "a", "a", "x", "a", "a"],
    ["0", "1", "x", "x", "a", "x", "x"],
    ["2", "2", "a", "a", "x", "a", "a"],
    ["1", "1", "a", "x", "x", "x", "a"],
  ],
  [
    //rocket
    ["", "", "0", "0", "1", "0", "0"],
    ["", "", "2", "3", "1", "3", "2"],
    ["0", "1", "x", "x", "a", "x", "x"],
    ["1", "1", "x", "a", "x", "a", "x"],
    ["0", "3", "x", "a", "a", "a", "x"],
    ["2", "2", "a", "a", "a", "a", "a"],
    ["1", "1", "a", "x", "x", "x", "a"],
  ],
  [
    // letter N
    ["", "", "", "0", "0", "0", "0", "0"],
    ["", "", "", "5", "1", "1", "1", "5"],
    ["0", "1", "1", "a", "x", "x", "x", "a"],
    ["0", "2", "1", "a", "a", "x", "x", "a"],
    ["1", "1", "1", "a", "x", "a", "x", "a"],
    ["0", "1", "2", "a", "x", "x", "a", "a"],
    ["0", "1", "1", "a", "x", "x", "x", "a"],
  ],
  [
    // face
    ["", "", "", "0", "1", "0", "1", "0"],
    ["", "", "", "0", "1", "3", "1", "0"],
    ["", "", "", "5", "1", "1", "1", "5"],
    ["0", "0", "5", "a", "a", "a", "a", "a"],
    ["1", "1", "1", "a", "x", "a", "x", "a"],
    ["0", "0", "5", "a", "a", "a", "a", "a"],
    ["0", "1", "1", "a", "x", "x", "x", "a"],
    ["0", "0", "5", "a", "a", "a", "a", "a"],
  ],
];

const nonogramGameField1 = [
  [
    ["a", "x", "x", "x", "a", "a", "x", "x", "x", "a"],
    ["a", "a", "x", "x", "a", "a", "x", "x", "x", "a"],
    ["a", "x", "a", "x", "a", "a", "x", "x", "x", "a"],
    ["a", "x", "x", "a", "a", "a", "x", "x", "x", "a"],
    ["a", "x", "x", "x", "a", "a", "x", "x", "x", "a"],
    ["a", "x", "x", "a", "a", "a", "x", "x", "x", "a"],
    ["a", "x", "x", "x", "a", "a", "x", "x", "x", "a"],
  ],
  [
    ["x", "x", "a", "x", "x"],
    ["a", "a", "x", "a", "a"],
    ["x", "x", "a", "x", "x"],
    ["a", "a", "x", "a", "a"],
    ["a", "x", "x", "x", "a"],
  ],
];
