import * as fs from "fs";
import * as rd from "readline";
import * as path from "path";
import line from "./utils/line";
const vent = require("./utils/vent");

var filenPath1 = path.join(__dirname, "..", "text-assets", "5.1.mine.txt");
console.log(`filenPath1: ${filenPath1}`);
var reader1 = rd.createInterface(fs.createReadStream(filenPath1));

var lines: Array<line> = [];

reader1.on("line", (l: string) => {
  //console.log(`l: ${l} `);
  let myLine: line = new line(l);
  lines.push(myLine);
});

reader1.on("close", () => {
  console.log(`Data has been read ${lines.length}`);

  let aVent = new vent();

  for (let i = 0; i < lines.length; i++) {
    //lines[i].printLn();
    //lines[i].printLn();
    //only consider horizontal and vertical lines: lines where either x1 = x2 or y1 = y2
    aVent.markIt(lines[i], false);
  }

  //aVent.printIt();
  console.log(aVent.scoreIt());
});
