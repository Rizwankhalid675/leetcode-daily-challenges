const test = require('node:test');
const assert = require('node:assert');
const { findRightInterval } = require('./solution');

function brute(iv) {
  return iv.map(([, e]) => {
    let best = -1;
    iv.forEach(([s], j) => { if (s >= e && (best === -1 || s < iv[best][0])) best = j; });
    return best;
  });
}

test('official examples', () => {
  assert.deepStrictEqual(findRightInterval([[1, 2]]), [-1]);
  assert.deepStrictEqual(findRightInterval([[3, 4], [2, 3], [1, 2]]), [-1, 0, 1]);
  assert.deepStrictEqual(findRightInterval([[1, 4], [2, 3], [3, 4]]), [-1, 2, -1]);
});

test('an interval can be its own right interval when start === end', () => {
  assert.deepStrictEqual(findRightInterval([[5, 5]]), [0]);
});

test('matches brute force (unique starts)', () => {
  for (let t = 0; t < 1000; t++) {
    const n = 1 + Math.floor(Math.random() * 10);
    const starts = new Set();
    while (starts.size < n) starts.add(Math.floor(Math.random() * 30) - 10);
    const iv = [...starts].map((s) => [s, s + Math.floor(Math.random() * 12)]);
    assert.deepStrictEqual(findRightInterval(iv), brute(iv));
  }
});
