import { createReadStream } from "fs";
import { createInterface } from "readline";
import { join as pathjoin } from "path";

var filenPath1 = pathjoin(__dirname, "..", "text-assets", "11.1.mine.txt");
console.log(`filenPath1: ${filenPath1}`);
var reader1 = createInterface(createReadStream(filenPath1));

let inputs: Array<Array<number>> = [];

reader1.on("line", (l: string) => {
  //console.log(`l: ${l} `);
  inputs.push(l.split("").map(Number));
});

const isValidNeighbor = (x: number, y: number) => {
  return x >= 0 && x < 10 && y >= 0 && y < 10;
};

reader1.on("close", () => {
  console.log(`Data has been read ${inputs.length}`);
  for (let i = 0; i < inputs.length; i++) {
    console.log(`inputs: ${i} |  ${inputs[i]} `);
  }

  let answer = 0;

  for (let days = 0; days < 100; days++) {
    //increase all by 1
    for (let a = 0; a < 10; a++) {
      for (let b = 0; b < 10; b++) {
        inputs[a][b]++;
      }
    }

    //increase neighbors > 9 => do flashes
    let flashes = false;
    do {
      flashes = false;
      for (let a = 0; a < 10; a++) {
        for (let b = 0; b < 10; b++) {
          if (inputs[a][b] > 9) {
            inputs[a][b] = 0;
            flashes = true;
            answer++;

            //now affect neighbors
            for (let nx = a - 1; nx <= a + 1; nx++) {
              for (let ny = b - 1; ny <= b + 1; ny++) {
                // console.log(
                //   `why ${a} ${b} : ${nx} ${ny} | ${isValidNeighbor(nx, ny)}`
                // );
                if (isValidNeighbor(nx, ny)) {
                  if (inputs[nx][ny] > 0) {
                    inputs[nx][ny]++;
                  }
                }
              }
            }
          }
        }
      }
    } while (flashes == true);

    // console.log("--------------------------------------------------");
    // for (let j = 0; j < 10; j++) {
    //   console.log(`inputs afer ${days + 1}: ${j} |  ${inputs[j]} `);
    // }
  }
  for (let j = 0; j < 10; j++) {
    console.log(`inputs at end: ${j} |  ${inputs[j]} `);
  }
  console.log("--------------------------------------------------");
  console.log(`answer: ${answer} `);
});
