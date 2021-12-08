import * as fs from "fs";
import * as rd from "readline";
import * as path from "path";

var filenPath1 = path.join(__dirname, "..", "text-assets", "7.1.mine.txt");
console.log(`filenPath1: ${filenPath1}`);
var reader1 = rd.createInterface(fs.createReadStream(filenPath1));

var crabs: Array<number> = [];

reader1.on("line", (l: string) => {
  console.log(`l: ${l} `);
  const tokens = l.split(",");
  tokens.forEach((x) => {
    crabs.push(parseInt(x));
  });
});

reader1.on("close", () => {
  console.log(`Data has been read ${crabs.length}`);

  let sortedcrabs: number[] = crabs.sort((n1, n2) => n1 - n2);
  console.log(sortedcrabs);
  let p = 0;
  if (sortedcrabs.length % 2) {
    p = (sortedcrabs.length + 1) / 2;
  } else {
    p = sortedcrabs.length / 2;
  }
  let median = (sortedcrabs[p - 1] + sortedcrabs[p]) / 2;
  console.log(`sortedcrabs.length: ${sortedcrabs.length}   p: ${p}`);
  console.log(
    `sortedcrabs[p-1]: ${sortedcrabs[p - 1]}   sortedcrabs[p]: ${
      sortedcrabs[p]
    }  median: ${median}  `
  );

  let fuel = 0;
  for (let i = 0; i < sortedcrabs.length; i++) {
    fuel += Math.abs(sortedcrabs[i] - median);
  }

  // console.log(crabs);
  console.log(`answer: ${fuel} `);
});
