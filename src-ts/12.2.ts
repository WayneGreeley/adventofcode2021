import { createReadStream } from "fs";
import { createInterface } from "readline";
import { join as pathjoin } from "path";

var filenPath1 = pathjoin(__dirname, "..", "text-assets", "12.1.mine.txt");
console.log(`filenPath1: ${filenPath1}`);
var reader1 = createInterface(createReadStream(filenPath1));

let nodes: Set<string> = new Set<string>();
let edges: Array<string> = [];

reader1.on("line", (l: string) => {
  //console.log(`l: ${l} `);
  edges.push(l);
  let tokens = l.split("-");
  nodes.add(tokens[0]);
  nodes.add(tokens[1]);
});

const isBigCave = (str: string) => {
  return str === str.toUpperCase();
};

const printMap = (myMap: Map<string, number>) => {
  let str = "";
  for (const [key, value] of myMap.entries()) {
    str += `(${key} = ${value}) `;
  }
  return str;
};

reader1.on("close", () => {
  console.log(`Data has been read ${edges.length}`);
  console.log(`edges: ${edges} `);
  //console.log(`nodes: ${nodes} `);
  // nodes.forEach((node) => {
  //   console.log(`node:  ${node} | ${isBigCave(node)}`);
  // });

  let answer = 0;
  let cg: caveGraph = new caveGraph();

  //add nodes
  nodes.forEach((node) => {
    cg.addNode(node);
  });

  //add edges
  edges.forEach((edge) => {
    let tkns = edge.split("-");
    cg.addEdge(tkns[0], tkns[1]);
  });

  console.log("-----------------------------------");

  console.log(`answer: ${cg.getPossiblePaths(true)} `);
  // console.log("-----------------------------------");
  // cg.nodes.forEach((edges, node) => {
  //   console.log(`mg:  ${node} || ${edges.size} `);
  // });
});

class caveGraph {
  nodes: Map<string, Set<string>>;
  count: number;
  results: Set<string>;

  constructor() {
    this.nodes = new Map();
    this.count = 0;
    this.results = new Set<string>();
  }

  addNode(x: string) {
    this.nodes.set(x, new Set());
  }

  addEdge(src: string, dest: string) {
    //both nodes need to exist
    if (this.nodes.has(src) && this.nodes.has(dest)) {
      this.nodes.get(src).add(dest);
      this.nodes.get(dest).add(src);
    } else {
      console.error(`BAD EDGE ${src} | ${dest}`);
    }
  }

  find(x: string): string {
    let found: string = null;
    this.nodes.forEach((value, z) => {
      //z is node, value is edges
      if (z == x) {
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

  getPossiblePaths(allowVisitTwice: boolean): number {
    const finishedPaths = new Set<string>();
    const unfinishedPaths: {
      path: string;
      pos: string;
      visitedTwice: boolean;
    }[] = [{ path: "start", pos: "start", visitedTwice: false }];

    while (unfinishedPaths.length > 0) {
      //console.log(unfinishedPaths);
      const curr = unfinishedPaths.pop()!;
      const options = this.nodes.get(curr?.pos);

      //console.log(options);
      //options.delete("start");
      //console.log(`curr: ${curr} | options: ${options}`);
      for (const option of options) {
        if (option != "start") {
          if (option === "end") {
            finishedPaths.add(curr.path + ",end");
          } else if (!isBigCave(option)) {
            if (!curr.path.includes(option)) {
              unfinishedPaths.push({
                path: curr.path + "," + option,
                pos: option,
                visitedTwice: curr.visitedTwice,
              });
            }
            if (!curr.visitedTwice && allowVisitTwice) {
              unfinishedPaths.push({
                path: curr.path + "," + option,
                pos: option,
                visitedTwice: true,
              });
            }
          } else {
            unfinishedPaths.push({
              path: curr.path + "," + option,
              pos: option,
              visitedTwice: curr.visitedTwice,
            });
          }
        }
      }
    }

    // finishedPaths.forEach((x) => {
    //   console.log(x);
    // });

    return finishedPaths.size;
  }
}
