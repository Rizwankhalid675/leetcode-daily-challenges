const test = require('node:test');
const assert = require('node:assert');
const { findOrder } = require('./solution');

function isValidOrder(n, pre, order) {
  if (order.length !== n || new Set(order).size !== n) return false;
  const pos = new Array(n);
  order.forEach((c, i) => { pos[c] = i; });
  return pre.every(([a, b]) => pos[b] < pos[a]);
}

// Independent cycle check: transitive closure (Floyd-Warshall style).
function hasCycle(n, pre) {
  const reach = Array.from({ length: n }, () => new Array(n).fill(false));
  for (const [a, b] of pre) reach[b][a] = true;
  for (let k = 0; k < n; k++) for (let i = 0; i < n; i++) if (reach[i][k]) for (let j = 0; j < n; j++) if (reach[k][j]) reach[i][j] = true;
  return reach.some((row, i) => row[i]);
}

test('official examples', () => {
  assert.deepStrictEqual(findOrder(2, [[1, 0]]), [0, 1]);
  const o = findOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]]);
  assert.ok(isValidOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]], o));
  assert.deepStrictEqual(findOrder(1, []), [0]);
});

test('cycle gives empty array', () => {
  assert.deepStrictEqual(findOrder(2, [[1, 0], [0, 1]]), []);
  assert.deepStrictEqual(findOrder(3, [[0, 1], [1, 2], [2, 0]]), []);
});

test('random graphs: valid order iff acyclic', () => {
  for (let t = 0; t < 500; t++) {
    const n = 1 + Math.floor(Math.random() * 8);
    const seen = new Set();
    const pre = [];
    const m = Math.floor(Math.random() * n * 2);
    for (let k = 0; k < m; k++) {
      const a = Math.floor(Math.random() * n), b = Math.floor(Math.random() * n);
      if (a === b || seen.has(a + ',' + b)) continue;
      seen.add(a + ',' + b);
      pre.push([a, b]);
    }
    const got = findOrder(n, pre);
    if (hasCycle(n, pre)) assert.deepStrictEqual(got, []);
    else assert.ok(isValidOrder(n, pre, got));
  }
});
