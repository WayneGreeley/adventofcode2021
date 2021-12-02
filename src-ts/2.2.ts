import * as fs from 'fs';
import * as rd from 'readline'
import * as path from 'path'

var filenPath = path.join(__dirname, '..', 'text-assets', '2.1.mine.txt');
console.log(`filenPath: ${filenPath}`);
var reader = rd.createInterface(fs.createReadStream(filenPath))

var data: Array<{direction: string, value: number}> = [];

reader.on("line", (l: string) => {
    const tokens = l.split(' ');
    const direction = tokens[0];
    const value = parseInt(tokens[1]);
    data.push({direction, value});
})
console.log(`Will be empty data has not yet been read ${data.length}` );

reader.on("close", ()=> {
    console.log(`Data has been read ${data.length}` );
    
    var aim: number = 0;
    var horizontal: number = 0;
    var depth: number = 0;
    
    for (var i: number = 0; i < data.length; i++) {

        switch (data[i].direction) {
            case "forward":
                horizontal = horizontal + data[i].value;
                depth = depth + (aim * data[i].value);
                break;
            case "up":
                aim = aim - data[i].value;
                break;
            case "down":
                aim = aim + data[i].value;
                break;
            default:
                console.log(`BROKEN COMMAND!  ${data[i].direction} `);
                break;
        }
    }
    console.log(`horizontal: ${horizontal}  depth: ${depth}  answer: ${horizontal * depth} `)
})