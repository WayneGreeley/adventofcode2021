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

  cg.printAllPaths("start", "end");
  console.log(`answer: ${cg.count} `);

  // console.log("-----------------------------------");
  // cg.nodes.forEach((edges, node) => {
  //   console.log(`mg:  ${node} || ${edges.size} `);
  // });
});

class caveGraph {
  nodes: Map<string, Set<string>>;
  count: number;

  constructor() {
    this.nodes = new Map();
    this.count = 0;
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

  // Prints all paths from 's' to 'd'
  printAllPaths(s: string, d: string) {
    let isVisited = new Map<string, number>();
    this.nodes.forEach((value, z) => {
      //z is node, value is edges
      isVisited.set(z, 0);
    });

    this.count = 0;

    let pathList = [];

    // add source to path[]
    pathList.push(s);

    // Call recursive utility
    this.printAllPathsUtil(s, d, isVisited, pathList);
  }

  printAllPathsUtil(
    u: string,
    d: string,
    isVisited: Map<string, number>,
    localPathList: Array<string>
  ) {
    // console.log(
    //   `printAllPathsUtil : ${u} ${d} ${printMap(isVisited)} ${localPathList}`
    // );

    if (u == d) {
      console.log(`validpath || localPathList : ${localPathList}`);
      // if match found then no need to
      // traverse more till depth
      this.count++;
      return;
    }

    // Mark the current node
    isVisited.set(u, isVisited.get(u) + 1);
    // console.log(`isVisited set` + printMap(isVisited));

    let queue: Array<string> = [];
    //add edge neighbors to queue
    this.nodes.get(u).forEach((x) => {
      queue.push(x);
    });
    //console.log(`queue set:  ${queue} `);

    for (let i = 0; i < queue.length; i++) {
      //small caves visited once, big caves visited any number of time
      if (isVisited.get(queue[i]) === 0 || isBigCave(queue[i])) {
        // store current node in path[]
        localPathList.push(queue[i]);
        //do recursion
        this.printAllPathsUtil(queue[i], d, isVisited, localPathList);
        // remove current node in path[]
        localPathList.splice(localPathList.indexOf(queue[i]), 1);
      }
    }

    // Mark the current node
    isVisited.set(u, 0);
  }
}
