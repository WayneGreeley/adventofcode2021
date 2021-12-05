import * as fs from "fs";
import * as rd from "readline";
import * as path from "path";
const bingoBoard = require("./utils/bingoBoard");

var filenPath1 = path.join(__dirname, "..", "text-assets", "4.1.mine.txt");
console.log(`filenPath1: ${filenPath1}`);
var reader1 = rd.createInterface(fs.createReadStream(filenPath1));

var filenPath2 = path.join(__dirname, "..", "text-assets", "4.2.mine.txt");
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

var bingoBoardNumbers: Array<Array<number>> = [];

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

    bingoBoardNumbers[boardNum] = tempArray;
    boardNum++;
    temp = "";
  }
});
//console.log(`Will be empty data has not yet been read ${bingoBoards.length}`);

reader1.on("close", () => {
  console.log(`Data has been read ${bingoBoardNumbers.length}`);

  let bingoBoards: Array<typeof bingoBoard> = [];

  bingoBoardNumbers.forEach((z) => {
    //console.log(`bingoBoard ${i}: ${z}  ${z.length}`);
    let bb = new bingoBoard(z);
    //bb.printIt();
    bingoBoards.push(bb);
  });

  let winner: number = -1;
  let winningBall: number = -1;

  let boardsRemaining: number = bingoBoardNumbers.length;

  let turnNumber: number = 0;
  //main game loop
  do {
    //markIt
    for (var a = 0; a < bingoBoards.length; a++) {
      bingoBoards[a].markIt(bingoNumbers[turnNumber]);
    }

    //checkIt
    // console.log(
    //   `turnNumber: ${turnNumber}   boardsRemaining: ${boardsRemaining}    bingoNumbers[turnNumber]: ${bingoNumbers[turnNumber]}      `
    // );
    for (var b = 0; b < bingoBoardNumbers.length; b++) {
      if (!bingoBoards[b].hasWon) {
        //dont check it if it already won
        if (bingoBoards[b].checkIt()) {
          if (boardsRemaining == 1) {
            winner = b;
            winningBall = bingoNumbers[turnNumber];
            console.log(
              "--------------------------------- we have a winner  " +
                winningBall
            );
            bingoBoards[b].printIt();
          }
          boardsRemaining--;
        }
      }
    }

    // for (var c = 0; c < bingoBoards.length; c++) {
    //   console.log("--------------------");
    //   bingoBoards[c].printIt();
    // }

    turnNumber++;
    //no winner
  } while (winner < 0 && turnNumber <= bingoNumbers.length);

  //score the winers card
  let winningScore: number = bingoBoards[winner].scoreIt();

  const answer: number = winningScore * winningBall;
  console.log("-----------------------------------------");
  console.log(`answer: ${answer}`);
});
