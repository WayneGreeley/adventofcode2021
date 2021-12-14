const evaluate = (str: string) => {
  return str === str.toUpperCase();
};

let str = "1 + 2 * 3 + 4 * 5 + 6";
console.log(str);
console.log(eval(str));

// const evl = (num:number, arr: Array<string>) => {
//   if(arr.length === 0){
//     return num;
//   }
//   let something = arr.pop()
// };

const evl = (arr: Array<string>) => {
  let answer = 0;
  for (let i = 0; i < arr.length; i++) {
    arr[i];
  }
};

const sumOneLiner = (arr: Array<string>) =>
  arr.reduce((total, current) => total + current);

let str1 = "1 + (2 * 3) + 4 * 5 + 6";
// str1.re
// let tokens1 = str1.split(" ").join();
//     const tokens = str1.split(" ").replaceAll(" ", "").split("");
console.log(str1.split(" ").join());
console.log(sumOneLiner(str1.split(" ")));
// console.log(evl(tokens1));

function operate(operator: string, valA: number, valB: number): number {
  // valA = parseFloat(valA);
  // valB = parseFloat(valB);

  switch (operator) {
    case "+":
      return valA + valB;
    // case '-': return valA - valB;
    case "*":
      return valA * valB;
    // case '/': return valA / valB;
  }
}

function operateExpr(
  operators: Array<string>,
  expr: Array<string>
): Array<string> {
  for (var i = 0, l = expr.length; i < l; i++) {
    if (operators.indexOf(expr[i]) > -1) {
      var evaluated = operate(
        expr[i],
        parseFloat(expr[i - 1]),
        parseFloat(expr[i + 1])
      );
      expr.splice(i - 1, 3, "" + evaluated);
      return operateExpr(operators, expr);
    }
  }
  return expr;
}

function evalExpr(expr: string) {
  let exp = expr.split(/\s+/);
  console.log(`exp: ${exp}`);
  // expr = operateExpr(['*', '/'], expr);
  // expr = operateExpr(['+', '-'], expr);
  let ex = operateExpr(["*", "+"], exp);
  return parseFloat(ex[0]);
}

console.log(evalExpr("13 + 12 * 8"));
console.log(evalExpr("1 + 2 * 8"));
console.log(evalExpr("1 + (2 * 8)"));
