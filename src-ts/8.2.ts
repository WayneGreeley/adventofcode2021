import { createReadStream } from "fs";
import { createInterface } from "readline";
import { join as pathjoin } from "path";

var filenPath1 = pathjoin(__dirname, "..", "text-assets", "8.1.mine.txt");
console.log(`filenPath1: ${filenPath1}`);
var reader1 = createInterface(createReadStream(filenPath1));

let inputs: Array<Array<string>> = [];
let outputs: Array<Array<string>> = [];

reader1.on("line", (l: string) => {
  //console.log(`l: ${l} `);
  const tokens = l.split(" | ");

  inputs.push(tokens[0].split(" "));
  outputs.push(tokens[1].split(" "));
});

reader1.on("close", () => {
  console.log(`Data has been read ${outputs.length}`);
  //console.log(`outputs: ${outputs} `);

  let answer = 0;

  //DEDUCTION

  // length(2) = 1
  // length(3) = 7
  // length(4) = 4
  // length(5) = 2,3,5
  // length(6) = 0,6,9
  // length(7) = 8

  //if length(5) contains all of 1 = 3
  //if length(6) contains all of 3 = 9
  //letter missing from 8 in 9 = bottomLeft
  //length(5) containing bottomLeft = 2
  //length(5) not 2 or 3 = 5
  //if length(6) contains all of 5 = 6
  //length(6) not 6 or 9 = 0

  for (let i = 0; i < outputs.length; i++) {
    // for (let i = 0; i < 1; i++) {
    //just do first one
    // var isEvery = arr.every(item => str.includes(item));

    let allWords = inputs[i].concat(outputs[i]);

    const map1 = new Map();

    //first find the easy ones
    //digits 1, 4, 7, or 8
    let easyWordsRemoved: Array<string> = [];
    allWords.forEach((word) => {
      // console.log(`      word: ${word} `);

      switch (word.length) {
        case 2: //word = 1
          map1.set(1, word.split("").sort());
          break;
        case 3: //word = 7
          map1.set(7, word.split("").sort());
          break;
        case 4: //word = 4
          map1.set(4, word.split("").sort());
          break;
        case 7: //word = 8
          map1.set(8, word.split("").sort());
          break;
        default:
          // not a 1, 4, 7 or 8
          easyWordsRemoved.push(word);
          break;
      }
    });

    //find 3
    //if length(5) contains all of 1 = 3
    let threeRemoved: Array<string> = [];
    easyWordsRemoved.forEach((word) => {
      //console.log(`map1.get(1): ${map1.get(1)}`);
      if (word.length === 5) {
        let isEvery = map1
          .get(1)
          .every((item: string) => word.split("").includes(item));
        //console.log(`word.split(""): ${word.split("")}  isEvery: ${isEvery}`);
        if (isEvery) {
          map1.set(3, word.split("").sort());
        } else {
          threeRemoved.push(word);
        }
      } else {
        threeRemoved.push(word);
      }
    });

    //find 9
    //if length(6) contains all of 3 = 9
    let nineRemoved: Array<string> = [];
    threeRemoved.forEach((word) => {
      //console.log(`map1.get(1): ${map1.get(1)}`);
      if (word.length === 6) {
        let isEvery = map1
          .get(3)
          .every((item: string) => word.split("").includes(item));
        //console.log(`word.split(""): ${word.split("")}  isEvery: ${isEvery}`);
        if (isEvery) {
          map1.set(9, word.split("").sort());
        } else {
          nineRemoved.push(word);
        }
      } else {
        nineRemoved.push(word);
      }
    });

    //const diff = bigArray.filter(item => smallArray.indexOf(item) < 0);
    //letter missing from 8 in 9 = bottomLeft
    let botL: string = map1
      .get(8)
      .filter((letter: string) => map1.get(9).indexOf(letter) < 0);

    //find 2
    //if length(5) containing bottomLeft = 2
    let twoRemoved: Array<string> = [];
    nineRemoved.forEach((word) => {
      if (word.length === 5) {
        // console.log(
        //   `word.split(""): ${word.split("")} |${botL}| ${word.includes(botL)}`
        // );
        if (word.includes(botL)) {
          map1.set(2, word.split("").sort());
        } else {
          twoRemoved.push(word);
        }
      } else {
        twoRemoved.push(word);
      }
    });

    //find 5
    //length(5) not 2 or 3 = 5
    let fiveRemoved: Array<string> = [];
    twoRemoved.forEach((word) => {
      //console.log(`map1.get(1): ${map1.get(1)}`);
      if (word.length === 5) {
        let isEvery2 = map1
          .get(2)
          .every((item: string) => word.split("").includes(item));
        let isEvery3 = map1
          .get(3)
          .every((item: string) => word.split("").includes(item));
        //console.log(`word.split(""): ${word.split("")}  isEvery: ${isEvery}`);
        if (!isEvery2 && !isEvery3) {
          map1.set(5, word.split("").sort());
        } else {
          fiveRemoved.push(word);
        }
      } else {
        fiveRemoved.push(word);
      }
    });

    //find 6
    //if length(6) contains all of 5 = 6
    let sixRemoved: Array<string> = [];
    fiveRemoved.forEach((word) => {
      //console.log(`map1.get(1): ${map1.get(1)}`);
      if (word.length === 6) {
        let isEvery = map1
          .get(5)
          .every((item: string) => word.split("").includes(item));
        //console.log(`word.split(""): ${word.split("")}  isEvery: ${isEvery}`);
        if (isEvery) {
          map1.set(6, word.split("").sort());
        } else {
          sixRemoved.push(word);
        }
      } else {
        sixRemoved.push(word);
      }
    });

    // find 0
    //length(6) not 6 or 9 = 0
    allWords.forEach((word) => {
      //console.log(`map1.get(1): ${map1.get(1)}`);
      if (word.length === 6) {
        let isEvery6 = map1
          .get(6)
          .every((item: string) => word.split("").includes(item));
        let isEvery9 = map1
          .get(9)
          .every((item: string) => word.split("").includes(item));
        //console.log(`word.split(""): ${word.split("")}  isEvery: ${isEvery}`);
        if (!isEvery6 && !isEvery9) {
          map1.set(0, word.split("").sort());
        }
      }
    });

    // console.log(`input: ${inputs[0]} `);
    // console.log(`outputs: ${outputs[0]} `);
    // console.log(`allWords: ${allWords} `);
    // console.log(`allWords length: ${allWords.length} `);

    const map2 = new Map();
    for (const [key, value] of map1) {
      // console.log(key + " = " + value);
      map2.set(value.join(""), "" + key);
    }
    // for (const [key, value] of map2) {
    //   console.log(key + " = " + value);
    // }

    // console.log("-----");
    let strOutput = "";
    outputs[i].forEach((num) => {
      let decodedKey = num.split("").sort().join("");
      strOutput += map2.get(decodedKey);
      // console.log(`${decodedKey} | ${map2.get(decodedKey)} `);
    });
    // console.log(strOutput);
    answer += parseInt(strOutput);

    //VERIFIED 1,4,7,8 in all
    // if (!map1.has(1)) {
    //   console.log(`i: ${i} no 1 : ${allWords} `);
    // }
    // if (!map1.has(4)) {
    //   console.log(`i: ${i} no 4 : ${allWords} `);
    // }
    // if (!map1.has(7)) {
    //   console.log(`i: ${i} no 7 : ${allWords} `);
    // }
    // if (!map1.has(8)) {
    //   console.log(`i: ${i} no 8 : ${allWords} `);
    // }
  }

  console.log("-----");
  console.log(`answer: ${answer} `);
});
