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

  for (let i = 0; i < inputs.length; i++) {
    //console.log(`inputs: ${i} |  ${inputs[i]} `);

    let charMap = new Map<string, number>();
    charMap.set("(", 0);
    charMap.set(")", 0);
    charMap.set("[", 0);
    charMap.set("]", 0);
    charMap.set("{", 0);
    charMap.set("}", 0);
    charMap.set("<", 0);
    charMap.set(">", 0);

    let charStack = [];

    let j = 0;
    let illegalChar = "";
    do {
      const char = inputs[i][j];

      charMap.set(char, charMap.get(char) + 1);

      switch (char) {
        case ")":
          if (charStack.length == 0) {
            illegalChar = char;
            illegalCharMap.set(char, illegalCharMap.get(char) + 1);
          } else {
            let popped = charStack.pop();
            if (popped != "(") {
              console.log(
                `expected ${oppositeOpperator(popped)} found ${char}`
              );
              illegalChar = char;
              illegalCharMap.set(char, illegalCharMap.get(char) + 1);
            }
          }
          // if (charMap.get("(") < charMap.get(")")) {
          // }
          break;
        case "]":
          if (charStack.length == 0) {
            illegalChar = char;
            illegalCharMap.set(char, illegalCharMap.get(char) + 1);
          } else {
            let popped = charStack.pop();
            if (popped != "[") {
              console.log(
                `expected ${oppositeOpperator(popped)} found ${char}`
              );
              illegalChar = char;
              illegalCharMap.set(char, illegalCharMap.get(char) + 1);
            }
          }
          break;
        case "}":
          if (charStack.length == 0) {
            illegalChar = char;
            illegalCharMap.set(char, illegalCharMap.get(char) + 1);
          } else {
            let popped = charStack.pop();
            if (popped != "{") {
              console.log(
                `expected ${oppositeOpperator(popped)} found ${char}`
              );
              illegalChar = char;
              illegalCharMap.set(char, illegalCharMap.get(char) + 1);
            }
          }
          break;
        case ">":
          if (charStack.length == 0) {
            illegalChar = char;
            illegalCharMap.set(char, illegalCharMap.get(char) + 1);
          } else {
            let popped = charStack.pop();
            if (popped != "<") {
              console.log(
                `expected ${oppositeOpperator(popped)} found ${char}`
              );
              illegalChar = char;
              illegalCharMap.set(char, illegalCharMap.get(char) + 1);
            }
          }
          break;
        default:
          charStack.push(char);
          break;
      }
      j++;
    } while (j < inputs[i].length && illegalChar === "");

    // console.log(`-------charMap-------- ${illegalChar} `);
    // for (const [key, value] of charMap) {
    //   console.log(key + " = " + value);
    // }
  }

  console.log(`-------illegalCharMap--------  `);
  for (const [key, value] of illegalCharMap) {
    console.log(key + " = " + value);
  }

  // ): 3 points.
  // ]: 57 points.
  // }: 1197 points.
  // >: 25137 points.

  answer =
    3 * illegalCharMap.get(")") +
    57 * illegalCharMap.get("]") +
    1197 * illegalCharMap.get("}") +
    25137 * illegalCharMap.get(">");

  console.log("-----");
  console.log(`answer: ${answer} `);
});
