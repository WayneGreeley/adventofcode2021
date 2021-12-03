const binaryArrayToNumber = require('../../src-ts/utils/binaryArrayToNumber');


let binNum = new binaryArrayToNumber();

test('[0] to equal 0', () => {
  expect(binNum.convertIt([0])).toBe(0);
});

test('[1] to equal 1', () => {
  expect(binNum.convertIt([1])).toBe(1);
});

test('[0,1] to equal 1', () => {
  expect(binNum.convertIt([0,1])).toBe(1);
});

test('[1,0] to equal 21', () => {
  expect(binNum.convertIt([1,0])).toBe(2);
});

test('[1,1] to equal 3', () => {
  expect(binNum.convertIt([1,1])).toBe(3);
});

test('[1,0,0] to equal 4', () => {
  expect(binNum.convertIt([1,0,0])).toBe(4);
});

test('[0,0,1,1,1,1,0,0,1,0,0,0] to equal 968', () => {
  expect(binNum.convertIt([0,0,1,1,1,1,0,0,1,0,0,0])).toBe(968);
});
