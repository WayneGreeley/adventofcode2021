import * as fs from "fs";
import * as rd from "readline";
import * as path from "path";

var filenPath1 = path.join(__dirname, "..", "text-assets", "4.1.sample.txt");
console.log(`filenPath1: ${filenPath1}`);
var reader1 = rd.createInterface(fs.createReadStream(filenPath1));

var filenPath2 = path.join(__dirname, "..", "text-assets", "4.2.sample.txt");
console.log(`filenPath2: ${filenPath2}`);
var reader2 = rd.createInterface(fs.createReadStream(filenPath2));

var bingoNumbers: Array<number> = [];

reader1.on("line", (l: string) => {
  const tokens = l.split(",");
  tokens.forEach((x) => {
    bingoNumbers.push(parseInt(x));
  });
});
//console.log(`Will be empty data has not yet been read ${bingoNumbers.length}`);

reader1.on("close", () => {
  console.log(`Data has been read ${bingoNumbers.length}`);
  console.log(`bingoNumbers: ${bingoNumbers}`);
});

var bingoBoards: Array<Array<number>> = [];

let temp: string = "";
let boardNum = 0;
reader2.on("line", (l: string) => {
  if (l.length > 1) {
    temp = temp + " " + l;
  } else {
    temp = temp.trim().replace(/  +/g, " "); //replace double spaces
    //console.log(`temp: ${temp}`);
    const bingotokens = temp.split(" ");
    //console.log(`bingotokens: ${bingotokens}`);

    let tempArray: Array<number> = [];
    bingotokens.forEach((y) => {
      tempArray.push(parseInt(y));
    });

    bingoBoards[boardNum] = tempArray;
    boardNum++;
    temp = "";
  }
});
//console.log(`Will be empty data has not yet been read ${bingoBoards.length}`);

reader1.on("close", () => {
  console.log(`Data has been read ${bingoBoards.length}`);

  bingoBoards.forEach((z, i) => {
    console.log(`bingoBoard ${i}: ${z}  ${z.length}`);
  });

  // const answer:number = binNum.convertIt(oxygen[0].tokens) * binNum.convertIt(carbon[0].tokens)
  // console.log(`answer: ${answer}`)
});
