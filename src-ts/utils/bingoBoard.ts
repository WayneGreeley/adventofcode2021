//const point = require("./point");
class point {
  value: number;
  marked: boolean;

  constructor(num: number) {
    this.value = num;
    this.marked = false;
  }

  printPt(): string {
    if (this.marked) {
      return "(" + this.value + ")";
    }
    return "" + this.value;
  }
}

class bingoBoard {
  //TODO mark card method
  //TODO check for bingo method

  matrix: Array<Array<point>> = [];

  constructor(arr: Array<number>) {
    for (var i = 0; i < 5; i++) {
      let tempArray: Array<point> = [];
      for (var j = 0; j < 5; j++) {
        tempArray.push(new point(arr.shift()));
      }
      this.matrix[i] = tempArray;
    }
  }

  printIt() {
    for (var i = 0; i < 5; i++) {
      console.log(
        `  ${this.matrix[i][0].printPt()}  ${this.matrix[
          i
        ][1].printPt()}  ${this.matrix[i][2].printPt()}  ${this.matrix[
          i
        ][3].printPt()}  ${this.matrix[i][4].printPt()}    `
      );
    }
  }

  markIt(ball: number) {
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        if (this.matrix[i][j].value == ball) {
          this.matrix[i][j].marked = true;
        }
      }
    }
  }

  checkIt(): boolean {
    let bingoFound = false;
    //check rows
    for (var i = 0; i < 5; i++) {
      if (this.matrix[i][j].marked) {
        this.matrix[i][j].marked = true;
      }
    }
    //check columns
    for (var j = 0; j < 5; j++) {
      if (this.matrix[i][j].marked) {
        this.matrix[i][j].marked = true;
      }
    }
    return bingoFound;
  }
}
module.exports = bingoBoard;
