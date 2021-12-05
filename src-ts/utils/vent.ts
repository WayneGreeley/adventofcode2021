const dim = 1000;
class vent {
  matrix: Array<Array<number>> = [];
  highestValue: number = 0;

  constructor() {
    for (var i = 0; i < dim; i++) {
      let tempArray: Array<number> = [];
      for (var j = 0; j < dim; j++) {
        tempArray.push(0);
      }
      this.matrix[i] = tempArray;
    }
  }

  printIt() {
    for (var i = 0; i < dim; i++) {
      let me: string = "";
      for (var j = 0; j < dim; j++) {
        me = me + " " + this.matrix[i][j];
      }
      console.log(me);
    }
  }

  markIt(aLine: line, flatLines: boolean) {
    //console.log(`markIt: ${aLine.start.x} ${aLine.start.y} ${aLine.end.x} ${aLine.end.y}    ` );
    let startX = 0;
    let endX = 0;
    let startY = 0;
    let endY = 0;

    if (aLine.start.x <= aLine.end.x) {
      startX = aLine.start.x;
      endX = aLine.end.x;
    } else {
      startX = aLine.end.x;
      endX = aLine.start.x;
    }

    if (aLine.start.y <= aLine.end.y) {
      startY = aLine.start.y;
      endY = aLine.end.y;
    } else {
      startY = aLine.end.y;
      endY = aLine.start.y;
    }

    if (startX == endX || startY == endY) {
      //only consider horizontal and vertical lines: lines where either x1 = x2 or y1 = y2
      for (let i = startX; i <= endX; i++) {
        for (let j = startY; j <= endY; j++) {
          //console.log(`markIt now: ${i} ${j} ${this.matrix[i][j]}  `);

          this.matrix[i][j]++;
          if (this.matrix[i][j] > this.highestValue) {
            this.highestValue = this.matrix[i][j];
          }
        }
      }
    } else {
      //digonal lines
      if (!flatLines) {
        let moves = endX - startX;
        let slopeX = aLine.start.x <= aLine.end.x ? 1 : -1;
        let slopeY = aLine.start.y <= aLine.end.y ? 1 : -1;

        // console.log(`markIt sloped: ${slopeX} ${slopeY}  `);

        for (let k = 0; k <= moves; k++) {
          // console.log(
          //   `markIt sloped line: ${aLine.start.x + k * slopeX} ${
          //     aLine.start.y + k * slopeY
          //   }  `
          // );
          this.matrix[aLine.start.x + k * slopeX][aLine.start.y + k * slopeY]++;
        }
      }
    }
  }

  scoreIt(): number {
    let score: number = 0;
    for (var i = 0; i < dim; i++) {
      for (var j = 0; j < dim; j++) {
        // if (this.matrix[i][j] == this.highestValue) {
        //   score++;
        // }
        if (this.matrix[i][j] > 1) {
          score++;
        }
      }
    }
    return score;
  }
}
module.exports = vent;
