const test = require('node:test');
const assert = require('node:assert');
const { longestObstacleCourseAtEachPosition } = require('./solution');

const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => ri(lo, hi));
function quadratic(a) {
  const res = [];
  for (let i = 0; i < a.length; i++) {
    let best = 1;
    for (let j = 0; j < i; j++) if (a[j] <= a[i]) best = Math.max(best, res[j] + 1);
    res.push(best);
  }
  return res;
}
function brute(a) {
  return a.map((_, i) => {
    let best = 0;
    for (let mask = 0; mask < 1 << i; mask++) {
      const s = a.slice(0, i).filter((_, k) => mask >> k & 1);
      s.push(a[i]);
      let ok = true;
      for (let k = 1; k < s.length; k++) if (s[k] < s[k - 1]) ok = false;
      if (ok) best = Math.max(best, s.length);
    }
    return best;
  });
}

test('official examples', () => {
  assert.deepStrictEqual(longestObstacleCourseAtEachPosition([1, 2, 3, 2]), [1, 2, 3, 3]);
  assert.deepStrictEqual(longestObstacleCourseAtEachPosition([2, 2, 1]), [1, 2, 1]);
  assert.deepStrictEqual(longestObstacleCourseAtEachPosition([3, 1, 5, 6, 4, 2]), [1, 1, 2, 3, 2, 2]);
});

test('matches subsequence enumeration (small)', () => {
  for (let t = 0; t < 300; t++) {
    const a = rarr(ri(1, 10), 1, 4);
    assert.deepStrictEqual(longestObstacleCourseAtEachPosition(a), brute(a));
  }
});

test('matches O(n^2) DP (medium)', () => {
  for (let t = 0; t < 50; t++) {
    const a = rarr(ri(1, 300), 1, ri(2, 50));
    assert.deepStrictEqual(longestObstacleCourseAtEachPosition(a), quadratic(a));
  }
});

test('max size runs fast', () => {
  const a = rarr(100000, 1, 1e7);
  const t0 = Date.now();
  longestObstacleCourseAtEachPosition(a);
  assert.ok(Date.now() - t0 < 1000);
  const same = longestObstacleCourseAtEachPosition(new Array(100000).fill(5));
  assert.strictEqual(same[99999], 100000);
});
