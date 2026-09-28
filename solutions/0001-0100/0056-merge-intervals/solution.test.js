const test = require('node:test');
const assert = require('node:assert');
const { merge } = require('./solution');

// Reference: paint covered integer points and half-steps, then read runs back.
function reference(intervals) {
  const covered = new Set();
  for (const [s, e] of intervals) for (let x = 2 * s; x <= 2 * e; x++) covered.add(x);
  const pts = [...covered].sort((a, b) => a - b);
  const out = [];
  for (const p of pts) {
    const last = out[out.length - 1];
    if (last && p === last[1] + 1) last[1] = p;
    else out.push([p, p]);
  }
  return out.map(([a, b]) => [a / 2, b / 2]);
}

test('official examples', () => {
  assert.deepStrictEqual(merge([[1, 3], [2, 6], [8, 10], [15, 18]]), [[1, 6], [8, 10], [15, 18]]);
  assert.deepStrictEqual(merge([[1, 4], [4, 5]]), [[1, 5]]); // touching merges
  assert.deepStrictEqual(merge([[4, 7], [1, 4]]), [[1, 7]]); // unsorted input
});

test('containment and random comparison', () => {
  assert.deepStrictEqual(merge([[1, 10], [2, 3]]), [[1, 10]]);
  for (let t = 0; t < 1000; t++) {
    const iv = Array.from({ length: 1 + Math.floor(Math.random() * 6) }, () => {
      const s = Math.floor(Math.random() * 15);
      return [s, s + Math.floor(Math.random() * 4)];
    });
    assert.deepStrictEqual(merge(iv), reference(iv), JSON.stringify(iv));
  }
});
