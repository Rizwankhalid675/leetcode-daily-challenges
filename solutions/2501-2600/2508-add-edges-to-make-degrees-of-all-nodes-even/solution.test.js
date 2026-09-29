const test = require('node:test');
const assert = require('node:assert');
const { isPossible } = require('./solution');

const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
function brute(n, edges) {
  const has = new Set(edges.map(([a, b]) => Math.min(a, b) + ',' + Math.max(a, b)));
  const cand = [];
  for (let a = 1; a <= n; a++) for (let b = a + 1; b <= n; b++) if (!has.has(a + ',' + b)) cand.push([a, b]);
  const deg = new Array(n + 1).fill(0);
  for (const [a, b] of edges) { deg[a]++; deg[b]++; }
  const even = (extra) => {
    const d = deg.slice();
    for (const [a, b] of extra) { d[a]++; d[b]++; }
    return d.every((x) => x % 2 === 0);
  };
  if (even([])) return true;
  for (let i = 0; i < cand.length; i++) {
    if (even([cand[i]])) return true;
    for (let j = i + 1; j < cand.length; j++) if (even([cand[i], cand[j]])) return true;
  }
  return false;
}

test('official examples', () => {
  assert.strictEqual(isPossible(5, [[1, 2], [2, 3], [3, 4], [4, 2], [1, 4], [2, 5]]), true);
  assert.strictEqual(isPossible(4, [[1, 2], [3, 4]]), true);
  assert.strictEqual(isPossible(4, [[1, 2], [1, 3], [1, 4]]), false);
});

test('two odd nodes already adjacent need a free third node', () => {
  assert.strictEqual(isPossible(3, [[1, 2], [1, 3], [2, 3]]), true); // triangle: all even already
  assert.strictEqual(isPossible(3, [[1, 2], [2, 3]]), true); // odd 1,3 are not adjacent
  assert.strictEqual(isPossible(4, [[1, 2], [1, 3], [2, 3], [1, 4], [2, 4]]), false); // odd 1,2 adjacent, 3 and 4 both touch 1 and 2
});

test('matches brute force over all 0/1/2 added edges', () => {
  for (let t = 0; t < 600; t++) {
    const n = ri(3, 7);
    const edges = [];
    for (let a = 1; a <= n; a++) for (let b = a + 1; b <= n; b++) if (Math.random() < 0.4) edges.push(Math.random() < 0.5 ? [a, b] : [b, a]);
    if (edges.length < 2) continue;
    assert.strictEqual(isPossible(n, edges), brute(n, edges), JSON.stringify([n, edges]));
  }
});

test('max size runs fast', () => {
  const n = 100000;
  const edges = [];
  for (let i = 1; i < n; i++) edges.push([i, i + 1]);
  const t0 = Date.now();
  assert.strictEqual(isPossible(n, edges), true);
  assert.ok(Date.now() - t0 < 1000);
});
