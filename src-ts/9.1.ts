import { createReadStream } from "fs";
import { createInterface } from "readline";
import { join as pathjoin } from "path";

var filenPath1 = pathjoin(__dirname, "..", "text-assets", "9.1.mine.txt");
console.log(`filenPath1: ${filenPath1}`);
var reader1 = createInterface(createReadStream(filenPath1));

let inputs: Array<Array<string>> = [];

let rowNumber = 0;
let columnNumber = 0;
reader1.on("line", (l: string) => {
  //console.log(`l: ${l} `);

  inputs[rowNumber] = l.split("");
  rowNumber++;
  columnNumber = l.length;
});

const isValidNeighbor = (x: number, y: number) => {
  return x >= 0 && x < rowNumber && y >= 0 && y < columnNumber;
};

const adjacentN = (x: number, y: number) => {
  return isValidNeighbor(x - 1, y) ? parseInt(inputs[x - 1][y]) : 10;
};

const adjacentS = (x: number, y: number) => {
  return isValidNeighbor(x + 1, y) ? parseInt(inputs[x + 1][y]) : 10;
};

const adjacentE = (x: number, y: number) => {
  return isValidNeighbor(x, y + 1) ? parseInt(inputs[x][y + 1]) : 10;
};

const adjacentW = (x: number, y: number) => {
  return isValidNeighbor(x, y - 1) ? parseInt(inputs[x][y - 1]) : 10;
};

reader1.on("close", () => {
  console.log(`Data has been read ${inputs.length}`);
  // console.log(`inputs: ${inputs} `);
  console.log(`rows: ${rowNumber}  | columns: ${columnNumber}`);
  // for (let i = 0; i < inputs.length; i++) {
  //   console.log(`inputs: ${i} |  ${inputs[i]} `);
  // }

  let answer = 0;

  for (let a = 0; a < rowNumber; a++) {
    for (let b = 0; b < columnNumber; b++) {
      let value = parseInt(inputs[a][b]);
      if (
        value < adjacentN(a, b) &&
        value < adjacentS(a, b) &&
        value < adjacentE(a, b) &&
        value < adjacentW(a, b)
      ) {
        console.log(`low point ${a} ${b} ${value}`);
        answer += value + 1;
      }
    }
  }

  console.log("-----");
  console.log(`answer: ${answer} `);
});
