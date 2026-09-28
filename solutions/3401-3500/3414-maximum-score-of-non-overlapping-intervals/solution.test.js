const test = require('node:test');
const assert = require('node:assert');
const { maximumWeight } = require('./solution');

// Reference: enumerate every subset of size <= 4, keep valid ones, pick max score then lex-min.
function brute(intervals) {
  const n = intervals.length;
  let best = null;
  let bestScore = -1;
  const lexLess = (a, b) => {
    for (let i = 0; i < Math.min(a.length, b.length); i++) if (a[i] !== b[i]) return a[i] < b[i];
    return a.length < b.length;
  };
  const rec = (start, chosen) => {
    if (chosen.length > 0) {
      const sorted = chosen.map((i) => intervals[i]).sort((a, b) => a[0] - b[0]);
      let ok = true;
      for (let i = 1; i < sorted.length; i++) if (sorted[i][0] <= sorted[i - 1][1]) ok = false;
      if (ok) {
        const s = chosen.reduce((acc, i) => acc + intervals[i][2], 0);
        if (s > bestScore || (s === bestScore && lexLess(chosen, best))) {
          bestScore = s;
          best = [...chosen];
        }
      }
    }
    if (chosen.length === 4) return;
    for (let i = start; i < n; i++) rec(i + 1, [...chosen, i]);
  };
  rec(0, []);
  return best;
}

test('official examples', () => {
  assert.deepStrictEqual(maximumWeight([[1, 3, 2], [4, 5, 2], [1, 5, 5], [6, 9, 3], [6, 7, 1], [8, 9, 1]]), [2, 3]);
  assert.deepStrictEqual(
    maximumWeight([[5, 8, 1], [6, 7, 7], [4, 7, 3], [9, 10, 6], [7, 8, 2], [11, 14, 3], [3, 5, 5]]),
    [1, 3, 5, 6],
  );
});

test('edge cases', () => {
  assert.deepStrictEqual(maximumWeight([[1, 1, 5]]), [0]);
  // shared endpoint counts as overlapping
  assert.deepStrictEqual(maximumWeight([[1, 2, 1], [2, 3, 1]]), [0]);
  // tie between one heavy interval and two light ones: [0,1] < [2] lexicographically
  assert.deepStrictEqual(maximumWeight([[1, 2, 2], [3, 4, 3], [1, 4, 5]]), [0, 1]);
  // at most 4 even if 5 fit
  assert.deepStrictEqual(maximumWeight([[1, 1, 1], [2, 2, 1], [3, 3, 1], [4, 4, 1], [5, 5, 1]]), [0, 1, 2, 3]);
});

test('matches brute force on random small inputs', () => {
  for (let t = 0; t < 600; t++) {
    const n = 1 + Math.floor(Math.random() * 8);
    const intervals = Array.from({ length: n }, () => {
      const l = 1 + Math.floor(Math.random() * 10);
      const r = l + Math.floor(Math.random() * 4);
      return [l, r, 1 + Math.floor(Math.random() * 4)]; // small weights -> many ties
    });
    assert.deepStrictEqual(maximumWeight(intervals), brute(intervals), JSON.stringify(intervals));
  }
});

test('n = 5e4 is fast', () => {
  const intervals = Array.from({ length: 5e4 }, (_, i) => [i * 2 + 1, i * 2 + 1 + (i % 7), 1e9 - (i % 1000)]);
  const t0 = Date.now();
  const ans = maximumWeight(intervals);
  assert.strictEqual(ans.length, 4);
  assert.ok(Date.now() - t0 < 2000);
});
