const test = require('node:test');
const assert = require('node:assert');
const { increasingTriplet } = require('./solution');

function brute(a) {
  for (let i = 0; i < a.length; i++)
    for (let j = i + 1; j < a.length; j++)
      for (let k = j + 1; k < a.length; k++) if (a[i] < a[j] && a[j] < a[k]) return true;
  return false;
}

test('official examples', () => {
  assert.strictEqual(increasingTriplet([1, 2, 3, 4, 5]), true);
  assert.strictEqual(increasingTriplet([5, 4, 3, 2, 1]), false);
  assert.strictEqual(increasingTriplet([2, 1, 5, 0, 4, 6]), true);
});

test('edge cases', () => {
  assert.strictEqual(increasingTriplet([1]), false);
  assert.strictEqual(increasingTriplet([1, 1, 1]), false); // strictly increasing required
  assert.strictEqual(increasingTriplet([20, 100, 10, 12, 5, 13]), true); // 10 < 12 < 13
  assert.strictEqual(increasingTriplet([-(2 ** 31), 2 ** 31 - 1, 0]), false);
});

test('matches brute force on random arrays', () => {
  for (let t = 0; t < 2000; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 8) }, () => Math.floor(Math.random() * 6));
    assert.strictEqual(increasingTriplet(a), brute(a), JSON.stringify(a));
  }
});
