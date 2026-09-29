const test = require('node:test');
const assert = require('node:assert');
const { selfDividingNumbers } = require('./solution');

function brute(left, right) {
  const out = [];
  for (let x = left; x <= right; x++) {
    if (String(x).split('').every((c) => c !== '0' && x % Number(c) === 0)) out.push(x);
  }
  return out;
}

test('official examples', () => {
  assert.deepStrictEqual(selfDividingNumbers(1, 22), [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22]);
  assert.deepStrictEqual(selfDividingNumbers(47, 85), [48, 55, 66, 77]);
});

test('edge cases', () => {
  assert.deepStrictEqual(selfDividingNumbers(10, 10), []);
  assert.deepStrictEqual(selfDividingNumbers(10000, 10000), []);
  assert.deepStrictEqual(selfDividingNumbers(9999, 9999), [9999]);
});

test('matches string-based check over the full range', () => {
  assert.deepStrictEqual(selfDividingNumbers(1, 10000), brute(1, 10000));
});
