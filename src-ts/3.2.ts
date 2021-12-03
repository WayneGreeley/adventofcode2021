import * as fs from 'fs';
import * as rd from 'readline'
import * as path from 'path'
const binaryArrayToNumber = require('./utils/binaryArrayToNumber');

let binNum = new binaryArrayToNumber();

var filenPath = path.join(__dirname, '..', 'text-assets', '3.1.mine.txt');
console.log(`filenPath: ${filenPath}`);
var reader = rd.createInterface(fs.createReadStream(filenPath))

var data: Array<{tokens: string[]}> = [];
// const binLength: number = 5;
const binLength: number = 12;

reader.on("line", (l: string) => {
    const tokens = l.split('');
    data.push({tokens});
})
console.log(`Will be empty data has not yet been read ${data.length}` );

reader.on("close", ()=> {
    console.log(`Data has been read ${data.length}` );
    
    let a: number = 0;
    let oxygen = data;
    do {
        
        let MyMap = new Map<number, number>([
          [0, 0],
          [1, 0]
        ]);
        
        for (var b: number = 0; b < oxygen.length; b++) {
            let bit:number = parseInt(oxygen[b].tokens[a])
            MyMap.set(bit, (MyMap.get(bit) + 1));
        }
        
        //If 0 and 1 are equally common, keep values with a 1 
        const mostCommon: number = (MyMap.get(0) > MyMap.get(1) ? 0 : 1)
        
        
        // console.log(`Block statement execution no: ${a}  oxygen.length: ${oxygen.length}   mostCommon: ${mostCommon} ` )
        // console.log(`MyMap : ${MyMap.get(0)}   ${MyMap.get(1)} ` )
        
        if(oxygen.length > 1){
            oxygen = oxygen.filter( x => (parseInt(x.tokens[a]) == mostCommon));
        }
        // console.log(oxygen); 
        
        a++;
    } while ( a < binLength && oxygen.length > 1)



    let c: number = 0;
    let carbon = data;
    do {
        
        let MyMap = new Map<number, number>([
          [0, 0],
          [1, 0]
        ]);
        
        for (var d: number = 0; d < carbon.length; d++) {
            let bit:number = parseInt(carbon[d].tokens[c])
            MyMap.set(bit, (MyMap.get(bit) + 1));
        }
        
        //If 0 and 1 are equally common, keep values with a 0
        const lessCommon: number = (MyMap.get(1) < MyMap.get(0) ? 1 : 0)
        
        
        // console.log(`Block statement execution no: ${c}  carbon.length: ${carbon.length}   lessCommon: ${lessCommon} ` )
        // console.log(`MyMap : ${MyMap.get(0)}   ${MyMap.get(1)} ` )
        
        if(carbon.length > 1){
            carbon = carbon.filter( x => (parseInt(x.tokens[c]) == lessCommon));
        }
        // console.log(carbon); 
        
        c++;
    } while ( c < binLength && carbon.length > 1)

    console.log(`oxygen[0].tokens ${oxygen[0].tokens}`)
    console.log(`carbon[0].tokens ${carbon[0].tokens}`)
    
    const answer:number = binNum.convertIt(oxygen[0].tokens) * binNum.convertIt(carbon[0].tokens)
    console.log(`answer: ${answer}`)
    
})
