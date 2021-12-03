
class binaryArrayToNumber {
    convertIt(tokens: Array<number>) {
        var binaryFactor: number = 1;
        var returnValue: number = 0;
        for (var i = tokens.length - 1; i>=0 ; i--){
            returnValue += tokens[i] * binaryFactor;
            binaryFactor *= 2;
        }
      return returnValue;
    }
    //module.exports = binaryArrayToNumber;
}
module.exports = binaryArrayToNumber;
//export binaryArrayToNumber;