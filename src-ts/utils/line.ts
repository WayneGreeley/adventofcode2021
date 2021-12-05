//const point = require("./point");
class point {
  x: number;
  y: number;

  constructor(numx: number, numy: number) {
    this.x = numx;
    this.y = numy;
  }

  printPt(): string {
    return "(" + this.x + "," + this.y + ")";
  }
}

class line {
  start: point;
  end: point;

  //0,9 -> 5,9
  constructor(l: string) {
    const first = l.split(" -> ");
    const second = first[0].split(",");
    const third = first[1].split(",");
    this.start = new point(parseInt(second[0]), parseInt(second[1]));
    this.end = new point(parseInt(third[0]), parseInt(third[1]));
  }

  printLn() {
    console.log("[" + this.start.printPt() + " -> " + this.end.printPt() + "]");
  }
}
module.exports = line;
