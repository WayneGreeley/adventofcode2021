import { createReadStream } from "fs";
import { createInterface } from "readline";
import { join as pathjoin } from "path";

var filenPath1 = pathjoin(__dirname, "..", "text-assets", "10.1.mine.txt");
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

const oppositeOpperator = (x: string) => {
  let y = "?";
  switch (x) {
    case "(":
      y = ")";
      break;
    case "{":
      y = "}";
      break;
    case "[":
      y = "]";
      break;
    case "<":
      y = ">";
      break;
    default:
      console.log(`error; found ${x}`);
      break;
  }
  return y;
};

reader1.on("close", () => {
  console.log(`Data has been read ${inputs.length}`);
  // console.log(`inputs: ${inputs} `);
  console.log(`rows: ${rowNumber}  | columns: ${columnNumber}`);
  // for (let i = 0; i < inputs.length; i++) {
  //   console.log(`inputs: ${i} |  ${inputs[i]} `);
  // }

  let answer = 0;

  let illegalCharMap = new Map<string, number>();
  illegalCharMap.set(")", 0);
  illegalCharMap.set("]", 0);
  illegalCharMap.set("}", 0);
  illegalCharMap.set(">", 0);

  let openers = ["(", "[", "{", "<"];

  let autoScore: Array<number> = [0];

  let scoreMap = new Map<string, number>();
  scoreMap.set(")", 1);
  scoreMap.set("]", 2);
  scoreMap.set("}", 3);
  scoreMap.set(">", 4);

  for (let i = 0; i < inputs.length; i++) {
    //console.log(`inputs: ${i} |  ${inputs[i]} `);

    let charStack: Array<string> = [];

    let j = 0;
    let illegalChar = "";
    do {
      const char = inputs[i][j];

      if (openers.includes(char)) {
        charStack.push(char);
      } else {
        if (charStack.length == 0) {
          illegalChar = char;
          illegalCharMap.set(char, illegalCharMap.get(char) + 1);
        } else {
          let popped = charStack.pop();
          let oppositePopped = oppositeOpperator(popped);
          if (char != oppositePopped) {
            // console.log(`expected ${oppositePopped} found ${char}`);
            illegalChar = char;
            illegalCharMap.set(char, illegalCharMap.get(char) + 1);
          }
        }
      }

      j++;
    } while (j < inputs[i].length && illegalChar === "");

    let score = 0;
    if (illegalChar === "" && charStack.length > 0) {
      console.log(`work to do ${charStack}`);
      let prevLength = charStack.length;
      for (let k = 0; k < prevLength; k++) {
        let removed = charStack.pop();
        score = score * 5 + scoreMap.get(oppositeOpperator(removed));
      }
      console.log(`scored: ${score}`);
      autoScore.push(score);
    }
  }

  let sortedArray: number[] = autoScore.sort((n1, n2) => n1 - n2);
  console.log(`sortedArray: ${sortedArray}`);
  let middle = sortedArray.length / 2;
  answer = sortedArray[middle];

  console.log("-----");
  console.log(`answer: ${answer} `);
});
