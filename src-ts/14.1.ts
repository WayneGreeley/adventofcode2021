import { createReadStream } from "fs";
import { createInterface } from "readline";
import { join as pathjoin } from "path";

var filenPath1 = pathjoin(__dirname, "..", "text-assets", "14.1.mine.txt");
console.log(`filenPath1: ${filenPath1}`);
var reader1 = createInterface(createReadStream(filenPath1));

let mappings: Map<string, string> = new Map<string, string>();
let occurances: Map<string, number> = new Map<string, number>();

let start: string = "KFVHFSSVNCSNHCPCNPVO";
// let start: string = "NNCB";

reader1.on("line", (l: string) => {
  //console.log(`l: ${l} `);
  let tokens = l.split(" -> ");
  //making sure all map elements for final check are initialized
  occurances.set(tokens[0].charAt(0), 0);
  occurances.set(tokens[0].charAt(1), 0);
  occurances.set(tokens[1], 0);
  //set up insert chars
  mappings.set(
    tokens[0],
    tokens[0].charAt(0) + tokens[1]
    // tokens[0].charAt(0) + tokens[1] + tokens[0].charAt(1)
  );
});

const printMap = (myMap: Map<string, number>) => {
  let str = "";
  for (const [key, value] of myMap.entries()) {
    str += `(${key} = ${value}) `;
  }
  return str;
};

reader1.on("close", () => {
  console.log(`Data has been read ${mappings.size}`);
  console.log(mappings);
  //console.log(`nodes: ${nodes} `);
  // nodes.forEach((node) => {
  //   console.log(`node:  ${node} | ${isBigCave(node)}`);
  // });

  let str: string = start;
  for (let i = 0; i < 10; i++) {
    //step counter

    let groups: Array<string> = Array<string>();

    for (let j: number = 0; j < str.length - 1; j++) {
      //console.log(`${j} | ${str.substring(j, j + 2)}`);
      groups.push(mappings.get(str.substring(j, j + 2)));
    }

    str = groups.reduce((t, c) => t + c) + str.charAt(str.length - 1);
    //console.log(`groups reduced: ${str} | ${str.length}`);
  }

  let answer = str.length;

  for (let z = 0; z < str.length; z++) {
    occurances.set(str[z], occurances.get(str[z]) + 1);
  }

  console.log("-----------------------------------");
  console.log(occurances);

  let largest = 0;
  let smallest = Number.MAX_VALUE;

  for (const [key, value] of occurances.entries()) {
    if (value > largest) {
      largest = value;
    }
    if (value < smallest) {
      smallest = value;
    }
  }
  console.log("-----------------------------------");

  console.log(`answer: ${largest - smallest} `);

  // console.log("-----------------------------------");
  // cg.nodes.forEach((edges, node) => {
  //   console.log(`mg:  ${node} || ${edges.size} `);
  // });
});
