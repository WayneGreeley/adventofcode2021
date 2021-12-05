//const point = require("./point");
class box {
  value: number;
  marked: boolean;

  constructor(num: number) {
    this.value = num;
    this.marked = false;
  }

  printBox(): string {
    if (this.marked) {
      return "(" + this.value + ")";
    }
    return "" + this.value;
  }
}

class bingoBoard {
  matrix: Array<Array<box>> = [];
  hasWon: boolean = false;

  constructor(arr: Array<number>) {
    for (var i = 0; i < 5; i++) {
      let tempArray: Array<box> = [];
      for (var j = 0; j < 5; j++) {
        tempArray.push(new box(arr.shift()));
      }
      this.matrix[i] = tempArray;
    }
  }

  printIt() {
    for (var i = 0; i < 5; i++) {
      console.log(
        `  ${this.matrix[i][0].printBox()}  ${this.matrix[
          i
        ][1].printBox()}  ${this.matrix[i][2].printBox()}  ${this.matrix[
          i
        ][3].printBox()}  ${this.matrix[i][4].printBox()}    `
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
      if (
        this.matrix[i][0].marked &&
        this.matrix[i][1].marked &&
        this.matrix[i][2].marked &&
        this.matrix[i][3].marked &&
        this.matrix[i][4].marked
      ) {
        this.hasWon = true;
      }
    }
    //check columns
    for (var j = 0; j < 5; j++) {
      if (
        this.matrix[0][j].marked &&
        this.matrix[1][j].marked &&
        this.matrix[2][j].marked &&
        this.matrix[3][j].marked &&
        this.matrix[4][j].marked
      ) {
        this.hasWon = true;
      }
    }
    return this.hasWon;
  }

  scoreIt(): number {
    let score: number = 0;
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        if (!this.matrix[i][j].marked) {
          score += this.matrix[i][j].value;
        }
      }
    }
    return score;
  }
}
module.exports = bingoBoard;
