const bingoBoard = require("../../src-ts/utils/bingoBoard");

test("adds 1 + 2 to equal 3", () => {
  let numbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];
  let bb = new bingoBoard(numbers);
  bb.printIt();
  expect(1 + 2).toBe(3);
});

test("adds 1 + 3 to equal 4", () => {
  let numbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];
  let bb = new bingoBoard(numbers);
  bb.markIt(3);
  bb.printIt();
  expect(1 + 3).toBe(4);
});
