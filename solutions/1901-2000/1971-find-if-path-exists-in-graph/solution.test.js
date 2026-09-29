const test = require('node:test');
const assert = require('node:assert');
const { validPath } = require('./solution');

const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
function dsuConnected(n, edges, s, d) {
  const p = [...Array(n).keys()];
  const f = (x) => (p[x] === x ? x : (p[x] = f(p[x])));
  for (const [u, v] of edges) p[f(u)] = f(v);
  return f(s) === f(d);
}

test('official examples', () => {
  assert.strictEqual(validPath(3, [[0, 1], [1, 2], [2, 0]], 0, 2), true);
  assert.strictEqual(validPath(6, [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]], 0, 5), false);
});

test('source equals destination, no edges', () => {
  assert.strictEqual(validPath(1, [], 0, 0), true);
  assert.strictEqual(validPath(2, [], 0, 1), false);
});

test('matches union-find on random graphs', () => {
  for (let t = 0; t < 500; t++) {
    const n = ri(1, 12);
    const edges = [];
    for (let u = 0; u < n; u++) for (let v = u + 1; v < n; v++) if (Math.random() < 0.15) edges.push([u, v]);
    const s = ri(0, n - 1), d = ri(0, n - 1);
    assert.strictEqual(validPath(n, edges, s, d), dsuConnected(n, edges, s, d));
  }
});

test('2e5-node path (deep graph) runs fast without stack overflow', () => {
  const n = 200000;
  const edges = [];
  for (let i = 0; i + 1 < n; i++) edges.push([i, i + 1]);
  const t0 = Date.now();
  assert.strictEqual(validPath(n, edges, 0, n - 1), true);
  assert.strictEqual(validPath(n, edges.slice(0, n - 2), 0, n - 1), false);
  assert.ok(Date.now() - t0 < 1000);
});
