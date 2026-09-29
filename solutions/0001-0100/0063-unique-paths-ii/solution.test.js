const test = require('node:test');
const assert = require('node:assert');
const { uniquePathsWithObstacles } = require('./solution');

function brute(g) {
  const m = g.length, n = g[0].length;
  const go = (r, c) => {
    if (r >= m || c >= n || g[r][c] === 1) return 0;
    if (r === m - 1 && c === n - 1) return 1;
    return go(r + 1, c) + go(r, c + 1);
  };
  return go(0, 0);
}

test('official examples', () => {
  assert.strictEqual(uniquePathsWithObstacles([[0, 0, 0], [0, 1, 0], [0, 0, 0]]), 2);
  assert.strictEqual(uniquePathsWithObstacles([[0, 1], [0, 0]]), 1);
});

test('blocked start or end', () => {
  assert.strictEqual(uniquePathsWithObstacles([[1]]), 0);
  assert.strictEqual(uniquePathsWithObstacles([[0]]), 1);
  assert.strictEqual(uniquePathsWithObstacles([[1, 0], [0, 0]]), 0);
  assert.strictEqual(uniquePathsWithObstacles([[0, 0], [0, 1]]), 0);
});

test('matches recursive path count', () => {
  for (let t = 0; t < 500; t++) {
    const m = 1 + Math.floor(Math.random() * 7), n = 1 + Math.floor(Math.random() * 7);
    const g = Array.from({ length: m }, () => Array.from({ length: n }, () => (Math.random() < 0.2 ? 1 : 0)));
    assert.strictEqual(uniquePathsWithObstacles(g), brute(g));
  }
});
