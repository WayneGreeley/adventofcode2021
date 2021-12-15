import { createReadStream } from "fs";
import { createInterface } from "readline";
import { join as pathjoin } from "path";

var filenPath1 = pathjoin(__dirname, "..", "text-assets", "14.1.mine.txt");
console.log(`filenPath1: ${filenPath1}`);
var reader1 = createInterface(createReadStream(filenPath1));

let mappings: Map<string, string> = new Map<string, string>();
let groupOccurances: Map<string, number> = new Map<string, number>();
let letterOoccurances: Map<string, number> = new Map<string, number>();

let start: string = "KFVHFSSVNCSNHCPCNPVO";
let lastChar = "O";
// let start: string = "NNCB";
// let lastChar = "B";

reader1.on("line", (l: string) => {
  //console.log(`l: ${l} `);
  let tokens = l.split(" -> ");
  //making sure all map elements for final check are initialized
  letterOoccurances.set(tokens[0].charAt(0), 0);
  letterOoccurances.set(tokens[0].charAt(1), 0);
  letterOoccurances.set(tokens[1], 0);
  groupOccurances.set(tokens[0], 0);
  groupOccurances.set(tokens[0].charAt(0) + tokens[1], 0);
  groupOccurances.set(tokens[1] + tokens[0].charAt(1), 0);
  //set up insert chars
  mappings.set(
    tokens[0],
    tokens[1]
    // tokens[0].charAt(0) + tokens[1] + tokens[0].charAt(1)
  );
});

reader1.on("close", () => {
  console.log(`Data has been read ${mappings.size}`);
  // console.log(mappings);
  //console.log(`nodes: ${nodes} `);
  // nodes.forEach((node) => {
  //   console.log(`node:  ${node} | ${isBigCave(node)}`);
  // });

  //initial map load
  for (let j: number = 0; j < start.length - 1; j++) {
    let letterGroup = start.substring(j, j + 2);
    console.log(`inloop: ${j} | ${letterGroup}`);
    groupOccurances.set(letterGroup, groupOccurances.get(letterGroup) + 1);
  }

  let str: string = start;
  //step counter
  for (let i = 0; i < 40; i++) {
    let newGroups: Map<string, number> = new Map<string, number>();

    //NN removed => NC & CN added
    for (const [key, value] of groupOccurances.entries()) {
      let inject = mappings.get(key);
      let front = key.charAt(0) + inject;
      let back = inject + key.charAt(1);
      // console.log(
      //   `groupOccurances: ${key} | ${value} | inject: ${inject} => ${front} ${back}`
      // );
      if (newGroups.has(front)) {
        newGroups.set(front, newGroups.get(front) + value);
      } else {
        newGroups.set(front, value);
      }
      if (newGroups.has(back)) {
        newGroups.set(back, newGroups.get(back) + value);
      } else {
        newGroups.set(back, value);
      }
    }
    groupOccurances = newGroups;
    // console.log(`--hello--`);
    // console.log(groupOccurances);
  }

  for (const [key, value] of groupOccurances.entries()) {
    let letter = key.charAt(0);
    if (letterOoccurances.has(letter)) {
      letterOoccurances.set(letter, letterOoccurances.get(letter) + value);
    } else {
      letterOoccurances.set(letter, value);
    }
  }
  letterOoccurances.set(lastChar, letterOoccurances.get(lastChar) + 1);

  console.log("-----------------------------------");
  console.log(letterOoccurances);

  let largest = 0;
  let smallest = Number.MAX_VALUE;

  for (const [key, value] of letterOoccurances.entries()) {
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
