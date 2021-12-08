import * as fs from "fs";
import * as rd from "readline";
import * as path from "path";

var filenPath1 = path.join(__dirname, "..", "text-assets", "8.1.mine.txt");
console.log(`filenPath1: ${filenPath1}`);
var reader1 = rd.createInterface(fs.createReadStream(filenPath1));

let inputs: Array<string> = [];
let outputs: Array<string> = [];

reader1.on("line", (l: string) => {
  //console.log(`l: ${l} `);
  const tokens = l.split(" | ");

  tokens[0].split(" ").forEach((x) => {
    inputs.push(x);
  });

  tokens[1].split(" ").forEach((y) => {
    outputs.push(y);
  });
});

reader1.on("close", () => {
  console.log(`Data has been read ${outputs.length}`);
  //console.log(`outputs: ${outputs} `);

  let answer = 0;

  // digits 1, 4, 7, or 8
  outputs.forEach((word) => {
    switch (word.length) {
      case 2: //word = 1
        answer++;
        break;
      case 3: //word = 7
        answer++;
        break;
      case 4: //word = 4
        answer++;
        break;
      case 7: //word = 8
        answer++;
        break;
      default:
        // not a 1, 4, 7 or 8
        break;
    }
  });

  console.log(`answer: ${answer} `);
});
