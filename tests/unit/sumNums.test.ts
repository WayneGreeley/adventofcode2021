const sumNums = require('../../src-ts/utils/sumNums');

test('adds 1 + 2 to equal 3', () => {
  expect(sumNums(1, 2)).toBe(3);
});

test('adds 0 + 0 to equal 0', () => {
  expect(sumNums(0, 0)).toBe(0);
});

test('adds -1 + -2 to equal -3', () => {
  expect(sumNums(-1, -2)).toBe(-3);
});

test('adds -1 + 2 to equal 1', () => {
  expect(sumNums(-1, 2)).toBe(1);
});

test('adds 0 + 2 to equal 2', () => {
  expect(sumNums(0, 2)).toBe(2);
});