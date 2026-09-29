const test = require('node:test');
const assert = require('node:assert');
const { canSeePersonsCount } = require('./solution');

// Oracle: i sees j when everyone between them is shorter than both.
function bruteForce(h) {
  return h.map((hi, i) => {
    let cnt = 0, mid = 0;
    for (let j = i + 1; j < h.length; j++) {
      if (Math.min(hi, h[j]) > mid) cnt++;
      mid = Math.max(mid, h[j]);
    }
    return cnt;
  });
}

function randomDistinct(n) {
  const a = Array.from({ length: n }, (_, i) => i + 1);
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

test('official examples', () => {
  assert.deepStrictEqual(canSeePersonsCount([10, 6, 8, 5, 11, 9]), [3, 1, 2, 1, 1, 0]);
  assert.deepStrictEqual(canSeePersonsCount([5, 1, 2, 3, 10]), [4, 1, 1, 1, 0]);
});

test('edge cases', () => {
  assert.deepStrictEqual(canSeePersonsCount([1]), [0]);
  assert.deepStrictEqual(canSeePersonsCount([3, 2, 1]), [1, 1, 0]);
  assert.deepStrictEqual(canSeePersonsCount([1, 2, 3]), [1, 1, 0]);
});

test('matches brute force on random permutations', () => {
  for (let t = 0; t < 1000; t++) {
    const h = randomDistinct(1 + Math.floor(Math.random() * 10));
    assert.deepStrictEqual(canSeePersonsCount(h), bruteForce(h));
  }
});

test('1e5 people finish quickly', () => {
  const h = randomDistinct(100000);
  const t0 = Date.now();
  canSeePersonsCount(h);
  assert.ok(Date.now() - t0 < 1000);
});
