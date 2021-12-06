function permuteString(str: string) {
  permute(str, 0, str.length - 1);
}

function permute(str: string, a: number, b: number) {
  if (a === b) {
    console.log(str);
  } else {
    for (let i = a; i <= b; i++) {
      str = swapStr(str, a, i);
      permute(str, a + 1, b);
      str = swapStr(str, a, i);
    }
  }
}

function swapStr(str: string, a: number, b: number): string {
  let temp = null;
  let charArr = str.split("");
  temp = charArr[a];
  charArr[a] = charArr[b];
  charArr[b] = temp;
  return charArr.join("");
}

permuteString("aba");
console.log("-----------------------------------------------");

let strArr: Array<string> = [];

function permuteUnique(str: string, answer: string) {
  if (str.length === 0) {
    if (!strArr.includes(answer)) {
      strArr.push(answer);
    }
  } else {
    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      let l = str.substr(0, i);
      let r = str.substr(i + 1);
      let rest = l + r;
      permuteUnique(rest, answer + char);
    }
  }
}

permuteUnique("abba", "");
console.log(strArr);
