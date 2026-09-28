const test = require('node:test');
const assert = require('node:assert');
const { totalNumbers } = require('./solution');

// Reference: try every ordered choice of 3 distinct positions and collect results in a Set.
function brute(digits) {
  const seen = new Set();
  const n = digits.length;
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++)
      for (let k = 0; k < n; k++) {
        if (i === j || j === k || i === k) continue;
        if (digits[i] === 0 || digits[k] % 2 !== 0) continue;
        seen.add(digits[i] * 100 + digits[j] * 10 + digits[k]);
      }
  return seen.size;
}

test('official examples', () => {
  assert.strictEqual(totalNumbers([1, 2, 3, 4]), 12);
  assert.strictEqual(totalNumbers([0, 2, 2]), 2);
  assert.strictEqual(totalNumbers([6, 6, 6]), 1);
  assert.strictEqual(totalNumbers([1, 3, 5]), 0);
});

test('edge cases', () => {
  assert.strictEqual(totalNumbers([0, 0, 0]), 0); // no valid leading digit
  assert.strictEqual(totalNumbers([0, 0, 1]), 1); // 100
  assert.strictEqual(totalNumbers([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]), brute([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
});

test('matches brute force on random inputs', () => {
  for (let t = 0; t < 500; t++) {
    const n = 3 + Math.floor(Math.random() * 8);
    const digits = Array.from({ length: n }, () => Math.floor(Math.random() * 10));
    assert.strictEqual(totalNumbers(digits), brute(digits), JSON.stringify(digits));
  }
});
