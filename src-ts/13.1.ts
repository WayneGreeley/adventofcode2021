import { createReadStream } from "fs";
import { createInterface } from "readline";
import { join as pathjoin } from "path";

var filenPath1 = pathjoin(__dirname, "..", "text-assets", "13.1.mine.txt");
console.log(`filenPath1: ${filenPath1}`);
var reader1 = createInterface(createReadStream(filenPath1));

var filenPath2 = pathjoin(__dirname, "..", "text-assets", "13.2.mine.txt");
console.log(`filenPath2: ${filenPath2}`);
var reader2 = createInterface(createReadStream(filenPath2));

let largestX = 0;
let largestY = 0;

let width = 1400;
let height = 1400;
let inputs: Array<Array<string>> = [];
for (let y = 0; y < height; y++) {
  let row: Array<string> = new Array<string>();
  for (let x = 0; x < width; x++) {
    row.push(".");
  }
  inputs.push(row);
}

reader1.on("line", (l: string) => {
  //console.log(`l: ${l} `);
  let coordinates = l.split(",");
  let x = parseInt(coordinates[0]);
  let y = parseInt(coordinates[1]);
  if (x > largestX) {
    largestX = x;
  }
  if (y > largestY) {
    largestY = y;
  }
  inputs[y][x] = "#";
});

reader1.on("close", () => {
  console.log(`Data has been read ${inputs.length}`);
  console.log(`largestX: ${largestX} | largestY: ${largestY}`);
  // for (let i = 0; i < inputs.length; i++) {
  //   console.log(`inputs: ${i} |  ${inputs[i].join("")} `);
  // }
  console.log("--------------------------------------------------");
});

let folds: Array<{ dir: string; value: number }> = new Array<{
  dir: string;
  value: number;
}>();

reader2.on("line", (l: string) => {
  let tokens = l.split("=");
  folds.push({ dir: tokens[0], value: parseInt(tokens[1]) });
});

reader2.on("close", () => {
  console.log(`Data has been read ${folds.length}`);
  console.log(folds);
  // for (let i = 0; i < folds.length; i++) {
  //   console.log(`folds: ${i} ||  ${folds[i].dir}  | ${folds[i].value} `);
  // }
  console.log("--------------------------------------------------");

  let newWidth = width;
  let newHeight = height;

  for (let i = 0; i < folds.length; i++) {
    // for (let i = 0; i < 1; i++) {
    // console.log(`folds: ${i} ||  ${folds[i].dir}  | ${folds[i].value} `);

    //if folds Y reduce up
    //for every row below fold.value
    //if (x,y) == # put # into (x,value - abs(value-y)
    //if folding on 7 {0,8} goes to {0,6}
    if (folds[i].dir === "fold along y") {
      for (let foldY = folds[i].value; foldY < newHeight; foldY++) {
        for (let thisX = 0; thisX < newWidth; thisX++) {
          if (inputs[foldY][thisX] === "#") {
            let newY = folds[i].value - Math.abs(folds[i].value - foldY);
            //console.log(`thisX: ${thisX} | foldY: ${foldY} || newY: ${newY}`);
            inputs[newY][thisX] = "#";
          }
        }
      }
      newHeight = folds[i].value;
    }

    //if folds X reduce left
    if (folds[i].dir === "fold along x") {
      for (let foldX = folds[i].value; foldX < newWidth; foldX++) {
        for (let thisY = 0; thisY < newHeight; thisY++) {
          if (inputs[thisY][foldX] === "#") {
            let newX = folds[i].value - Math.abs(folds[i].value - foldX);
            //console.log(`thisY: ${thisY} | foldX: ${foldX} || newX: ${newX}`);
            inputs[thisY][newX] = "#";
          }
        }
      }
      newWidth = folds[i].value;
    }
  }

  let count = 0;
  for (let i = 0; i < newHeight; i++) {
    let aRow = "";
    for (let j = 0; j < newWidth; j++) {
      aRow += inputs[i][j];
      if (inputs[i][j] === "#") {
        count++;
      }
    }
    console.log(aRow);
  }
  console.log(`newWidth: ${newWidth}  | newHeight: ${newHeight} `);

  let answer = count;

  console.log("--------------------------------------------------");
  console.log(`answer: ${answer} `);
});
