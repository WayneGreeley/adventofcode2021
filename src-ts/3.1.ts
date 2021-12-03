import * as fs from 'fs';
import * as rd from 'readline'
import * as path from 'path'
const binaryArrayToNumber = require('./utils/binaryArrayToNumber');

let binNum = new binaryArrayToNumber();

var filenPath = path.join(__dirname, '..', 'text-assets', '3.1.mine.txt');
console.log(`filenPath: ${filenPath}`);
var reader = rd.createInterface(fs.createReadStream(filenPath))

var data: Array<{tokens: string[]}> = [];
const binLength: number = 12;
var gamma: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
var epsilon: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
var sum: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];

reader.on("line", (l: string) => {
    const tokens = l.split('');
    data.push({tokens});
})
console.log(`Will be empty data has not yet been read ${data.length}` );

reader.on("close", ()=> {
    console.log(`Data has been read ${data.length}` );
    
    for (var i: number = 0; i < data.length; i++) {
        for (var j: number = 0; j < binLength; j++) {
            sum[j] += parseInt(data[i].tokens[j]);
        }
    }
    console.log(`sum []:  ${sum} `)
    
    const middle: number = data.length / 2;
    console.log(`middle: ${middle}`)
    
    for (var k: number = 0; k < sum.length; k++) {
        if(sum[k] == middle){
            console.log(`What do I do here: ${k}`);
        }else if(sum[k] > middle){
            gamma[k] = 1;
            epsilon[k] = 0;
        }else{
            gamma[k] = 0;
            epsilon[k] = 1;
        }
    }
    console.log(`gamma:  ${gamma} ~ ${binNum.convertIt(gamma)}`)
    console.log(`epsilon:  ${epsilon} ~ ${binNum.convertIt(epsilon)}`)
    const answer:number = binNum.convertIt(gamma) * binNum.convertIt(epsilon)
    console.log(`answer: ${answer}`)
})
