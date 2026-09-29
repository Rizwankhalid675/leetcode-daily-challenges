const test = require('node:test');
const assert = require('node:assert');
const { minScore } = require('./solution');

const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
// oracle: Dijkstra-like "bottleneck" search over (city, current min) states on walks
function brute(n, roads) {
  // best[u] = smallest score achievable by some walk 1 -> u; walks may repeat, so relax until stable
  const best = new Array(n + 1).fill(Infinity);
  const reach = new Array(n + 1).fill(false);
  reach[1] = true;
  let changed = true;
  while (changed) {
    changed = false;
    for (const [a, b, d] of roads) {
      for (const [x, y] of [[a, b], [b, a]]) {
        if (!reach[x]) continue;
        const s = Math.min(best[x], d);
        if (!reach[y]) { reach[y] = true; changed = true; }
        if (s < best[y]) { best[y] = s; changed = true; }
        // walking back x <- y lets x benefit from the same road too
        if (s < best[x]) { best[x] = s; changed = true; }
      }
    }
  }
  return best[n];
}

test('official examples', () => {
  assert.strictEqual(minScore(4, [[1, 2, 9], [2, 3, 6], [2, 4, 5], [1, 4, 7]]), 5);
  assert.strictEqual(minScore(4, [[1, 2, 2], [1, 3, 4], [3, 4, 7]]), 2);
});

test('cheap road in another component is ignored', () => {
  assert.strictEqual(minScore(4, [[1, 4, 10], [2, 3, 1]]), 10);
});

test('matches walk relaxation on random connected-ish graphs', () => {
  for (let t = 0; t < 400; t++) {
    const n = ri(2, 9);
    const roads = [];
    for (let a = 1; a <= n; a++) for (let b = a + 1; b <= n; b++) if (Math.random() < 0.3) roads.push([a, b, ri(1, 50)]);
    if (!roads.some(([a, b]) => a === 1 || b === 1)) roads.push([1, n, ri(1, 50)]);
    // guarantee 1..n connected
    const p = [...Array(n + 1).keys()];
    const f = (x) => (p[x] === x ? x : (p[x] = f(p[x])));
    for (const [a, b] of roads) p[f(a)] = f(b);
    if (f(1) !== f(n)) roads.push([1, n, ri(1, 50)]);
    assert.strictEqual(minScore(n, roads), brute(n, roads));
  }
});

test('1e5 path runs fast', () => {
  const n = 100000;
  const roads = [];
  for (let i = 1; i < n; i++) roads.push([i, i + 1, i === 50000 ? 1 : 10000 - (i % 97)]);
  const t0 = Date.now();
  assert.strictEqual(minScore(n, roads), 1);
  assert.ok(Date.now() - t0 < 1000);
});
