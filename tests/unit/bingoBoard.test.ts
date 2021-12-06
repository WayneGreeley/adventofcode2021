const bingoBoard = require("../../src-ts/utils/bingoBoard");

test("adds 1 + 2 to equal 3", () => {
  let numbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];
  let bb = new bingoBoard(numbers);
  //bb.printIt();
  expect(1 + 2).toBe(3);
});

test("adds 1 + 3 to equal 4", () => {
  let numbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];
  let bb = new bingoBoard(numbers);
  bb.markIt(3);
  //bb.printIt();
  expect(1 + 3).toBe(4);
});

test("not a bingo", () => {
  let numbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];
  let bb = new bingoBoard(numbers);
  bb.markIt(3);
  //bb.printIt();
  expect(bb.checkIt()).toBe(false);
});

test("row bingo", () => {
  let numbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];
  let bb = new bingoBoard(numbers);
  bb.markIt(1);
  bb.markIt(2);
  bb.markIt(3);
  bb.markIt(4);
  bb.markIt(5);
  //bb.printIt();
  expect(bb.checkIt()).toBe(true);
});

test("column bingo", () => {
  let numbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];
  let bb = new bingoBoard(numbers);
  bb.markIt(1);
  bb.markIt(6);
  bb.markIt(11);
  bb.markIt(16);
  bb.markIt(21);
  //bb.printIt();
  expect(bb.checkIt()).toBe(true);
});

//sum 1 to 25 = 325
test("score empty board", () => {
  let numbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];
  let bb = new bingoBoard(numbers);
  expect(bb.scoreIt()).toBe(325);
});

test("score non empty board", () => {
  let numbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];
  let bb = new bingoBoard(numbers);
  bb.markIt(25);
  expect(bb.scoreIt()).toBe(300);
});
