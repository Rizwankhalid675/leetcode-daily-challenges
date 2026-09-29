const test = require('node:test');
const assert = require('node:assert');
const { minimumAbsDifference } = require('./solution');

function brute(a) {
  let best = Infinity;
  for (let i = 0; i < a.length; i++) for (let j = i + 1; j < a.length; j++) best = Math.min(best, Math.abs(a[i] - a[j]));
  const res = [];
  for (let i = 0; i < a.length; i++) for (let j = 0; j < a.length; j++) if (a[i] < a[j] && a[j] - a[i] === best) res.push([a[i], a[j]]);
  return res.sort((x, y) => x[0] - y[0]);
}

test('official examples', () => {
  assert.deepStrictEqual(minimumAbsDifference([4, 2, 1, 3]), [[1, 2], [2, 3], [3, 4]]);
  assert.deepStrictEqual(minimumAbsDifference([1, 3, 6, 10, 15]), [[1, 3]]);
  assert.deepStrictEqual(minimumAbsDifference([3, 8, -10, 23, 19, -4, -14, 27]), [[-14, -10], [19, 23], [23, 27]]);
});

test('numeric (not lexicographic) sort', () => {
  assert.deepStrictEqual(minimumAbsDifference([100, 20, 3]), [[3, 20]]);
});

test('matches brute force on distinct values', () => {
  for (let t = 0; t < 1000; t++) {
    const s = new Set();
    const n = 2 + Math.floor(Math.random() * 8);
    while (s.size < n) s.add(Math.floor(Math.random() * 60) - 30);
    const a = [...s];
    assert.deepStrictEqual(minimumAbsDifference([...a]), brute(a));
  }
});
