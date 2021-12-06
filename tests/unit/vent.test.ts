const vent = require("../../src-ts/utils/vent");
const line = require("../../src-ts/utils/line");

test("adds 1 + 3 to equal 4", () => {
  let vnt = new vent();
  let l = "0,1 -> 0,2";
  let aln = new line(l);
  aln.printLn();
  vnt.markIt(aln);
  vnt.markIt(aln, true);
  //vnt.printIt();
  expect(vnt.scoreIt()).toBe(2);
});
