import * as fs from "fs";
import * as rd from "readline";
import * as path from "path";

var filenPath1 = path.join(__dirname, "..", "text-assets", "6.1.mine.txt");
console.log(`filenPath1: ${filenPath1}`);
var reader1 = rd.createInterface(fs.createReadStream(filenPath1));

let fishes: Map<number, number> = new Map([
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0],
  [5, 0],
  [6, 0],
  [7, 0],
  [8, 0],
]);

const calcFish = () => {
  let sum = 0;
  for (let i = 0; i <= 8; i++) {
    sum += fishes.get(i);
  }
  return sum;
};

reader1.on("line", (l: string) => {
  console.log(`l: ${l} `);
  const tokens = l.split(",");
  tokens.forEach((x) => {
    let y: number = parseInt(x);
    fishes.set(y, fishes.get(y) + 1);
  });
});

reader1.on("close", () => {
  console.log(`Data has been read ${calcFish()}`);

  for (let days = 0; days < 256; days++) {
    let multiplyingFish = fishes.get(0);

    for (let i = 1; i <= 8; i++) {
      //age existing fish
      fishes.set(i - 1, fishes.get(i));
    }
    //reset zero to 6
    fishes.set(6, fishes.get(6) + multiplyingFish);
    //add the new fish
    fishes.set(8, multiplyingFish);
  }

  console.log(fishes);
  console.log(calcFish());
});
