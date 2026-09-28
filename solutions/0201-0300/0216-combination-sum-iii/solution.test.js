const test = require('node:test');
const assert = require('node:assert');
const { combinationSum3 } = require('./solution');

const norm = (res) => res.map((c) => c.join(',')).sort();

// Reference: every subset of {1..9} via bitmask.
function brute(k, n) {
  const out = [];
  for (let mask = 0; mask < 512; mask++) {
    const c = [];
    for (let d = 1; d <= 9; d++) if (mask & (1 << (d - 1))) c.push(d);
    if (c.length === k && c.reduce((a, b) => a + b, 0) === n) out.push(c);
  }
  return out;
}

test('official examples', () => {
  assert.deepStrictEqual(norm(combinationSum3(3, 7)), ['1,2,4']);
  assert.deepStrictEqual(norm(combinationSum3(3, 9)), ['1,2,6', '1,3,5', '2,3,4']);
  assert.deepStrictEqual(combinationSum3(4, 1), []);
});

test('matches bitmask enumeration for every k and n', () => {
  for (let k = 2; k <= 9; k++) for (let n = 1; n <= 60; n++) assert.deepStrictEqual(norm(combinationSum3(k, n)), norm(brute(k, n)), `k=${k} n=${n}`);
});
