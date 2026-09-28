const test = require('node:test');
const assert = require('node:assert');
const { eraseOverlapIntervals } = require('./solution');

// Reference: largest compatible subset by trying all subsets.
function brute(iv) {
  let best = 0;
  for (let mask = 0; mask < 1 << iv.length; mask++) {
    const chosen = iv.filter((_, i) => mask & (1 << i)).sort((a, b) => a[0] - b[0]);
    if (chosen.every((x, i) => i === 0 || x[0] >= chosen[i - 1][1])) best = Math.max(best, chosen.length);
  }
  return iv.length - best;
}

test('official examples', () => {
  assert.strictEqual(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]), 1);
  assert.strictEqual(eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]]), 2);
  assert.strictEqual(eraseOverlapIntervals([[1, 2], [2, 3]]), 0); // touching is fine
});

test('matches subset enumeration', () => {
  for (let t = 0; t < 400; t++) {
    const iv = Array.from({ length: 1 + Math.floor(Math.random() * 8) }, () => {
      const s = Math.floor(Math.random() * 10) - 5;
      return [s, s + 1 + Math.floor(Math.random() * 4)];
    });
    assert.strictEqual(eraseOverlapIntervals(iv), brute(iv), JSON.stringify(iv));
  }
});
