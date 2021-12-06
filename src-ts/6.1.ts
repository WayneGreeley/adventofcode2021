import * as fs from "fs";
import * as rd from "readline";
import * as path from "path";

var filenPath1 = path.join(__dirname, "..", "text-assets", "6.1.mine.txt");
console.log(`filenPath1: ${filenPath1}`);
var reader1 = rd.createInterface(fs.createReadStream(filenPath1));

var fishes: Array<number> = [];

reader1.on("line", (l: string) => {
  console.log(`l: ${l} `);
  const tokens = l.split(",");
  tokens.forEach((x) => {
    fishes.push(parseInt(x));
  });
});

reader1.on("close", () => {
  console.log(`Data has been read ${fishes.length}`);

  for (let days = 0; days < 80; days++) {
    let newFish = 0;
    for (let fish = 0; fish < fishes.length; fish++) {
      if (fishes[fish] === 0) {
        newFish++;
        fishes[fish] = 6;
      } else {
        fishes[fish]--;
      }
    }
    for (let roe = 0; roe < newFish; roe++) {
      fishes.push(8);
    }
  }

  //console.log(fishes);
  console.log(fishes.length);
});
