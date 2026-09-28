const test = require('node:test');
const assert = require('node:assert');
const { minFlips } = require('./solution');

// Reference: try every pair (a', b') within 3 bits and take the minimum Hamming distance.
function brute(a, b, c) {
  const pop = (x) => x.toString(2).split('1').length - 1;
  let best = Infinity;
  for (let x = 0; x < 16; x++) for (let y = 0; y < 16; y++) if ((x | y) === c) best = Math.min(best, pop(x ^ a) + pop(y ^ b));
  return best;
}

test('official examples', () => {
  assert.strictEqual(minFlips(2, 6, 5), 3);
  assert.strictEqual(minFlips(4, 2, 7), 1);
  assert.strictEqual(minFlips(1, 2, 3), 0);
});

test('large values', () => {
  assert.strictEqual(minFlips(1e9, 1e9, 1e9), 0);
  assert.strictEqual(minFlips(1, 1, 1e9), brute(1, 1, 1e9 & 15) + (1e9 >> 4).toString(2).split('1').length - 1);
});

test('matches brute force for all small triples', () => {
  for (let a = 1; a < 16; a++) for (let b = 1; b < 16; b++) for (let c = 1; c < 16; c++) assert.strictEqual(minFlips(a, b, c), brute(a, b, c), `${a},${b},${c}`);
});
