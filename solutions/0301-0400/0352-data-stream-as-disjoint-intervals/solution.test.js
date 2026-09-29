const test = require('node:test');
const assert = require('node:assert');
const { SummaryRanges } = require('./solution');

function brute(values) {
  const s = [...new Set(values)].sort((a, b) => a - b);
  const res = [];
  for (const v of s) {
    if (res.length && res[res.length - 1][1] === v - 1) res[res.length - 1][1] = v;
    else res.push([v, v]);
  }
  return res;
}

test('official example', () => {
  const sr = new SummaryRanges();
  sr.addNum(1);
  assert.deepStrictEqual(sr.getIntervals(), [[1, 1]]);
  sr.addNum(3);
  assert.deepStrictEqual(sr.getIntervals(), [[1, 1], [3, 3]]);
  sr.addNum(7);
  assert.deepStrictEqual(sr.getIntervals(), [[1, 1], [3, 3], [7, 7]]);
  sr.addNum(2);
  assert.deepStrictEqual(sr.getIntervals(), [[1, 3], [7, 7]]);
  sr.addNum(6);
  assert.deepStrictEqual(sr.getIntervals(), [[1, 3], [6, 7]]);
});

test('matches sorting the distinct values', () => {
  for (let t = 0; t < 300; t++) {
    const sr = new SummaryRanges();
    const seen = [];
    for (let op = 0; op < 40; op++) {
      const v = Math.floor(Math.random() * 25);
      sr.addNum(v);
      seen.push(v);
      assert.deepStrictEqual(sr.getIntervals(), brute(seen));
    }
  }
});

test('returned intervals are copies', () => {
  const sr = new SummaryRanges();
  sr.addNum(5);
  sr.getIntervals()[0][1] = 99;
  assert.deepStrictEqual(sr.getIntervals(), [[5, 5]]);
});
