import * as fs from 'fs';
import * as rd from 'readline'
import * as path from 'path'

var filenPath = path.join(__dirname, '..', 'text-assets', '1.1.mine.txt');
console.log(`filenPath: ${filenPath}`);
var reader = rd.createInterface(fs.createReadStream(filenPath))

var data: Array<{value: number}> = [];

reader.on("line", (l: string) => {
    const value = parseInt(l);
    data.push({value});
})
console.log(`Will be empty data has not yet been read ${data.length}` );

reader.on("close", ()=> {
    console.log(`Data has been read ${data.length}` );
    
    var increasing: number = 0;
    for (var i: number = 3; i < data.length; i++) {
        // console.log(`i: ${i}   data[i]: ${data[i].value}`)
        if ((data[i].value + data[i-1].value + data[i-2].value) > (data[i-1].value + data[i-2].value + data[i-3].value)) {
            increasing++;
        }
    }
    console.log(`number of increases: ${increasing} `)
})