import { createReadStream } from "fs";
import { createInterface } from "readline";
import { join as pathjoin } from "path";

var filenPath1 = pathjoin(__dirname, "..", "text-assets", "9.1.mine.txt");
console.log(`filenPath1: ${filenPath1}`);
var reader1 = createInterface(createReadStream(filenPath1));

let inputs: Array<Array<string>> = [];

let rowNumber = 0;
let columnNumber = 0;
reader1.on("line", (l: string) => {
  //console.log(`l: ${l} `);

  inputs[rowNumber] = l.split("");
  rowNumber++;
  columnNumber = l.length;
});

const isValidNeighbor = (x: number, y: number) => {
  return x >= 0 && x < rowNumber && y >= 0 && y < columnNumber;
};

const adjacentN = (x: number, y: number) => {
  return isValidNeighbor(x - 1, y) ? parseInt(inputs[x - 1][y]) : 10;
};

const adjacentS = (x: number, y: number) => {
  return isValidNeighbor(x + 1, y) ? parseInt(inputs[x + 1][y]) : 10;
};

const adjacentE = (x: number, y: number) => {
  return isValidNeighbor(x, y + 1) ? parseInt(inputs[x][y + 1]) : 10;
};

const adjacentW = (x: number, y: number) => {
  return isValidNeighbor(x, y - 1) ? parseInt(inputs[x][y - 1]) : 10;
};

reader1.on("close", () => {
  console.log(`Data has been read ${inputs.length}`);
  // console.log(`inputs: ${inputs} `);
  console.log(`rows: ${rowNumber}  | columns: ${columnNumber}`);
  // for (let i = 0; i < inputs.length; i++) {
  //   console.log(`inputs: ${i} |  ${inputs[i]} `);
  // }

  let answer = 0;
  let lowPts: Array<string> = [];
  let mg: matrixGraph = new matrixGraph();

  //add non 9 nodes to graph and find low points
  for (let a = 0; a < rowNumber; a++) {
    for (let b = 0; b < columnNumber; b++) {
      let value = parseInt(inputs[a][b]);
      if (
        value < adjacentN(a, b) &&
        value < adjacentS(a, b) &&
        value < adjacentE(a, b) &&
        value < adjacentW(a, b)
      ) {
        console.log(`low point ${a} ${b} ${value}`);
        lowPts.push(a + "_" + b);
        answer += value + 1;
      }
      if (value != 9) {
        mg.addNode(a, b);
      }
    }
  }

  //add edges
  for (let a = 0; a < rowNumber; a++) {
    for (let b = 0; b < columnNumber; b++) {
      let value = parseInt(inputs[a][b]);
      if (value < 9) {
        //up
        if (isValidNeighbor(a - 1, b)) {
          if (parseInt(inputs[a - 1][b]) < 9) {
            //console.log(`adding N edge: ${a} ${b} | ${a - 1} ${b}`);
            mg.addEdge(a + "_" + b, a - 1 + "_" + b);
          }
        }
        //down
        if (isValidNeighbor(a + 1, b)) {
          if (parseInt(inputs[a + 1][b]) < 9) {
            mg.addEdge(a + "_" + b, a + 1 + "_" + b);
          }
        }
        //left
        if (isValidNeighbor(a, b - 1)) {
          if (parseInt(inputs[a][b - 1]) < 9) {
            mg.addEdge(a + "_" + b, a + "_" + (b - 1));
          }
        }
        //right
        if (isValidNeighbor(a, b + 1)) {
          if (parseInt(inputs[a][b + 1]) < 9) {
            mg.addEdge(a + "_" + b, a + "_" + (b + 1));
          }
        }
      }
    }
  }

  let lowPtSize: Array<number> = [];

  lowPts.forEach((lp) => {
    let tkns = lp.split("_");
    let someLp = mg.find(parseInt(tkns[0]), parseInt(tkns[1]));
    lowPtSize.push(mg.bfsCount(someLp));
  });

  console.log("-----------------------------------");
  console.log(`lowPtSize: ${lowPtSize} `);
  let max1 = Math.max(...lowPtSize);
  console.log(`max1:  ${max1}  | ${lowPtSize.indexOf(max1)}`);
  let lowPtSizeM1 = lowPtSize.splice(lowPtSize.indexOf(max1), 1);
  //console.log(`lowPtSizeM1: ${lowPtSize} `);
  let max2 = Math.max(...lowPtSize);
  console.log(`max2:  ${max2} `);
  let lowPtSizeM2 = lowPtSize.splice(lowPtSize.indexOf(max2), 1);
  //console.log(`lowPtSizeM2: ${lowPtSize} `);
  let max3 = Math.max(...lowPtSize);
  console.log(`max3:  ${max3} `);

  answer = max1 * max2 * max3;

  //answer is 3 largest values in lowPtSize multiplied together
  console.log("-----");
  console.log(`answer: ${answer} `);

  // var removed = members.splice(idx,1);
  // console.log("-----------------------------------");
  // mg.nodes.forEach((edges, node) => {
  //   console.log(`mg:  ${node} || ${edges.size} `);
  // });
});

class matrixGraph {
  nodes: Map<string, Set<string>>;

  constructor() {
    this.nodes = new Map();
  }

  addNode(x: number, y: number) {
    this.nodes.set(x + "_" + y, new Set());
  }

  addEdge(src: string, dest: string) {
    //both nodes need to exist
    if (this.nodes.has(src) && this.nodes.has(dest)) {
      this.nodes.get(src).add(dest);
      this.nodes.get(dest).add(src);
    }
  }

  find(x: number, y: number): string {
    let found: string = null;
    this.nodes.forEach((value, z) => {
      //z is node, value is edges
      if (z == x + "_" + y) {
        found = z;
      }
    });
    return found;
  }

  bfsCount(src: string): number {
    let queue = [src];
    let visited: Array<string> = [];
    let count = 0;

    while (queue.length) {
      let current = queue.shift();
      //console.log(`  curr: ${current}`);
      if (visited.includes(current)) {
        continue;
      } else {
        count++;
      }
      visited.push(current);
      //add edge neighbors to queue
      this.nodes.get(current).forEach((x) => {
        queue.push(x);
      });
    }
    return count;
  }
}
