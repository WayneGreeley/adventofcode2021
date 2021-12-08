import * as fs from "fs";
import * as rd from "readline";
import * as path from "path";

var filenPath1 = path.join(__dirname, "..", "text-assets", "7.1.mine.txt");
console.log(`filenPath1: ${filenPath1}`);
var reader1 = rd.createInterface(fs.createReadStream(filenPath1));

var crabs: Array<number> = [];

reader1.on("line", (l: string) => {
  // console.log(`l: ${l} `);
  const tokens = l.split(",");
  tokens.forEach((x) => {
    crabs.push(parseInt(x));
  });
});

reader1.on("close", () => {
  console.log(`Data has been read ${crabs.length}`);

  let sortedcrabs: number[] = crabs.sort((n1, n2) => n1 - n2);
  // console.log(sortedcrabs);
  let p = 0;
  if (sortedcrabs.length % 2) {
    p = (sortedcrabs.length + 1) / 2;
  } else {
    p = sortedcrabs.length / 2;
  }
  let median = (sortedcrabs[p - 1] + sortedcrabs[p]) / 2;

  let total = sortedcrabs.reduce((x, y) => x + y, 0);
  let mean = Math.round(total / sortedcrabs.length);

  console.log(`sortedcrabs.length: ${sortedcrabs.length}   p: ${p}`);
  console.log(
    `sortedcrabs[p-1]: ${sortedcrabs[p - 1]}
    sortedcrabs[p]: ${sortedcrabs[p]}
    median: ${median}  mean: ${mean}  `
  );

  let leastfuel = Infinity;
  let location = 0;
  let start = mean < median ? mean : median;
  let end = mean > median ? mean : median;

  for (let i = start - 1; i < end + 2; i++) {
    let fuel = 0;
    for (let j = 0; j < sortedcrabs.length; j++) {
      let distance = Math.abs(sortedcrabs[j] - i);
      //sum of 1 to n = (n * (n+1)) / 2;
      fuel += (distance * (distance + 1)) / 2;
    }
    // console.log(`      location: ${i}  answer: ${fuel} `);
    if (fuel < leastfuel) {
      leastfuel = fuel;
      location = i;
    }
  }

  // console.log(crabs);
  console.log(`location: ${location}  answer: ${leastfuel} `);
  // 98905974 too high
});
